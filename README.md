# 마음사주 · MBTI — Starter

Next.js 14 + Tailwind 기반의 사주+MBTI 운세 사이트 스타터입니다.  
생성되는 운세는 한국어 2,000자 이상이며, PDF 저장 및 결제(목업) 플로우가 포함되어 있습니다.

## 빠른 시작
```bash
pnpm i   # 또는 npm i / yarn
pnpm dev # http://localhost:3000
```

## 배포
- GitHub에 푸시 후 **Vercel**에서 Import 하면 바로 빌드됩니다.
- ENV는 필요하지 않습니다(목업). 실결제 연동 시 서버 라우트(`/app/api/checkout/route.ts`)를 수정하세요.

## 주요 페이지
- `/` 랜딩
- `/fortune` 입력 + 운세 2,000자 생성 + PDF 저장
- `/premium` 프리미엄 소개
- `/premium/checkout` 결제 목업
- `/premium/success`, `/premium/cancel` 결과 페이지

## 커스터마이징
- 로고: `public/logo.svg`
- 색상: `tailwind.config.js`의 `colors.primary`
- 카피/문구: `app/page.tsx`, `app/fortune/page.tsx`
- 운세 로직: `lib/generateFortune.ts`

## PortOne / Toss / Kakao 연동 힌트
- 서버: `/app/api/checkout/route.ts`에서 각 PG의 생성/검증 API 호출
- 클라이언트: `/premium/checkout/page.tsx`에서 provider redirect 처리
- 웹훅: `/app/api/webhook/route.ts`를 추가해 결제 성공/실패 이벤트 처리

## 라이선스
개인/상업 프로젝트 시작용으로 자유롭게 사용하세요. 보증 없음.


## Pro PDF (Puppeteer) 사용
- POST `/api/pdf` 에 HTML을 전달하면 A4, 페이지 번호/헤더·푸터 포함 PDF를 반환합니다.
- Vercel 환경에서 동작하도록 `@sparticuz/chromium` + `puppeteer-core`를 사용합니다.
- 클라이언트에서 `buildCoverHTML()`로 표지·목차 포함 HTML을 구성해 전달합니다.

## 톤 선택
- `/fortune`에서 톤(warm/direct/executive)을 선택 → 리포트 헤더에 표시됩니다.

## Methodology 페이지
- `/methodology` : 해석 원칙/윤리/표기 기준 안내.


### 빌드 주의사항
- `tsconfig.json`에 `baseUrl`/`paths`가 포함되어 있습니다. `@/` 별칭을 그대로 사용하세요.
- `@tailwindcss/typography` 플러그인을 사용하여 `prose` 클래스가 적용됩니다.


## 서버 측 리포트 생성
- `/api/report`에 입력(JSON)을 POST하면 서버에서 리포트를 생성하여 반환합니다.
- 장문(10만자+)도 브라우저 프리즈 없이 안정적으로 처리됩니다.

## 웹폰트
- Pro PDF 표지에 **Noto Sans KR**(Google Fonts)을 포함했습니다.
- 환경에 따라 시스템 폰트로 폴백됩니다.
