
export function buildCoverHTML(opts: {
  name: string;
  birthDate: string;
  birthTime?: string;
  gender: string;
  mbti?: string;
  tone?: string;
  color?: string;
  number?: number | string;
  item?: string;
  bodyHTML: string;
}) {
  const {
    name, birthDate, birthTime, gender, mbti, tone, color, number, item, bodyHTML
  } = opts;

  const cover = `
  <section style="height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#0f172a;color:#fff;">
    <div style="max-width:640px;padding:24px;text-align:center;">
      <div style="font-size:14px;opacity:.7;margin-bottom:8px;">마음사주 · MBTI — Professional Report</div>
      <h1 style="font-size:40px;line-height:1.2;margin:0 0 12px 0;">사주 × MBTI 리포트</h1>
      <div style="font-size:16px;opacity:.9;margin-bottom:16px;">현대적 코칭 톤으로 해석한 장문 리포트</div>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,.2);margin:16px 0" />
      <div style="font-size:14px;opacity:.9;line-height:1.8;text-align:left">
        <div><b>이름</b> ${name}</div>
        <div><b>생년월일</b> ${birthDate} ${birthTime || ""}</div>
        <div><b>성별</b> ${gender} &nbsp; <b>MBTI</b> ${mbti || "미입력"} &nbsp; <b>톤</b> ${tone || "warm"}</div>
        <div><b>행운색</b> ${color || ""} &nbsp; <b>숫자</b> ${number || ""} &nbsp; <b>아이템</b> ${item || ""}</div>
      </div>
    </div>
  </section>`;

  const stylesheet = `
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap">
  <style>
    @page { size: A4; margin: 14mm; }
    body { font-family: "Noto Sans KR",  -apple-system, BlinkMacSystemFont, "Noto Sans KR", "Apple SD Gothic Neo", Segoe UI, Helvetica, Arial, sans-serif; color: #111827; }
    h1,h2,h3 { font-family: ui-serif, "Iowan Old Style", "Apple Garamond", Baskerville, "Times New Roman", serif; color: #0f172a; }
    .toc { page-break-after: always; }
    .section { page-break-inside: avoid; }
    .quote { padding: 12px 16px; background:#f9fafb; border-left: 4px solid #735233; margin: 16px 0; }
    .meta { color:#6b7280; font-size:12px; }
  </style>`;

  const toc = `
  <section class="toc">
    <h2>목차</h2>
    <ol>
      <li>오늘 운세</li>
      <li>주간 운세</li>
      <li>월간 운세</li>
      <li>연간 운세</li>
    </ol>
  </section>`;

  return `<!doctype html><html><head><meta charset="utf-8"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700&display=swap" rel="stylesheet">${stylesheet}</head><body>${cover}${toc}${bodyHTML}
    <section class="section">
      <h2>샘플 차트</h2>
      <div class="chart-demo" style="width:100%;height:200px;background:linear-gradient(to right,#735233,#b0c3d2);border-radius:8px"></div>
      <p class="meta">* 실제 차트는 향후 Recharts 기반으로 교체 가능합니다.</p>
    </section>
    </body></html>`;
}
