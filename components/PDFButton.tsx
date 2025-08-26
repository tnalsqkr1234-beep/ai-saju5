"use client";
import { useState } from "react";

export default function PDFButton({ htmlId, filename }: { htmlId: string; filename: string; }){
  const [busy, setBusy] = useState(false);
  return (
    <button className="btn" disabled={busy} onClick={async () => {
      setBusy(true);
      try{
        const el = document.getElementById(htmlId);
        if(!el) throw new Error("내용을 찾을 수 없어요");
        const res = await fetch("/api/pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: el.innerHTML, filename })
        });
        if(!res.ok) throw new Error("PDF 생성 실패");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
      } finally { setBusy(false); }
    }}>{busy ? "PDF 생성 중..." : "PDF로 저장(빠른)"}</button>
  );
}
