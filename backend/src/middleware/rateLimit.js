/**
 * Simple in-memory sliding-window rate limiter (per process). Good enough for abuse mitigation on a single node.
 * For multi-instance production, use Redis or an edge limiter.
 */
export function createRateLimiter({ name = 'rl', windowMs, max, keyFn = (req) => req.userId || req.ip || 'anon' }) {
  const buckets = new Map();
  return function rateLimitMiddleware(req, res, next) {
    const key = `${name}:${keyFn(req)}`;
    const now = Date.now();
    const windowStart = now - windowMs;
    let times = buckets.get(key) || [];
    times = times.filter((t) => t > windowStart);
    if (times.length >= max) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a few minutes and try again.',
      });
    }
    times.push(now);
    buckets.set(key, times);
    return next();
  };
}
