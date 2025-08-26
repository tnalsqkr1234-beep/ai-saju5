import { NextRequest, NextResponse } from "next/server";
import { generateReport, type Inputs } from "@/lib/generateFortune";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest){
  const body = await req.json();
  const input: Inputs & { mode: "today" | "levels" } = {
    name: body.name || "",
    birthDate: body.birthDate || "",
    birthTime: body.birthTime || "",
    gender: body.gender || "남성",
    mbti: body.mbti || "",
    tone: body.tone || "warm",
    mode: body.mode === "levels" ? "levels" : "today"
  };
  const out = generateReport(input, input.mode);
  return NextResponse.json(out);
}

export async function GET(){
  return NextResponse.json({ ok: true, route: "report" });
}
