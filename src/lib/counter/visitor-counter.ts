import { DurableObject } from "cloudflare:workers";

// Global, all-time visitor counter backed by a single SQLite-backed Durable
// Object (the only DO storage backend available on the Workers Free plan).
//
// All increments serialize through one instance (idFromName("global")), so the
// total is exact — no lost updates and no load on the Neon Postgres used by the
// rest of the site. A per-IP rate limit blunts scripted abuse of the beacon.
export class VisitorCounter extends DurableObject<CloudflareEnv> {
  // 1 increment per IP hash per RATE_LIMIT_MS.
  private static readonly RATE_LIMIT_MS = 60_000;

  constructor(ctx: DurableObjectState, env: CloudflareEnv) {
    super(ctx, env);
    // Create tables on first construction. blockConcurrencyWhile guarantees no
    // request runs against this instance until the schema exists.
    ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(
        "CREATE TABLE IF NOT EXISTS counter (id INTEGER PRIMARY KEY, count INTEGER NOT NULL)",
      );
      this.ctx.storage.sql.exec(
        "INSERT OR IGNORE INTO counter (id, count) VALUES (1, 0)",
      );
      this.ctx.storage.sql.exec(
        "CREATE TABLE IF NOT EXISTS seen (ip_hash TEXT PRIMARY KEY, ts INTEGER NOT NULL)",
      );
    });
  }

  private readCount(): number {
    const cursor = this.ctx.storage.sql.exec<{ count: number }>(
      "SELECT count FROM counter WHERE id = 1",
    );
    const row = cursor.toArray()[0];
    return row?.count ?? 0;
  }

  /** Current total without incrementing (used for display reads). */
  get(): number {
    return this.readCount();
  }

  /**
   * Increment the total unless the given IP hash incremented within the rate
   * limit window. Returns the resulting total either way.
   */
  increment(ipHash: string): number {
    const now = Date.now();
    const windowStart = now - VisitorCounter.RATE_LIMIT_MS;

    // Drop stale rate-limit rows so the table does not grow unbounded.
    this.ctx.storage.sql.exec("DELETE FROM seen WHERE ts < ?", windowStart);

    if (ipHash) {
      const recent = this.ctx.storage.sql
        .exec<{ ts: number }>(
          "SELECT ts FROM seen WHERE ip_hash = ? AND ts >= ?",
          ipHash,
          windowStart,
        )
        .toArray();
      if (recent.length > 0) {
        // Rate limited: return the current total unchanged.
        return this.readCount();
      }
      this.ctx.storage.sql.exec(
        "INSERT OR REPLACE INTO seen (ip_hash, ts) VALUES (?, ?)",
        ipHash,
        now,
      );
    }

    this.ctx.storage.sql.exec("UPDATE counter SET count = count + 1 WHERE id = 1");
    return this.readCount();
  }
}
