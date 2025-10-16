
/**
 * Rate Limiter Utility
 * Simple in-memory rate limiter for API requests
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();

  /**
   * Check if a request should be rate limited
   * @param key - Unique key for the rate limit (e.g., connector ID)
   * @param maxRequests - Maximum requests per minute
   * @returns true if request is allowed, false if rate limited
   */
  async checkLimit(key: string, maxRequests: number): Promise<boolean> {
    const now = Date.now();
    const entry = this.limits.get(key);

    if (!entry || now > entry.resetAt) {
      // No entry or expired, create new entry
      this.limits.set(key, {
        count: 1,
        resetAt: now + 60000, // 1 minute
      });
      return true;
    }

    if (entry.count >= maxRequests) {
      // Rate limit exceeded
      return false;
    }

    // Increment count
    entry.count++;
    return true;
  }

  /**
   * Get time until rate limit resets (in milliseconds)
   */
  getResetTime(key: string): number {
    const entry = this.limits.get(key);
    if (!entry) {
      return 0;
    }
    return Math.max(0, entry.resetAt - Date.now());
  }

  /**
   * Clear rate limit for a key
   */
  clear(key: string): void {
    this.limits.delete(key);
  }

  /**
   * Clear all rate limits
   */
  clearAll(): void {
    this.limits.clear();
  }
}
