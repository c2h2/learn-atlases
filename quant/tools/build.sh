#!/bin/bash
# Full build: extract and typeset every formula, validate, then warm all page caches.
#   tools/build.sh
set -u
cd "$(dirname "$0")/.."
php tools/extract.php || exit 1
node tools/build.js --quiet; b=$?
php tools/check.php > data/cache/check-report.txt 2>&1; c=$?
tail -3 data/cache/check-report.txt
php tools/i18n_keys.php --missing > /dev/null
php tools/prerender.php
chmod -R a+rwX data/cache 2>/dev/null
[ $b -eq 0 ] && [ $c -eq 0 ]
