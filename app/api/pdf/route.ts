
import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const dynamic = "force-dynamic"; // ensure Node runtime
export const runtime = "nodejs";

type Payload = {
  html: string;                // full HTML string
  filename?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { html, filename = "fortune-pro.pdf" } = await req.json() as Payload;
    if (!html) return NextResponse.json({ error: "Missing html" }, { status: 400 });

    // Launch headless Chrome (Vercel-friendly)
    const execPath = await chromium.executablePath();
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: execPath,
      headless: true
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "14mm", right: "14mm", bottom: "16mm", left: "14mm" },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:8px;width:100%;padding:4px 12px;color:#999;display:flex;justify-content:flex-end;"><span class="date"></span></div>`,
      footerTemplate: `<div style="font-size:8px;width:100%;padding:4px 12px;color:#999;display:flex;justify-content:space-between;"><div>마음사주·MBTI</div><div><span class="pageNumber"></span>/<span class="totalPages"></span></div></div>`
    });

    await browser.close();
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`
      }
    });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || "Failed to generate PDF" }, { status: 500 });
  }
}


export async function GET(){
  return NextResponse.json({ ok: true, route: "pdf", method: "GET", note: "Use POST with {html, filename}." });
}
