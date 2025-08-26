export default function CancelPage(){
  return (
    <section className="section">
      <div className="card p-8 space-y-3">
        <h1 className="text-2xl font-bold">결제가 취소되었습니다.</h1>
        <p className="text-neutral-600">언제든 준비되면 다시 시도해 주세요.</p>
        <a className="btn" href="/premium">프리미엄으로</a>
      </div>
    </section>
  );
}
