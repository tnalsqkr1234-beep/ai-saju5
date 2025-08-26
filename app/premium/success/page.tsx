export default function SuccessPage(){
  return (
    <section className="section">
      <div className="card p-8 space-y-3">
        <h1 className="text-2xl font-bold">결제가 완료되었습니다. (목업)</h1>
        <p className="text-neutral-600">이제 프리미엄 PDF를 다운로드할 수 있습니다. 실제 결제 연동 시 여기서 리디렉션/웹훅 처리하세요.</p>
        <a className="btn btn-primary" href="/fortune">운세로 돌아가기</a>
      </div>
    </section>
  );
}
