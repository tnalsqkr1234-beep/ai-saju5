import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page(){
  return (
    <section className="section">
      <div className="hero card p-10 md:p-12">
        <div className="flex flex-col gap-8">
          <div className="space-y-5">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              전문가 톤으로 해석한 <span className="text-accent">사주 × MBTI</span>
            </h1>
            <p className="text-neutral-600 text-lg">
              전통 해석에 현대적 코칭을 더해, <b>읽히는 장문 리포트</b>로 제공합니다.
              오늘·주간·월간·연간 레벨을 결합하면 <b>10만자+</b>까지 생성됩니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 text-sm bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200"><CheckCircle2 className="w-4 h-4"/> 전문가 어투</span>
              <span className="inline-flex items-center gap-2 text-sm bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200"><CheckCircle2 className="w-4 h-4"/> 레벨 합본 10만자+</span>
              <span className="inline-flex items-center gap-2 text-sm bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200"><CheckCircle2 className="w-4 h-4"/> PDF 저장</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/fortune" className="btn btn-primary gap-2">
              <Sparkles className="w-4 h-4" /> 운세 리포트 만들기
            </Link>
            <Link href="/premium" className="btn gap-2">
              프리미엄 둘러보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold mb-2">현대적 코칭 톤</h3>
          <p className="text-sm text-neutral-600">감정 관리·집중력·관계 기술 같은 실천 문장으로 구성해 긴 리포트도 읽히도록 설계합니다.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-2">구조화된 장문</h3>
          <p className="text-sm text-neutral-600">총론·관계·일·재물·건강·액션 플랜과 오늘/주간/월간/연간 레벨을 분리해 가독성을 높였습니다.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-2">브랜드 맞춤</h3>
          <p className="text-sm text-neutral-600">로고/컬러/카피를 쉽게 교체할 수 있도록 컴포넌트를 단순화했습니다.</p>
        </div>
      </div>
    </section>
  )
}
