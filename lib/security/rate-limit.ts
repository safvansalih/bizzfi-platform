type RateLimitEntry = {
  count: number;
  resetTime: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetTime: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();

  const existingEntry =
    rateLimitStore.get(identifier);

  // Create a new rate limit window
  if (
    !existingEntry ||
    now > existingEntry.resetTime
  ) {
    const resetTime =
      now + options.windowMs;

    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    });

    return {
      success: true,
      remaining: options.limit - 1,
      resetTime,
    };
  }

  // Rate limit exceeded
  if (
    existingEntry.count >= options.limit
  ) {
    return {
      success: false,
      remaining: 0,
      resetTime:
        existingEntry.resetTime,
    };
  }

  // Increase request count
  existingEntry.count += 1;

  rateLimitStore.set(
    identifier,
    existingEntry
  );

  return {
    success: true,
    remaining:
      options.limit -
      existingEntry.count,
    resetTime:
      existingEntry.resetTime,
  };
}

/**
 * Get the client IP address from
 * common proxy headers.
 */
export function getClientIp(
  request: Request
) {
  const forwardedFor =
    request.headers.get(
      "x-forwarded-for"
    );

  if (forwardedFor) {
    return (
      forwardedFor
        .split(",")[0]
        ?.trim() || "unknown"
    );
  }

  const realIp =
    request.headers.get(
      "x-real-ip"
    );

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}