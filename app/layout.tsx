import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "마음사주 · MBTI",
  description: "현대적 코칭 톤의 사주·MBTI 리포트"
};

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="ko">
      <body className="min-h-screen bg-neutral-50">{children}</body>
    </html>
  );
}
