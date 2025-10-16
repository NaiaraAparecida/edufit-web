import { NextRequest, NextResponse } from "next/server";
const ok = (req: NextRequest) => {
  const h = req.headers.get("authorization") || "";
  const token = h.replace(/^Bearer\s+/i, "");
  return token === process.env.REUSE_ADMIN_TOKEN;
};
export async function POST(req: NextRequest) {
  if (!ok(req)) return new NextResponse("Unauthorized", { status: 401 });
  // TODO: publicar evento/notify se quiser (Redis, PubSub, Webhook)
  return new NextResponse(null, { status: 202 });
}
