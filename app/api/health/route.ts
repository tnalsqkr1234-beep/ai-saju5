export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(){
  return new Response(JSON.stringify({ status: "ok", ts: new Date().toISOString() }), { headers: { "Content-Type": "application/json" } });
}
