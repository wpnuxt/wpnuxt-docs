#!/usr/bin/env bash
# Run `nuxt typecheck` and ignore upstream Docus errors that we can't fix.
# CI exits 0 if the only remaining TS errors are inside the docus layer
# (node_modules/.pnpm/docus@*), and exits 1 on any other error.

set -uo pipefail

LOG=$(mktemp -t wpnuxt-tc.XXXXXX)
trap 'rm -f "$LOG"' EXIT

# Run typecheck, stream output, capture for filtering. Preserve exit code.
nuxt typecheck 2>&1 | tee "$LOG"
TC_STATUS=${PIPESTATUS[0]}

# If typecheck succeeded outright, just propagate success.
if [ "$TC_STATUS" -eq 0 ]; then
  exit 0
fi

# Look for any TS error lines that are NOT inside the docus package.
# nuxt typecheck output lines look like:
#   path/to/file.ts(12,34): error TS2345: ...
NON_DOCUS_ERRORS=$(grep -E 'error TS[0-9]+' "$LOG" | grep -vE 'node_modules/\.pnpm/docus@' || true)

if [ -n "$NON_DOCUS_ERRORS" ]; then
  echo ""
  echo "✗ Type errors outside the docus layer — failing typecheck."
  exit 1
fi

echo ""
echo "✓ Only upstream docus type errors remain — treating typecheck as passing."
exit 0
