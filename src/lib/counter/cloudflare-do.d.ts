// Minimal ambient types for the Durable Object APIs this project uses.
//
// We intentionally do NOT pull in the full Cloudflare runtime types
// (`wrangler types`), because those globally override the DOM lib (e.g. making
// `Response.json()` return `unknown`) and break existing fetch-based code.
// This file declares only the small surface the visitor counter needs.

interface SqlStorageCursor<T> {
  toArray(): T[];
}

interface SqlStorage {
  exec<T = Record<string, unknown>>(
    query: string,
    ...bindings: unknown[]
  ): SqlStorageCursor<T>;
}

interface DurableObjectStorage {
  sql: SqlStorage;
}

interface DurableObjectState {
  storage: DurableObjectStorage;
  blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
}

declare module "cloudflare:workers" {
  export abstract class DurableObject<Env = unknown> {
    protected ctx: DurableObjectState;
    protected env: Env;
    constructor(ctx: DurableObjectState, env: Env);
  }
}
