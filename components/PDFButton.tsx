"use client";

import { jsPDF } from "jspdf";
import { FileDown } from "lucide-react";
import { useState } from "react";

export default function PDFButton({ htmlId, filename="fortune.pdf" }:{htmlId: string; filename?: string}){
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const el = document.getElementById(htmlId);
      if(!el) throw new Error("내용을 찾을 수 없어요.");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      // Simple text export: extract textContent to avoid heavy rasterization
      const text = el.innerText || "";
      const margin = 40;
      const maxWidth = 515;
      const lines = doc.splitTextToSize(text, maxWidth);
      let y = margin;
      for (const line of lines) {
        if (y > 780) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += 16;
      }
      doc.save(filename);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <button onClick={handleSave} className="btn btn-primary gap-2">
      <FileDown className="w-4 h-4" /> {saving ? "생성 중..." : "PDF로 저장"}
    </button>
  );
}
