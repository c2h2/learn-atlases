#!/bin/bash
cd /home/c2h2/learn/mechanical && bash tools/check.sh "$@" 2>&1 | grep -E "ERROR|warn |check:|words|^[a-z-]+/" | grep -v "not written yet" | grep -v "Chinese translation" | grep -v "course.json"
