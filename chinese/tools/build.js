#!/usr/bin/env node
/* Render every extracted formula with KaTeX and validate interactive figures and answer checks.
 *
 *   node tools/build.js [course ...] [--lang=en|zh] [--quiet]
 *
 * Reads data/cache/extract/<lang>/<course>/<doc>.json (written by tools/extract.php) and writes
 * data/cache/katex/<lang>/<course>/<doc>.json = { md5(("D:"|"I:") + tex): html }.
 * Exit code 1 when any formula, figure or check is invalid.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
process.umask(0); // caches are shared with the web server user
const katex = require(path.join(ROOT, 'assets/vendor/katex/katex.min.js'));
const expr = require(path.join(ROOT, 'assets/js/expr.js'));
const macros = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/macros.json'), 'utf8'));
const catalogue = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/widgets.json'), 'utf8')).types;

const args = process.argv.slice(2);
const only = args.filter((a) => !a.startsWith('--'));
const langArg = (args.find((a) => a.startsWith('--lang=')) || '').slice(7);
const quiet = args.includes('--quiet');
const langs = langArg ? [langArg] : ['en', 'zh'];

const errors = [];
let nMath = 0, nWidgets = 0, nChecks = 0, nDocs = 0;
const err = (file, line, msg) => errors.push(`${file}:${line || 0}: ${msg}`);

// ------------------------------------------------------------------ figure validation
function splitList(v) { return String(v).split(';').map((s) => s.trim()).filter(Boolean); }
function numVal(v) {
  const x = expr.value(String(v).trim());
  if (!Number.isFinite(x)) throw new Error('not a finite number');
  return x;
}
function checkParam(type, spec, value, sliderNames) {
  const v = String(value).trim();
  switch (spec.type) {
    case 'expr': expr.parse(v, { vars: (spec.vars || ['x']).concat(sliderNames) }); return;
    case 'exprs': splitList(v).forEach((q) => expr.parse(q, { vars: (spec.vars || ['x']).concat(sliderNames) })); return;
    case 'cexpr': expr.compileC(expr.parse(v, { vars: ['z'].concat(sliderNames), complex: true })); return;
    case 'num': numVal(v); return;
    case 'int': { const x = numVal(v); if (!Number.isInteger(x)) throw new Error('must be an integer'); return; }
    case 'bool': if (!/^(true|false|yes|no|on|off|1|0)$/i.test(v)) throw new Error('must be true or false'); return;
    case 'range': {
      const s = v.replace(/^\[|\]$/g, '');
      const parts = s.includes(';') ? s.split(';') : s.includes(',') ? s.split(',') : s.split(':');
      if (parts.length !== 2) throw new Error('range must be "min, max"');
      const [a, b] = parts.map(numVal);
      if (!(b > a)) throw new Error('range needs min < max');
      return;
    }
    case 'enum': if (!spec.values.includes(v)) throw new Error('must be one of ' + spec.values.join(', ')); return;
    case 'points': splitList(v).forEach((p) => { const xy = p.replace(/^\(|\)$/g, '').split(','); if (xy.length < 2) throw new Error('points are "x,y; x,y"'); xy.forEach(numVal); }); return;
    case 'matrix': {
      const rows = splitList(v).map((r) => r.split(',').map(numVal));
      if (!rows.length || rows.some((r) => r.length !== rows[0].length)) throw new Error('matrix rows must have equal length ("a,b; c,d")');
      return;
    }
    case 'sliders': {
      v.split(/[;,]\s*(?=[A-Za-z_]\w*\s*=)/).map((q) => q.trim()).filter(Boolean).forEach((q) => {
        const m = /^([A-Za-z_]\w*)\s*=\s*(.+)$/.exec(q);
        if (!m) throw new Error('slider must look like a=1:-3:3:0.1');
        const p = m[2].split(':').map(numVal);
        if (p.length < 3 || !(p[2] > p[1])) throw new Error('slider ' + m[1] + ' needs value:min:max with min < max');
      });
      return;
    }
    default: return; // str, list
  }
}
function validateWidget(file, w) {
  const spec = catalogue[w.type];
  if (!spec) { err(file, w.line, `unknown widget type "${w.type}" (see data/widgets.json)`); return; }
  const cfg = w.config || {};
  let sliderNames = [];
  if (cfg.sliders) {
    try { sliderNames = String(cfg.sliders).split(/[;,]\s*(?=[A-Za-z_]\w*\s*=)/).map((q) => q.trim().split('=')[0].trim()).filter(Boolean); } catch (e) { /* reported below */ }
  }
  if (w.type === 'distribution' || w.type === 'hypothesis') sliderNames = [];
  for (const k of Object.keys(cfg)) {
    if (k === 'caption' || k === 'title') continue;
    const ps = spec.params[k];
    if (!ps) { err(file, w.line, `widget ${w.type}: unknown key "${k}" (allowed: ${Object.keys(spec.params).join(', ')})`); continue; }
    try { checkParam(w.type, ps, cfg[k], sliderNames); } catch (e) { err(file, w.line, `widget ${w.type}: ${k}: ${e.message}`); }
  }
  for (const [k, ps] of Object.entries(spec.params)) {
    if (ps.required && !(k in cfg)) err(file, w.line, `widget ${w.type}: missing required key "${k}"`);
  }
}

// ------------------------------------------------------------------ main
for (const lang of langs) {
  const base = path.join(ROOT, 'data/cache/extract', lang);
  if (!fs.existsSync(base)) continue;
  const entries = [];
  for (const d of fs.readdirSync(base)) {
    const p = path.join(base, d);
    if (d.endsWith('.json')) { if (!only.length) entries.push([d.slice(0, -5), p]); continue; }
    if (only.length && !only.includes(d)) continue;
    for (const f of fs.readdirSync(p)) if (f.endsWith('.json')) entries.push([d + '/' + f.slice(0, -5), path.join(p, f)]);
  }
  for (const [key, file] of entries) {
    const x = JSON.parse(fs.readFileSync(file, 'utf8'));
    const src = x.file || key;
    nDocs++;
    for (const e of x.errors || []) err(src, e.line, e.msg);
    const out = {};
    for (const [hash, m] of Object.entries(x.math || {})) {
      const h2 = crypto.createHash('md5').update((m.display ? 'D:' : 'I:') + m.tex).digest('hex');
      if (h2 !== hash) { err(src, m.line, 'internal: formula hash mismatch'); continue; }
      try {
        out[hash] = katex.renderToString(m.tex, { displayMode: !!m.display, throwOnError: true, macros: Object.assign({}, macros), strict: 'ignore', output: 'htmlAndMathml', trust: false });
        nMath++;
      } catch (e) {
        err(src, m.line, 'KaTeX: ' + String(e.message || e).replace(/^KaTeX parse error: /, '') + '  in  ' + (m.display ? '$$' : '$') + m.tex.slice(0, 160) + (m.display ? '$$' : '$'));
      }
    }
    const dest = path.join(ROOT, 'data/cache/katex', lang, key + '.json');
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const tmp = dest + '.tmp' + process.pid;
    fs.writeFileSync(tmp, JSON.stringify(out));
    fs.chmodSync(tmp, 0o666);
    fs.renameSync(tmp, dest);
    for (const w of x.widgets || []) { nWidgets++; validateWidget(src, w); }
    for (const c of x.checks || []) {
      nChecks++;
      try { const v = numVal(c.expr); if (!Number.isFinite(v)) throw new Error('not finite'); } catch (e) { err(src, c.line, `exercise check="${c.expr}": ${e.message}`); }
    }
  }
}

if (!quiet || errors.length) {
  for (const e of errors) console.log('ERROR ' + e);
  console.log(`build: ${nDocs} documents, ${nMath} formulas, ${nWidgets} figures, ${nChecks} answer checks, ${errors.length} errors`);
}
process.exit(errors.length ? 1 : 0);
