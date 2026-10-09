#!/usr/bin/env node
/* Load the Lab page of every figure type (or of the given types) and report its state.
 *
 *   node tools/labcheck.js [type ...] [--dark] [--lessons] [--zh]
 *
 * --lessons instead loads every written lesson and reports every figure on it; --zh loads the Chinese pages
 * (with --lessons: every lesson that has a Chinese translation).
 * Exit code 1 if any figure fails or any page has a JavaScript error.
 */
'use strict';
const path = require('path');
const os = require('os');
const fs = require('fs');
// puppeteer-core lives outside the repository: npm install --prefix ~/.cache/maths-tools puppeteer-core (or set MATHS_TOOLS)
const puppeteer = require(path.join(process.env.MATHS_TOOLS || path.join(os.homedir(), '.cache/maths-tools'), 'node_modules/puppeteer-core'));

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const only = args.filter((a) => !a.startsWith('--'));
const dark = args.includes('--dark');
const lessons = args.includes('--lessons');
const zh = args.includes('--zh');
const LANG = zh ? '&lang=zh' : '';
const BASE = process.env.MATHS_BASE || 'http://f.g77k.com/learn/economics/'; // f.g77k.com is mapped to 127.0.0.1

function chrome() {
  if (process.env.CHROME) return process.env.CHROME; // any Chromium build; default: Playwright's headless shell
  const base = path.join(os.homedir(), '.cache/ms-playwright');
  const dirs = fs.readdirSync(base).filter((d) => d.startsWith('chromium_headless_shell-')).sort();
  return path.join(base, dirs[dirs.length - 1], 'chrome-headless-shell-linux64/chrome-headless-shell');
}

(async () => {
  let pages;
  if (lessons) {
    pages = [];
    const lang = zh ? 'zh' : 'en';
    for (const c of fs.readdirSync(path.join(ROOT, 'content', lang))) {
      const dir = path.join(ROOT, 'content', lang, c);
      if (c.startsWith('_') || !fs.statSync(dir).isDirectory()) continue;
      for (const f of fs.readdirSync(dir)) if (f.endsWith('.md') && (!only.length || only.includes(c))) pages.push({ name: c + '/' + f.slice(0, -3), url: BASE + 'lesson.php?c=' + c + '&l=' + f.slice(0, -3) + LANG });
    }
  } else {
    const cat = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/widgets.json'), 'utf8')).types;
    pages = Object.keys(cat).filter((t) => !only.length || only.includes(t)).map((t) => ({ name: t, url: BASE + 'lab.php?w=' + t + LANG }));
  }
  const browser = await puppeteer.launch({ executablePath: chrome(), headless: 'shell',
    args: ['--no-sandbox', '--host-resolver-rules=MAP f.g77k.com 127.0.0.1', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  let bad = 0;
  for (const p of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 900 });
    if (dark) await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    const errors = [];
    page.on('pageerror', (e) => errors.push((e.message || String(e)).split('\n')[0]));
    try {
      await page.goto(p.url, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.evaluate(() => document.querySelectorAll('figure.widget').forEach((f) => window.MA && MA.startWidget && MA.startWidget(f)));
      await new Promise((r) => setTimeout(r, 1200));
      const figs = await page.evaluate(() => Array.from(document.querySelectorAll('figure.widget')).map((f) => {
        const msg = f.querySelector('.widget-stage > .widget-msg, .widget-stage > .w-err');
        const stage = f.querySelector('.widget-stage');
        return { type: f.dataset.widget, id: f.id, msg: msg ? msg.textContent.trim().slice(0, 140) : '', empty: !stage || stage.children.length === 0 };
      }));
      const failed = figs.filter((f) => f.msg || f.empty);
      if (failed.length || errors.length) bad++;
      const status = errors.length ? 'JS ERROR' : failed.length ? 'FAIL' : 'ok';
      console.log(status.padEnd(9) + p.name + (figs.length > 1 ? '  (' + figs.length + ' figures)' : ''));
      failed.forEach((f) => console.log('           ' + f.type + ' #' + f.id + ': ' + (f.msg || 'empty stage')));
      errors.slice(0, 3).forEach((e) => console.log('           ' + e));
    } catch (e) {
      bad++;
      console.log('LOAD FAIL ' + p.name + ': ' + e.message.split('\n')[0]);
    }
    await page.close();
  }
  await browser.close();
  console.log(`labcheck: ${pages.length - bad}/${pages.length} ok`);
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
