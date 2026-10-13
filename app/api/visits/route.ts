import { getCloudflareContext } from "@opennextjs/cloudflare";

// Resolve the single global counter Durable Object instance.
function getCounter() {
  const { env } = getCloudflareContext();
  const id = env.VISITOR_COUNTER.idFromName("global");
  return env.VISITOR_COUNTER.get(id);
}

// Turn the visitor IP into a keyed, daily-rotating hash used ONLY transiently
// for rate limiting. The raw IP is never stored or logged.
//
// HMAC-SHA256 with a server-only secret means the hash cannot be brute-forced
// back to an IP (a plain SHA-256 of an IP is reversible — IPv4 is a tiny space).
// Mixing the current UTC date into the message rotates the hash every day, so
// the same IP produces a different value each day and hashes cannot be linked
// across days.
//
// Returns "" when no secret is configured, which signals the caller to count
// the visit WITHOUT per-IP rate limiting rather than fall back to a weak,
// unkeyed hash or fail the request.
async function hashIp(ip: string, secret: string | undefined): Promise<string> {
  if (!ip || !secret) return "";

  const dayBucket = new Date().toISOString().slice(0, 10); // UTC YYYY-MM-DD
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${dayBucket}|${ip}`),
  );
  return [...new Uint8Array(signature)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const JSON_HEADERS = { "content-type": "application/json" };

// Increment the global counter (called once per browser session via a beacon).
export async function POST(req: Request) {
  try {
    const { env } = getCloudflareContext();
    const ip =
      req.headers.get("CF-Connecting-IP") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "";
    const ipHash = await hashIp(ip, env.VISITOR_IP_HASH_SECRET);

    const counter = getCounter();
    const count = await counter.increment(ipHash);

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { ...JSON_HEADERS, "Cache-Control": "no-store" },
    });
  } catch {
    return new Response(JSON.stringify({ count: null, error: true }), {
      status: 503,
      headers: { ...JSON_HEADERS, "Cache-Control": "no-store" },
    });
  }
}

// Read-only current total (for display without incrementing).
export async function GET() {
  try {
    const counter = getCounter();
    const count = await counter.get();

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { ...JSON_HEADERS, "Cache-Control": "public, max-age=0, s-maxage=30" },
    });
  } catch {
    return new Response(JSON.stringify({ count: null, error: true }), {
      status: 503,
      headers: { ...JSON_HEADERS, "Cache-Control": "no-store" },
    });
  }
}
