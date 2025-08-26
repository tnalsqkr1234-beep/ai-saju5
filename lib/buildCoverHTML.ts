export function buildCoverHTML(opts: {
  name: string; birthDate: string; birthTime: string; gender: string; mbti: string;
  tone: string; color?: string; number?: number; item?: string; bodyHTML: string;
}){
  const { name, birthDate, birthTime, gender, mbti, tone, color, number, item, bodyHTML } = opts;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  body { font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Segoe UI, Helvetica, Arial, sans-serif; color:#111827; }
  .cover { height: 100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:12px; }
  .title { font-size: 40px; font-weight: 700; }
  .meta { color:#6b7280; }
  .page { page-break-after: always; }
</style>
</head>
<body>
<section class="cover page">
  <div class="title">마음사주 · MBTI</div>
  <div class="meta">${name} · ${birthDate} ${birthTime} · ${gender} · ${mbti || "MBTI 미입력"} · 톤:${tone}</div>
  <div class="meta">행운색:${color||""} · 숫자:${number||""} · 아이템:${item||""}</div>
</section>
<section>${bodyHTML}</section>
</body>
</html>`;
}
