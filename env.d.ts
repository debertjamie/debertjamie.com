interface CloudflareEnv {
  GALLERY_BUCKET: R2Bucket;
  VISITOR_COUNTER: DurableObjectNamespace<
    import("./src/lib/counter/visitor-counter").VisitorCounter
  >;
  // Secret key for HMAC-hashing visitor IPs (rate-limiting only). Optional:
  // when unset, visits are counted without per-IP rate limiting.
  VISITOR_IP_HASH_SECRET?: string;
}
