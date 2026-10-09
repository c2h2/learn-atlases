#!/usr/bin/env node
/* Screenshot an Earth & Climate Atlas page in headless Chromium and report JavaScript errors.
 *
 *   node tools/shot.js "lab.php?w=riemann" /path/out.png [--full] [--width=1280] [--height=900] [--wait=2500] [--dark] [--click=selector]
 *
 * The page is loaded from http://f.g77k.com/learn/earth/ (resolved to this machine). Prints any page errors,
 * console errors and failed requests, then the state of every interactive figure (ok / error message).
 * View the PNG with an image viewer (or the Read tool).
 */
'use strict';
const path = require('path');
const os = require('os');
// puppeteer-core lives outside the repository: npm install --prefix ~/.cache/maths-tools puppeteer-core (or set MATHS_TOOLS)
const puppeteer = require(path.join(process.env.MATHS_TOOLS || path.join(os.homedir(), '.cache/maths-tools'), 'node_modules/puppeteer-core'));
const fs = require('fs');

const args = process.argv.slice(2);
const pos = args.filter((a) => !a.startsWith('--'));
const opt = (k, d) => { const a = args.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
if (pos.length < 2) { console.error('usage: node tools/shot.js <page?query> <out.png> [--full] [--width=1280] [--height=900] [--wait=2500] [--dark] [--click=selector]'); process.exit(2); }
const BASE = process.env.MATHS_BASE || 'http://f.g77k.com/learn/earth/'; // f.g77k.com is mapped to 127.0.0.1
const url = pos[0].startsWith('http') ? pos[0] : BASE + pos[0].replace(/^\//, '');
const out = pos[1];

function chrome() {
  if (process.env.CHROME) return process.env.CHROME; // any Chromium build; default: Playwright's headless shell
  const base = path.join(os.homedir(), '.cache/ms-playwright');
  const dirs = fs.readdirSync(base).filter((d) => d.startsWith('chromium_headless_shell-')).sort();
  return path.join(base, dirs[dirs.length - 1], 'chrome-headless-shell-linux64/chrome-headless-shell');
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: chrome(), headless: 'shell',
    args: ['--no-sandbox', '--host-resolver-rules=MAP f.g77k.com 127.0.0.1', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage();
  await page.setViewport({ width: +opt('width', 1280), height: +opt('height', 900) });
  if (args.includes('--dark')) await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
  const problems = [];
  page.on('pageerror', (e) => problems.push('PAGE ERROR: ' + (e.stack || e.message).split('\n').slice(0, 3).join(' | ')));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') problems.push('console.' + m.type() + ': ' + m.text()); });
  page.on('requestfailed', (r) => problems.push('REQUEST FAILED: ' + r.url()));
  page.on('response', (r) => { if (r.status() >= 400) problems.push('HTTP ' + r.status() + ': ' + r.url()); });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  // start every figure (they normally start when scrolled into view)
  await page.evaluate(() => { document.querySelectorAll('figure.widget').forEach((f) => window.MA && MA.startWidget && MA.startWidget(f)); });
  const click = opt('click', '');
  if (click) { try { await page.click(click); } catch (e) { problems.push('click failed: ' + click); } }
  await new Promise((r) => setTimeout(r, +opt('wait', 2500)));
  const figs = await page.evaluate(() => Array.from(document.querySelectorAll('figure.widget')).map((f) => {
    // text inputs carry an empty .w-err slot: only a message with text is an error
    const err = Array.from(f.querySelectorAll('.w-err, .widget-msg')).map((e) => e.textContent.trim()).find(Boolean);
    return { id: f.id, type: f.dataset.widget, state: err ? err.slice(0, 200) : 'ok' };
  }));
  await page.screenshot({ path: out, fullPage: args.includes('--full') });
  await browser.close();
  problems.forEach((p) => console.log(p));
  figs.forEach((f) => console.log('figure ' + f.type + ' #' + f.id + ': ' + f.state));
  console.log('saved ' + out + (problems.length ? ' — ' + problems.length + ' problem(s)' : ' — no errors'));
})().catch((e) => { console.error(e); process.exit(1); });
