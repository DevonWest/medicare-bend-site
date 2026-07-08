import { NextResponse } from "next/server";

// Lightweight liveness probe for Cloud Run / uptime checks and beta/prod smoke
// tests. It does no I/O (no Firestore, no external calls) so it stays fast and
// cannot fail because of downstream dependencies, and it exposes NO environment
// values or deployment internals — only a fixed, safe service/status signal.
// `force-dynamic` keeps it from ever being statically cached so it always runs.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { ok: true, service: "medicare-bend-site", status: "healthy" },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
