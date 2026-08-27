import { NextResponse } from "next/server";

// Canonical liveness probe for Cloud Run, uptime checks, and post-deploy smoke
// tests. It performs no I/O and exposes only a fixed service/status signal.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { ok: true, service: "medicare-bend-site", status: "healthy" },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
