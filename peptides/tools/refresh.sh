#!/bin/bash
# Refresh every fetched dataset for Peptide Atlas. Safe to run from cron, e.g. weekly:
#   17 4 * * 1  /var/www/f.g77k.com/learn/peptides/tools/refresh.sh >> /var/www/f.g77k.com/learn/peptides/data/cache/refresh.log 2>&1
set -u
cd "$(dirname "$0")/.."
echo "== refresh $(date -u +%FT%TZ)"
php tools/fetch.php wiki --force
php tools/fetch.php wikizh --force
php tools/fetch.php editions --force
php tools/fetch.php ctgov --force
php tools/fetch.php pubchem
php tools/fetch.php pdb
php tools/fetch.php pubmed --force
# per-country readership: latest 28 days and the same window a year earlier
END=$(date -u -d yesterday +%F)
tools/dp_download.sh "$END" 28
tools/dp_download.sh "$(date -u -d "$END -1 year" +%F)" 28
find data/raw/dpcountry -name '*.tsv.gz' -mtime +400 -delete 2>/dev/null
php tools/fetch.php country
php -r 'require "inc/bootstrap.php"; array_map("unlink", glob(ATLAS_CACHE . "/compiled-*.json") ?: []); foreach (["en", "zh"] as $l) { $GLOBALS["ATLAS_LANG"] = $l; echo "compiled ", count(atlas_all()), " peptides ($l)\n"; }'
echo "== done $(date -u +%FT%TZ)"
