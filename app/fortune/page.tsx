"use client";

import { useState } from "react";
import type { Inputs } from "@/lib/generateFortune";
import { marked } from "marked";
import { buildCoverHTML } from "@/lib/buildCoverHTML";
import PDFButton from "@/components/PDFButton";
import { Copy, AlertTriangle } from "lucide-react";

type Mode = "today" | "levels";
type Tone = "warm" | "direct" | "executive";

const MBTIs = ["", "INTJ","INTP","INFJ","INFP","ISTJ","ISTP","ISFJ","ISFP","ENTJ","ENTP","ENFJ","ENFP","ESTJ","ESTP","ESFJ","ESFP"];

export default function FortunePage(){
  const [form, setForm] = useState<Inputs & { mode: Mode; tone: Tone }>({
    name: "", birthDate: "", birthTime: "", gender: "남성", mbti: "", mode: "today", tone: "warm"
  });
  const [result, setResult] = useState<{ markdown: string; meta?: any } | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form)
      });
      if(!res.ok) throw new Error("생성 실패");
      const out = await res.json();
      setResult(out);
      setTimeout(() => document.getElementById("result")?.scrollIntoView({ behavior: "smooth" }), 50);
    } finally { setBusy(false); }
  };

  const copyText = async () => {
    const el = document.getElementById("result-text"); if(!el) return;
    await navigator.clipboard.writeText(el.textContent || "");
    alert("운세 텍스트를 복사했어요.");
  };

  return (
    <section className="section">
      <div className="card p-6 md:p-10 space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">오늘의 운세 · 확장 리포트</h1>
          <p className="text-neutral-600 mt-2">현대적 코칭 톤으로 생성됩니다. 레벨 합본을 선택하면 10만자+ 리포트를 받을 수 있어요.</p>
        </div>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="label">이름</label><input className="input" required value={form.name} onChange={e => setForm(v => ({...v, name: e.target.value}))}/></div>
          <div><label className="label">성별</label><select className="input" value={form.gender} onChange={e => setForm(v => ({...v, gender: e.target.value as any}))}><option>남성</option><option>여성</option><option>기타</option></select></div>
          <div><label className="label">생년월일</label><input type="date" className="input" required value={form.birthDate} onChange={e => setForm(v => ({...v, birthDate: e.target.value}))}/></div>
          <div><label className="label">출생시간 (선택)</label><input type="time" className="input" value={form.birthTime} onChange={e => setForm(v => ({...v, birthTime: e.target.value}))}/></div>
          <div><label className="label">MBTI (선택)</label><select className="input" value={form.mbti} onChange={e => setForm(v => ({...v, mbti: e.target.value}))}>{MBTIs.map(m => <option key={m} value={m}>{m || "선택 안함"}</option>)}</select></div>
          <div><label className="label">리포트 모드</label><select className="input" value={form.mode} onChange={e => setForm(v => ({...v, mode: e.target.value as Mode}))}><option value="today">오늘 요약</option><option value="levels">레벨 합본(오늘·주간·월간·연간)</option></select></div>
          <div><label className="label">톤</label><select className="input" value={form.tone} onChange={e => setForm(v => ({...v, tone: e.target.value as Tone}))}><option value="warm">따뜻한 코칭</option><option value="direct">직설 멘토</option><option value="executive">임원 보고서</option></select></div>
          <div className="md:col-span-2">
            {form.mode === "levels" && (<div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 flex items-start gap-3"><AlertTriangle className="w-5 h-5 mt-0.5"/><div><b>안내:</b> 10만자 리포트는 매우 길어 로딩 및 PDF 저장에 시간이 걸릴 수 있어요.</div></div>)}
          </div>
          <div className="md:col-span-2"><button className="btn btn-primary w-full md:w-auto" type="submit" disabled={busy}>{busy ? "생성 중..." : "운세 생성"}</button></div>
        </form>
        {result && (
          <div id="result" className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">결과</h2>
              <div className="flex gap-2">
                <button onClick={copyText} className="btn gap-2"><Copy className="w-4 h-4"/> 복사</button>
                <PDFButton htmlId="result-text" filename={form.mode === "levels" ? "fortune-100k.pdf" : "today-fortune.pdf"} />
                <button className="btn btn-primary" onClick={async ()=>{
                  const bodyHTML = marked.parse((result?.markdown || "")) as string;
                  const res = await fetch("/api/pdf", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ html: buildCoverHTML({
                      name: form.name, birthDate: form.birthDate, birthTime: form.birthTime || "", gender: form.gender, mbti: form.mbti, tone: form.tone,
                      color: (result as any)?.meta?.color, number: (result as any)?.meta?.number, item: (result as any)?.meta?.item, bodyHTML
                    }), filename: form.mode === "levels" ? "fortune-pro-100k.pdf" : "fortune-pro-today.pdf" })
                  });
                  if(res.ok){
                    const blob = await res.blob(); const url = URL.createObjectURL(blob);
                    const a = document.createElement("a"); a.href = url; a.download = form.mode === "levels" ? "fortune-pro-100k.pdf" : "fortune-pro-today.pdf"; a.click(); URL.revokeObjectURL(url);
                  }else{ alert("Pro PDF 생성 실패"); }
                }}>Pro PDF로 저장</button>
              </div>
            </div>
            <div id="result-text" className="prose max-w-none whitespace-pre-wrap leading-7">{result.markdown}</div>
            <p className="text-xs text-neutral-500">* 본 서비스는 오락/엔터테인먼트 용도이며, 의사결정은 사용자 책임입니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
