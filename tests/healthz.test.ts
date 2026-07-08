import assert from "node:assert/strict";
import { test } from "node:test";
import { GET } from "../app/healthz/route";

test("GET /healthz returns 200 with a simple, safe health body", async () => {
  const response = GET();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");

  const body = await response.json();
  assert.deepEqual(body, { ok: true, service: "medicare-bend-site", status: "healthy" });
});

test("GET /healthz exposes no secrets, env values, or deployment internals", async () => {
  const response = GET();
  const text = JSON.stringify(await response.json());

  assert.doesNotMatch(
    text,
    /uptime|process|_env|api[_-]?key|secret|token|password|firebase|crm|private/i,
  );
});
