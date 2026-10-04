#!/bin/bash
# Render PNG previews of generated models for the Structures gallery (needs Playwright's headless Chromium).
# Usage: tools/previews.sh [base-url]   (default http://f.g77k.com/learn/peptides/, resolved to 127.0.0.1)
cd "$(dirname "$0")/.."
BASE=${1:-http://f.g77k.com/learn/peptides/}
CH=$(ls -d ~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | tail -1)
[ -x "$CH" ] || { echo "headless chromium not found"; exit 1; }
for m in data/cache/models/*.json; do
  slug=$(basename "$m" .json)
  file=$(php -r '$d=json_decode(file_get_contents($argv[1]),true); echo $d["file"] ?? "";' "$m")
  [ -n "$file" ] || continue
  fmt=pdb; [[ "$file" == *.sdf ]] && fmt=sdf
  out="data/cache/img/model-$slug.png"
  timeout 60 "$CH" --no-sandbox --hide-scrollbars --host-resolver-rules="MAP f.g77k.com 127.0.0.1" --window-size=600,600 \
    --virtual-time-budget=6000 --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader \
    --screenshot="$out" "${BASE}tools/preview.html?f=${file}&fmt=${fmt}" 2>/dev/null
  echo "$slug -> $out ($(stat -c %s "$out" 2>/dev/null) bytes)"
done
