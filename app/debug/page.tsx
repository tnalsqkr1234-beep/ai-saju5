"use client";
import { useEffect, useState } from "react";

export default function DebugPage(){
  const [log, setLog] = useState<string>("진단 시작...");

  useEffect(() => {
    (async () => {
      const lines: string[] = [];
      async function ping(url: string, method: "GET" | "POST" = "GET"){
        try{
          const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: method==="POST" ? JSON.stringify({ html: "<html><body>test</body></html>"}) : undefined });
          const txt = await res.text();
          lines.push(`${url} [${method}] → ${res.status}`);
          lines.push(txt.slice(0, 400));
        }catch(e:any){
          lines.push(`${url} [${method}] → ERR ${e?.message}`);
        }
      }
      await ping("/api/health", "GET");
      await ping("/api/report", "GET");
      await ping("/api/pdf", "GET");
      setLog(lines.join("\n\n"));
    })();
  }, []);

  return (
    <section className="section">
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-3">디버그 /debug</h1>
        <p className="text-sm text-neutral-600 mb-4">아래 응답이 200이어야 합니다. 404/500이면 빌드/경로 문제입니다.</p>
        <pre className="text-xs whitespace-pre-wrap">{log}</pre>
      </div>
    </section>
  );
}
