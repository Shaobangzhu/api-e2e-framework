import * as dns from 'dns';

// Save the original lookup
const originalLookup = dns.lookup;

// Define the patched lookup with __promisify__ preserved
const patchedLookup = function (
  hostname: string,
  options: any,
  callback: any
): void {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options.family = 4; // 👈 Force IPv4
  return originalLookup(hostname, options, callback);
} as typeof dns.lookup;

// Copy __promisify__ if it exists
if ('__promisify__' in originalLookup) {
  (patchedLookup as any).__promisify__ = (originalLookup as any).__promisify__;
}

// Override the lookup
(dns as any).lookup = patchedLookup;