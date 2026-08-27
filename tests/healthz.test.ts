import assert from "node:assert/strict";
import { test } from "node:test";
import { GET as getHealth } from "../app/health/route";
import { GET as getHealthz } from "../app/healthz/route";

const healthRoutes = [
  ["/health", getHealth],
  ["/healthz", getHealthz],
] as const;

for (const [path, handler] of healthRoutes) {
  test(`GET ${path} returns 200 with a simple, safe health body`, async () => {
    const response = handler();

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");

    const body = await response.json();
    assert.deepEqual(body, { ok: true, service: "medicare-bend-site", status: "healthy" });
  });

  test(`GET ${path} exposes no secrets, env values, or deployment internals`, async () => {
    const response = handler();
    const text = JSON.stringify(await response.json());

    assert.doesNotMatch(
      text,
      /uptime|process|_env|api[_-]?key|secret|token|password|firebase|crm|private/i,
    );
  });
}
