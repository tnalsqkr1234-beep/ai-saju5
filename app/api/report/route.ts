
import { NextRequest, NextResponse } from "next/server";
import { generateReport, type Inputs } from "@/lib/generateFortune";

export const runtime = "nodejs";

export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const input: Inputs = {
      name: body.name || "",
      birthDate: body.birthDate || "",
      birthTime: body.birthTime || "",
      gender: (body.gender || "남성"),
      mbti: body.mbti || "",
      tone: body.tone || "warm"
    } as any;
    const mode = (body.mode === "levels" ? "levels" : "today") as any;
    const result = generateReport(input, mode);
    return NextResponse.json(result);
  }catch(e:any){
    return NextResponse.json({ error: e?.message || "failed" }, { status: 400 });
  }
}


export async function GET(){
  return NextResponse.json({ ok: true, route: "report", method: "GET" });
}
