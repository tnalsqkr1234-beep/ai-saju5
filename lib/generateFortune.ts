export type Inputs = {
  name: string;
  birthDate: string;
  birthTime?: string;
  gender: string;
  mbti?: string;
  tone?: "warm" | "direct" | "executive";
};

function seedFrom(input: string){
  let s = 0;
  for(let i=0;i<input.length;i++) s = (s*31 + input.charCodeAt(i)) >>> 0;
  return () => (s = (1103515245*s + 12345) >>> 0) / 2**32;
}

export function generateReport(input: Inputs & { mode: "today" | "levels" }, mode: "today" | "levels"){
  const rng = seedFrom(`${input.name}|${input.birthDate}|${input.mbti||""}|${mode}`);

  const mbti = (input.mbti||"").toUpperCase();
  const letters = new Set(mbti.split(""));
  const arr = Array.from(letters);
  const luckyColorMap: Record<string,string> = { I:"네이비", E:"버건디", N:"올리브", S:"크림", T:"그레이", F:"딥그린", J:"블랙", P:"브라운" };
  const luckyNumberMap: Record<string,number> = { I:7, E:3, N:9, S:4, T:1, F:6, J:8, P:5 };
  const luckyItemMap: Record<string,string> = { I:"책갈피", E:"메모장", N:"만년필", S:"텀블러", T:"스마트워치", F:"아로마 오일", J:"하드커버 노트", P:"클립" };

  const color  = arr.map(l => luckyColorMap[l]).find(Boolean) || "화이트";
  const number = arr.map(l => luckyNumberMap[l]).find(Boolean) || 8;
  const item   = arr.map(l => luckyItemMap[l]).find(Boolean) || "심플 볼펜";

  const professionalIntro = [
    "### 전문가 안내",
    "- 본 리포트는 전통 명리 구조를 현대 코칭 언어로 번역한 해설입니다.",
    "- 의사결정의 책임은 사용자에게 있습니다."
  ].join("\n");

  const header = [
    `# 마음사주 · MBTI 리포트`,
    `- 이름: ${input.name}`,
    `- 생년월일: ${input.birthDate} ${input.birthTime || ""}`.trim(),
    `- 성별: ${input.gender}`,
    `- MBTI: ${mbti || "미입력"}`,
    `- 행운의 색: ${color} · 숫자: ${number} · 아이템: ${item}`,
    `- 모드: ${mode === "today" ? "오늘 요약" : "레벨 합본(오늘·주간·월간·연간)"}`,
    ``,
    `---`,
    `## 목차`,
    `1. 오늘 운세` + (mode === "today" ? "" : `\n2. 주간 운세\n3. 월간 운세\n4. 연간 운세`),
    `---`
  ].join("\n");

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
  ].join("\n");

  const today = [
    "# 1. 오늘 운세",
    "- 오늘의 핵심 테마: 몰입과 정리",
    "- 대인 관계: 짧고 명확한 메시지가 유리",
    "- 재물운: 작은 지출을 정리하면 체감 효과 큼"
  ].join("\n");

  const weekly = [
    "# 2. 주간 운세",
    "- 월: 일정 리셋",
    "- 수: 피드백 수용",
    "- 금: 실행력 회복"
  ].join("\n");

  const monthly = [
    "# 3. 월간 운세",
    "- 초반: 습관 재구축",
    "- 중반: 관계 확장",
    "- 말: 리소스 분배 점검"
  ].join("\n");

  const yearly = [
    "# 4. 연간 운세",
    "- 1Q: 집중 축적기",
    "- 2Q: 확장/협업",
    "- 3Q: 리스크 관리",
    "- 4Q: 수확과 회고"
  ].join("\n");

  const body = [professionalIntro, header, viz, today].concat(
    mode === "today" ? [] : [weekly, monthly, yearly]
  ).join("\n\n");

  return { markdown: body, meta: { color, number, item } };
}
