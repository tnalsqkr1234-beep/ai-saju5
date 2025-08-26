import "../styles/globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "마음사주 · MBTI",
  description: "사주 + MBTI 기반 전문가급 리포트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b border-neutral-200 bg-white">
          <div className="container-narrow flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" width={140} height={36} alt="마음사주 로고" />
              <span className="badge">Professional</span>
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline">홈</Link>
              <Link href="/fortune" className="hover:underline">운세 리포트</Link>
              <Link href="/premium" className="hover:underline">프리미엄</Link>
              <Link href="/methodology" className="hover:underline">Methodology</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          © {new Date().getFullYear()} 마음사주 · MBTI — 본 리포트는 참고/엔터테인먼트 용도로 제공됩니다.
        </footer>
      </body>
    </html>
  );
}
