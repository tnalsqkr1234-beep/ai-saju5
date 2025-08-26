import { NextResponse } from "next/server";

export async function POST() {
  // This is a MOCK. Replace with PortOne/Toss/Kakao SDK server-side logic.
  const id = "sess_" + Math.random().toString(36).slice(2);
  const payload = {
    id,
    amount: 9900,
    currency: "KRW",
    provider: "MOCK",
    createdAt: new Date().toISOString(),
    next: {
      success_url: "/premium/success",
      cancel_url: "/premium/cancel"
    }
  };
  return NextResponse.json(payload, { status: 200 });
}
