"use client";

import { useState } from "react";

export default function CheckoutMock(){
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  const createSession = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      setSession(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="card p-8 space-y-4">
        <h1 className="text-2xl font-bold">결제(목업)</h1>
        <p className="text-neutral-600">아래 버튼을 누르면 테스트 세션이 생성됩니다. 실결제는 이루어지지 않습니다.</p>
        <button disabled={loading} onClick={createSession} className="btn btn-primary">{loading ? "세션 생성 중..." : "세션 생성"}</button>
        {session && (
          <div className="mt-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50">
            <div className="text-sm text-neutral-500">테스트 세션</div>
            <pre className="text-xs overflow-auto">{JSON.stringify(session, null, 2)}</pre>
            <div className="flex gap-2 mt-3">
              <a className="btn" href="/premium/success">성공</a>
              <a className="btn" href="/premium/cancel">취소</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
