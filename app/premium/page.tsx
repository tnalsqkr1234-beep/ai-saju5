import Link from "next/link";

export default function PremiumPage(){
  return (
    <section className="section">
      <div className="card p-8 space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold">프리미엄 리포트</h1>
        <p className="text-neutral-600">
          프리미엄은 오늘의 운세에 +주간/월간 플랜, 개인 리추얼 설계, 색·숫자·아이템 조합 제안 PDF(브랜딩 포함)까지 제공합니다.
        </p>
        <ul className="list-disc ml-6 text-neutral-700">
          <li>PDF 10페이지: 총운·관계·일·돈·건강·액션·Q&A</li>
          <li>브랜드 로고 삽입(SVG/Base64), 색 테마 커스터마이즈</li>
          <li>결제는 목업(PortOne/Toss/Kakao 연동 자리)으로 구성해두었습니다.</li>
        </ul>
        <Link href="/premium/checkout" className="btn btn-primary w-full md:w-auto">결제(목업) 진행</Link>
      </div>
    </section>
  )
}
