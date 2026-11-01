#!/bin/bash
# Validate and build content: extract formulas and figures, typeset with KaTeX, then structural checks.
#   tools/check.sh                    everything
#   tools/check.sh calculus-1 ode     only these courses
#   tools/check.sh --lang=en calculus-1
set -u
cd "$(dirname "$0")/.."
php tools/extract.php "$@" || exit 1
node tools/build.js --quiet "$@"
b=$?
php tools/check.php "$@"
c=$?
[ $b -eq 0 ] && [ $c -eq 0 ]
