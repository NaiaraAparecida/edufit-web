import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Garante runtime Node (necessário para fs em produção)
export const runtime = "nodejs";

const CONFIG_PATH = path.join(process.cwd(), "data", "admin-config.json");

// 1) Tipo da configuração (evita "any")
type AdminConfig = {
  enableTrades: boolean;
  enablePushNotifications: boolean;
  maintenanceMode: boolean;
  maxImagesPerItem: number;
  bannerText: string;
};

const DEFAULT_CONFIG: AdminConfig = {
  enableTrades: true,
  enablePushNotifications: true,
  maintenanceMode: false,
  maxImagesPerItem: 5,
  bannerText: "",
};

// 2) Auth do header Authorization: Bearer <token>
function ok(req: NextRequest): boolean {
  const h = req.headers.get("authorization") ?? "";
  const token = h.replace(/^Bearer\s+/i, "");
  const secret = process.env.REUSE_ADMIN_TOKEN;
  return Boolean(secret) && token === secret;
}

// 3) Funções de IO tipadas
async function readCfg(): Promise<AdminConfig> {
  try {
    const data = await fs.readFile(CONFIG_PATH, "utf8");
    const parsed = JSON.parse(data) as Partial<AdminConfig>;
    return {
      enableTrades: !!parsed.enableTrades,
      enablePushNotifications: !!parsed.enablePushNotifications,
      maintenanceMode: !!parsed.maintenanceMode,
      maxImagesPerItem: Math.max(1, Math.min(10, Number(parsed.maxImagesPerItem ?? 5))),
      bannerText: String(parsed.bannerText ?? ""),
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}

async function writeCfg(cfg: AdminConfig): Promise<void> {
  await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
  await fs.writeFile(CONFIG_PATH, JSON.stringify(cfg, null, 2), "utf8");
}

// 4) Handlers
export async function GET(req: NextRequest) {
  if (!ok(req)) return new NextResponse("Unauthorized", { status: 401 });
  const cfg = await readCfg();
  return NextResponse.json(cfg);
}

export async function PUT(req: NextRequest) {
  if (!ok(req)) return new NextResponse("Unauthorized", { status: 401 });

  let body: Partial<AdminConfig>;
  try {
    body = (await req.json()) as Partial<AdminConfig>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const cfg: AdminConfig = {
    enableTrades: !!body.enableTrades,
    enablePushNotifications: !!body.enablePushNotifications,
    maintenanceMode: !!body.maintenanceMode,
    maxImagesPerItem: Math.max(1, Math.min(10, Number(body.maxImagesPerItem ?? 5))),
    bannerText: String(body.bannerText ?? ""),
  };

  await writeCfg(cfg);
  return NextResponse.json({ ok: true, cfg });
}
