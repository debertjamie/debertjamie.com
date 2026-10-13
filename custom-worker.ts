// Custom Worker entry (see https://opennext.js.org/cloudflare/howtos/custom-worker).
//
// The OpenNext-generated worker only exports a `fetch` handler plus the cache
// Durable Object classes. To expose our own Durable Object (VisitorCounter) we
// re-use the generated fetch handler and re-export everything the generated
// worker already exports, so the Worker's export surface is unchanged, then add
// our class on top.
//
// `.open-next/worker.js` is generated at build time by `build:worker`; its
// types are declared ambiently in open-next-worker.d.ts.

import { default as handler } from "./.open-next/worker.js";

export { VisitorCounter } from "./src/lib/counter/visitor-counter";

// Re-export the OpenNext cache Durable Objects verbatim so the Worker's export
// surface is identical to the generated worker.
export {
  DOQueueHandler,
  DOShardedTagCache,
  BucketCachePurge,
} from "./.open-next/worker.js";

const worker = {
  fetch: handler.fetch,
};

export default worker;
