
export type Inputs = {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:mm
  gender: "남성" | "여성" | "기타";
  mbti?: string;
};

export type ReportMode = "today" | "levels";

const luckyColorMap: Record<string, string> = {
  "E": "청록",
  "I": "네이비",
  "S": "올리브",
  "N": "보라",
  "T": "블랙",
  "F": "버건디",
  "J": "브라운",
  "P": "스카이블루",
};

const luckyNumberMap: Record<string, number> = {
  "E": 3, "I": 7, "S": 4, "N": 9, "T": 1, "F": 6, "J": 2, "P": 5
};

const luckyItemMap: Record<string, string> = {
  "E": "메탈 시계",
  "I": "가죽 카드지갑",
  "S": "심플 팔찌",
  "N": "클리어 폰케이스",
  "T": "블랙 스니커즈",
  "F": "우산 또는 립밤",
  "J": "하드커버 노트",
  "P": "에어팟 케이스"
};

function pickFromMBTI(mbti?: string) {
  if (!mbti) return { color: "화이트", number: 8, item: "심플 볼펜" };
  const letters = new Set(mbti.toUpperCase().split(""));
  const color = [...letters].map(l => luckyColorMap[l]).filter(Boolean)[0] || "화이트";
  const number = [...letters].map(l => luckyNumberMap[l]).filter(Boolean)[0] || 8;
  const item = [...letters].map(l => luckyItemMap[l]).filter(Boolean)[0] || "심플 볼펜";
  return { color, number, item };
}

function pseudoRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return () => {
    // xorshift
    h ^= h << 13; h ^= h >> 17; h ^= h << 5;
    return Math.abs(h) / 0x7fffffff;
  };
}

// Utility to pick one from list with RNG
function pick<T>(rng: () => number, list: T[]): T {
  return list[Math.floor(rng() * list.length)];
}

// Build paragraphs by cycling templates until reaching target length (chars)
function buildSection(rng: () => number, title: string, context: Record<string,string>, templates: string[], targetChars: number) {
  const out: string[] = [`## ${title}`];
  let i = 0;
  while (out.join("\n\n").length < targetChars) {
    const t = templates[i % templates.length];
    // Simple token replacement
    const withCtx = t
      .replaceAll("{name}", context.name || "당신")
      .replaceAll("{mbti}", context.mbti || "MBTI")
      .replaceAll("{color}", context.color || "브라운")
      .replaceAll("{number}", context.number || "7")
      .replaceAll("{item}", context.item || "심플한 소지품");
    out.push(withCtx);
    i++;
    // spice: occasionally add a tip block
    if (i % 9 === 0) {
      const box = pick(rng, [
        "- 작은 성취 3가지를 적어두세요.",
        "- 오늘의 핵심 결정 1가지를 빠르게 확정하세요.",
        "- 메시지/알림을 30분 동안 꺼두고 몰입을 만드세요.",
        "- 관계에서는 먼저 경청 → 요약 → 질문의 순서를 지키세요.",
        "- 지출은 구독/정기결제를 먼저 점검하세요.",
        "- 취침 2시간 전 카페인/당류를 줄여 보세요."
      ]);
      out.push(`> Tip: ${box}`);
    }
  }
  return out.join("\n\n");
}

const T_GENERAL = [
  "{name}님의 오늘은 '과정에 의미를 부여하면 결과가 따라오는 날'입니다. 작은 루틴을 몇 개 고정하는 것으로 컨디션이 살아납니다.",
  "비교보다 기록을, 완벽보다 일관성을 선택할 때 성취의 속도가 붙습니다. 특히 오전의 90분 몰입은 오후의 안정감을 보장합니다.",
  "주요 결정을 미루지 말고 가볍게 초안을 확정해 보세요. 사람들은 완벽한 해답보다 방향 제시를 원할 때가 많습니다.",
  "자기비난 대신 자기설명을 해보세요. '지금 집중이 안 되는 건 피로가 누적되어서야' 같은 문장을 통해 마음의 압박을 낮출 수 있습니다.",
  "관계에서는 '요청과 제안'을 구분하면 갈등이 줄어듭니다. 요청은 필요, 제안은 옵션입니다.",
  "작은 휴식이 큰 흐름을 만듭니다. 45-10 리듬(45분 집중, 10분 리셋)이 하루 전체의 체력을 보호합니다.",
  "오늘은 '에너지 보존'이 핵심입니다. 내가 통제 가능한 과업부터 처리하면 성취감이 회복됩니다.",
  "감정은 신호이지 명령이 아닙니다. 신호를 읽고 행동을 선택하는 사람이 페이스를 잡습니다.",
  "정리정돈은 정신의 빈 공간을 만듭니다. 책상 위에서 3가지만 치워도 성과가 달라집니다."
];

const T_RELATION = [
  "대화는 '경청 → 요약 → 공감 → 질문'의 구조를 택해 보세요. 상대가 신뢰를 느끼는 속도가 빨라집니다.",
  "연애에서 속도를 조절하는 힘은 자존감에서 나옵니다. 나의 일상을 풍성하게 유지할수록 관계는 건강해집니다.",
  "갈등이 생기면 '사실-느낌-요청' 순서로 말해 보세요. 감정의 파고가 낮아집니다.",
  "소개팅/새 인연에서는 취미·루틴 2~3개를 공유하세요. 라포 형성률이 올라갑니다.",
  "관계 피로가 쌓였다면 '소수의 깊은 대화'에 에너지를 모아 보세요.",
  "메신저 오해는 빠른 통화로 해소하세요. 텍스트는 뉘앙스를 잃기 쉽습니다."
];

const T_WORK = [
  "회의에서는 먼저 문제 정의 1문장을 제시해보세요. 발언권이 생기고 논의가 정리됩니다.",
  "KPI를 한 줄로 재정의하세요. 불필요한 과업이 사라집니다.",
  "할 일은 '다음 행동'으로 쪼개면 속도가 납니다. 20분 안에 시작 가능한 수준으로 구체화하세요.",
  "집중력을 뺏는 알림을 잠시 꺼두면, 1시간이 3시간의 효과를 냅니다.",
  "완벽 대신 '출시 후 개선'을 택하세요. 세상은 피드백으로 완성됩니다."
];

const T_MONEY = [
  "지출은 구독/정기결제부터 점검하세요. 작은 절감이 재무 자존감의 시작입니다.",
  "투자는 분할 매수·리밸런싱·현금 비중 3원칙을 기억하세요.",
  "지인의 확실한 기회 제안에는 체크리스트(리스크·수익·기간·엑싯)로 응답하세요.",
  "수입보다 먼저 습관을 설계하세요. 습관은 수입의 그릇입니다.",
  "오늘은 현금흐름표를 업데이트하기 좋은 날입니다."
];

const T_HEALTH = [
  "수면 위생을 우선하세요. 취침 2시간 전 조도를 낮추고 스크린 타임을 줄여보세요.",
  "식사는 단백질 우선, 수분 충분을 원칙으로. 오후 피로가 줄어듭니다.",
  "짧은 산책이 감정의 매무새를 다듬습니다. 햇빛 10분만으로도 리셋 효과.",
  "심호흡 4-7-8을 3세트 진행해 마음의 과열을 식혀보세요.",
  "오늘은 과도한 당류를 피하는 것이 좋습니다."
];

const T_ACTION = [
  "□ 오전 1시간 방해 요소 차단(알림·메신저 DND)",
  "□ 오늘의 핵심 결정 1가지 확정",
  "□ 45-10 리듬으로 2세트 실행",
  "□ 저녁 10분 감사 3가지 기록",
  "□ 내일의 첫 과업 1개 미리 정하기"
];

function chapterBundle(rng:()=>number, title:string, context:Record<string,string>, target:number, banks:string[]) {
  // Mix multiple banks to reduce repetition
  const pool = banks;
  const paragraphs: string[] = [];
  let idx = 0;
  while (paragraphs.join("\n\n").length < target) {
    const raw = pool[idx % pool.length]
      .replaceAll("{name}", context.name || "당신")
      .replaceAll("{mbti}", context.mbti || "MBTI")
      .replaceAll("{color}", context.color || "브라운")
      .replaceAll("{number}", context.number || "7")
      .replaceAll("{item}", context.item || "심플한 소지품");
    paragraphs.push(raw);
    if (idx % 8 === 7) {
      paragraphs.push(pick(rng, [
        "작은 루틴(물 1컵·짧은 산책·책 10쪽)을 고정하면 장기운이 정돈됩니다.",
        "나를 돋보이게 하는 것은 완벽함이 아니라 일관성입니다.",
        "기록은 자기확신을 키웁니다. 오늘의 배움을 140자로 요약해 보세요.",
        "관계에서는 판단보다 호기심을 선택하면 신뢰가 쌓입니다."
      ]));
    }
    idx++;
  }
  return `### ${title}\n\n` + paragraphs.join("\n\n");
}

export function generateReport(input: Inputs, mode: ReportMode = "today") {
  const seed = `${input.name}-${input.birthDate}-${input.birthTime ?? "00:00"}-${input.gender}-${input.mbti ?? ""}`;
  const rng = pseudoRandom(seed);
  const { color, number, item } = pickFromMBTI(input.mbti);


  function bar(label:string, v:number){
    const blocks = Math.max(1, Math.min(10, Math.round(v*10)));
    return `${label} ${"█".repeat(blocks)}${"░".repeat(10-blocks)} ${Math.round(v*100)}%`;
  }
  const viz = [
    "## 시각 요약",
    bar("집중력", rng()*0.5 + 0.4),
    bar("감정안정", rng()*0.5 + 0.4),
    bar("관계운", rng()*0.5 + 0.4),
    bar("재물운", rng()*0.5 + 0.4),
    bar("체력/회복", rng()*0.5 + 0.4)
  ].join("\\n");


  const ctx = {
    name: input.name || "당신",
    mbti: input.mbti || "MBTI",
    color, number: String(number), item
  };

  // Section targets (approximate chars)
  const targets = mode === "today"
    ? { today: 6000, week: 0, month: 0, year: 0 } // ~6천자
    : { today: 6000, week: 22000, month: 32000, year: 52000 }; // 합계 > 10만자

  // Intro & TOC
  
  const professionalIntro = [
    `## 리포트 인트로`,
    `본 문서는 전통 사주 해석을 현대적 자기계발·심리 코칭 톤으로 재구성한 장문 리포트입니다.`,
    `읽는 법: (1) 먼저 '오늘 요약'으로 하루의 리듬을 잡고, (2) '주간·월간'에서 중기 과제를 선정하며, (3) '연간'에서 방향성을 정리하세요.`,
    `주의: 본 리포트는 참고/엔터테인먼트 용도로 제공되며 최종 의사결정의 책임은 사용자에게 있습니다.`,
    ``
  ].join("\n");

  const header = [
    `# 마음사주 · MBTI 리포트`,
    `- 이름: ${ctx.name}`,
    `- 생년월일: ${input.birthDate} ${input.birthTime || ""}`.trim(),
    `- 성별: ${input.gender}`,
    `- MBTI: ${input.mbti || "미입력"}`,
    `- 행운의 색: ${color} · 숫자: ${number} · 아이템: ${item}`,
    `- 모드: ${mode === "today" ? "오늘 요약" : "레벨 합본(오늘·주간·월간·연간)"}`,
    ``,
    `---`,
    `## 목차`,
    `1. 오늘 운세` + (mode === "today" ? "" : `\n2. 주간 운세\n3. 월간 운세\n4. 연간 운세`),
    `---`
  ].join("\n");
  const headerWithIntro = [professionalIntro, header].join("\n\n");

// Build "오늘"
  const todayBlocks = [
    buildSection(rng, "오늘 · 총운", ctx, T_GENERAL, Math.floor(targets.today * 0.35)),
    buildSection(rng, "오늘 · 연애/관계", ctx, T_RELATION, Math.floor(targets.today * 0.2)),
    buildSection(rng, "오늘 · 일/커리어", ctx, T_WORK, Math.floor(targets.today * 0.2)),
    buildSection(rng, "오늘 · 재물/금전", ctx, T_MONEY, Math.floor(targets.today * 0.15)),
    buildSection(rng, "오늘 · 건강/생활", ctx, T_HEALTH, Math.floor(targets.today * 0.1)),
    `## 오늘 · 실행 체크리스트\n\n` + T_ACTION.join("\n")
  ];

  const parts: string[] = [headerWithIntro, viz, `# 1. 오늘 운세`, ...todayBlocks];

  if (mode !== "today") {
    // WEEK
    const weekTotal = targets.week;
    const week = [
      chapterBundle(rng, "주간 테마와 정서적 흐름", ctx, Math.floor(weekTotal*0.25), T_GENERAL),
      chapterBundle(rng, "주간 관계 전략", ctx, Math.floor(weekTotal*0.2), T_RELATION),
      chapterBundle(rng, "주간 일/커리어 집중 포인트", ctx, Math.floor(weekTotal*0.25), T_WORK),
      chapterBundle(rng, "주간 재물/소비 습관", ctx, Math.floor(weekTotal*0.15), T_MONEY),
      chapterBundle(rng, "주간 건강/생활 루틴", ctx, Math.floor(weekTotal*0.15), T_HEALTH),
    ].join("\n\n");
    parts.push(`# 2. 주간 운세\n\n${week}`);

    // MONTH
    const monthTotal = targets.month;
    const month = [
      chapterBundle(rng, "월간 에너지 사이클과 목표 설계", ctx, Math.floor(monthTotal*0.3), T_GENERAL),
      chapterBundle(rng, "월간 관계 패턴과 배려의 기술", ctx, Math.floor(monthTotal*0.2), T_RELATION),
      chapterBundle(rng, "월간 커리어 성장전략", ctx, Math.floor(monthTotal*0.25), T_WORK),
      chapterBundle(rng, "월간 재정 계획과 투자 원칙", ctx, Math.floor(monthTotal*0.15), T_MONEY),
      chapterBundle(rng, "월간 웰빙 플랜", ctx, Math.floor(monthTotal*0.1), T_HEALTH),
    ].join("\n\n");
    parts.push(`# 3. 월간 운세\n\n${month}`);

    // YEAR
    const yearTotal = targets.year;
    const year = [
      chapterBundle(rng, "연간 큰 주제와 심리적 초점", ctx, Math.floor(yearTotal*0.35), T_GENERAL),
      chapterBundle(rng, "연간 관계/네트워크 전략", ctx, Math.floor(yearTotal*0.2), T_RELATION),
      chapterBundle(rng, "연간 경력/사업 확장 계획", ctx, Math.floor(yearTotal*0.25), T_WORK),
      chapterBundle(rng, "연간 재정/투자 거시 전략", ctx, Math.floor(yearTotal*0.15), T_MONEY),
      chapterBundle(rng, "연간 건강/생활 기반 설계", ctx, Math.floor(yearTotal*0.05), T_HEALTH),
      `### 연간 실행 리추얼\n\n- 분기마다 '핵심역량 프로젝트' 1개 완수\n- 월 1회 관계 리셋 데이(정리·감사·제안)\n- 주 1회 재무 점검(구독·현금흐름·리밸런싱)\n- 매일 10분 독서·10분 산책·10분 기록`
    ].join("\n\n");
    parts.push(`# 4. 연간 운세\n\n${year}`);
  }

  const markdown = parts.join("\n\n");
  return {
    meta: {
      seed,
      generatedAt: new Date().toISOString(),
      color, number, item,
      mode
    },
    markdown
  };
}

// Backward compat: keep the old function signature used by the page
export function generateFortune(input: Inputs & { mode?: ReportMode }) {
  return generateReport(input, input.mode || "today");
}
