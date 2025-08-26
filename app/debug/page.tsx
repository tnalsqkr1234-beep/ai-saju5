"use client";
import { useEffect, useState } from "react";

export default function DebugPage(){
  const [log, setLog] = useState("진단 시작...");
  useEffect(() => {
    (async () => {
      const lines: string[] = [];
      async function ping(url: string, method: "GET"|"POST"="GET"){
        try{
          const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: method==="POST" ? JSON.stringify({ html:"<html><body>test</body></html>" }) : undefined });
          lines.push(`${url} [${method}] → ${res.status}`);
          lines.push((await res.text()).slice(0,200));
        }catch(e:any){ lines.push(`${url} → ERR ${e?.message}`); }
      }
      await ping("/api/health");
      await ping("/api/report");
      await ping("/api/pdf");
      setLog(lines.join("\n\n"));
    })();
  }, []);
  return (
    <section className="section">
      <div className="card p-6">
        <h1 className="text-xl font-bold mb-2">디버그</h1>
        <pre className="text-xs whitespace-pre-wrap">{log}</pre>
      </div>
    </section>
  );
}
