// Ambient declaration for the OpenNext-generated worker, which only exists
// after `build:worker`. Lets custom-worker.ts type-check on a clean checkout.
declare module "*/.open-next/worker.js" {
  const handler: {
    fetch: (
      request: Request,
      env: unknown,
      ctx: unknown,
    ) => Response | Promise<Response>;
  };
  export default handler;
  export const DOQueueHandler: unknown;
  export const DOShardedTagCache: unknown;
  export const BucketCachePurge: unknown;
}
