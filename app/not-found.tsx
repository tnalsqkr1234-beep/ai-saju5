export default function NotFound(){
  return (
    <section className="section">
      <div className="card p-8 space-y-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">페이지를 찾을 수 없어요 (404)</h1>
        <p className="text-neutral-600">주소가 잘못되었거나, 배포 직후 경로가 준비되지 않았을 수 있어요.</p>
        <div className="flex gap-3 justify-center">
          <a className="btn" href="/">홈으로</a>
          <a className="btn btn-primary" href="/fortune">운세 생성하기</a>
          <a className="btn" href="/debug">디버그</a>
        </div>
      </div>
    </section>
  );
}
