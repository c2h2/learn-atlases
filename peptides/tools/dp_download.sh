#!/bin/bash
# Download Wikimedia's differentially-private per-country pageview files for a 28-day window.
# Usage: tools/dp_download.sh <end-date YYYY-MM-DD> [days=28]
# Files land in data/raw/dpcountry/ (gzip); run `php tools/fetch.php country` afterwards.
set -e
END=${1:-$(date -d yesterday +%F)}
N=${2:-28}
DIR="$(cd "$(dirname "$0")/.." && pwd)/data/raw/dpcountry"
mkdir -p "$DIR" && cd "$DIR"
for i in $(seq 0 $((N-1))); do date -d "$END -$i day" +%F; done | xargs -P 4 -I{} sh -c '
  f={}.tsv; [ -s "$f.gz" ] && exit 0
  curl -sf --compressed -m 1800 -o "$f" "https://analytics.wikimedia.org/published/datasets/country_project_page/$f" && gzip -f "$f" && echo "got $f"'
