#!/usr/bin/env bash
set -euo pipefail

# Copy the Space Security Team MUMPS.IO integration into a sibling/target
# MUMPS.IO checkout while preserving its directory structure.
SOURCE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MIO_ROOT="${1:-$(dirname "$SOURCE_ROOT")/mumps.io}"

if [[ ! -d "$MIO_ROOT/routines" || ! -d "$MIO_ROOT/templates" || ! -d "$MIO_ROOT/public" ]]; then
  printf 'Error: %s does not look like a MUMPS.IO checkout (expected routines/, templates/, public/).\n' "$MIO_ROOT" >&2
  printf 'Usage: %s /absolute/path/to/mumps.io\n' "$0" >&2
  exit 2
fi

mkdir -p "$MIO_ROOT/templates/layouts" "$MIO_ROOT/templates/pages" \
         "$MIO_ROOT/public/space-security" "$MIO_ROOT/docs"

cp -a "$SOURCE_ROOT/routines/SPACETEAM.m" "$MIO_ROOT/routines/"
cp -a "$SOURCE_ROOT/templates/layouts/space_security_layout.html" "$MIO_ROOT/templates/layouts/"
cp -a "$SOURCE_ROOT/templates/pages/space_security_home.html" "$MIO_ROOT/templates/pages/"
cp -a "$SOURCE_ROOT/public/space-security/." "$MIO_ROOT/public/space-security/"
cp -a "$SOURCE_ROOT/docs/SPACE_SECURITY_LANDING_PAGE.md" "$MIO_ROOT/docs/"
cp -a "$SOURCE_ROOT/docs/FIELD_LOG_001.md" "$MIO_ROOT/docs/"
cp -a "$SOURCE_ROOT/docs/BREATH_FIELD_LOG_CONCEPT.md" "$MIO_ROOT/docs/"

printf 'Space Security Team files copied into: %s\n' "$MIO_ROOT"
printf 'Next: register SPACETEAM and recompile routes using the sequence documented in docs/SPACE_SECURITY_LANDING_PAGE.md.\n'
