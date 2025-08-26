import { NextRequest } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest){
  const { html, filename } = await req.json();
  const execPath = await chromium.executablePath();
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: execPath,
    headless: true
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4", printBackground: true, margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" } });
  await browser.close();
  const pdfArray = new Uint8Array(pdf as any);
  return new Response(pdfArray, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename || "report.pdf"}"`
    }
  });
}

export async function GET(){
  return new Response(JSON.stringify({ ok: true, route: "pdf" }), { headers: { "Content-Type": "application/json" }});
}
