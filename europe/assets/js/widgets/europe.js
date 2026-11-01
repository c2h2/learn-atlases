/* European History Atlas — timelines and dated series.
   Keys and defaults: data/widgets.json (merged from data/widgets-local.json).
   A figure plots only the years and values the lesson lists. */
(function () {
  'use strict';
  const MA = window.MA;
  const C = MA.cfg;

  function yearNum(s) {
    const n = parseInt(String(s).trim(), 10);
    if (!Number.isFinite(n)) throw new Error('A year must be an integer.');
    return n;
  }

  /** Historical label. There is no year 0: 1 BCE is followed by 1 CE. */
  function era(y) {
    const n = Math.round(y);
    if (n < 0) return MA.t('%s BCE', Math.abs(n));
    if (n === 0) return MA.t('no year 0');
    return MA.t('%s CE', n);
  }

  /** Elapsed years in the historical count, which skips from 1 BCE to 1 CE. */
  function span(a, b) {
    a = Math.round(a);
    b = Math.round(b);
    if (a === 0 || b === 0) return NaN;
    if ((a < 0 && b > 0) || (a > 0 && b < 0)) return Math.abs(a) + Math.abs(b) - 1;
    return Math.abs(b - a);
  }

  function parseEvents(list) {
    return list.map((item) => {
      const i = item.indexOf(',');
      if (i < 1) throw new Error('An event must look like year,label.');
      const year = yearNum(item.slice(0, i));
      const label = item.slice(i + 1).trim();
      if (!label) throw new Error('An event needs a label.');
      return { year, label };
    }).sort((a, b) => a.year - b.year || a.label.localeCompare(b.label));
  }

  MA.widget('timeline', (stage, cfg) => {
    const start = C.int(cfg.start);
    const end = C.int(cfg.end);
    if (!(end > start)) throw new Error('The end year must be after the start year.');
    const events = parseEvents(C.list(cfg.events));
    if (!events.length) throw new Error('The timeline needs at least one event.');
    let half = Math.max(0, C.int(cfg.window, 10));
    let year = Math.round((start + end) / 2);
    if (year === 0) year = 1;
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    const maxHalf = Math.max(1, Math.round((end - start) / 2));
    half = Math.min(half, maxHalf);
    const P = new MA.Plot(stage, {
      x: [start, end], y: [0, 1], height: 240, width: 640,
      grid: false, axes: false, ticks: false, pad: [36, 20, 32, 20],
      label: MA.t('Timeline'),
    });
    const info = MA.ui.info(stage);

    function draw() {
      P.clear('fill', 'marks', 'labels', 'curves');
      const yLine = 0.42;
      P.line(start, yLine, end, yLine, { color: 'var(--ink)', width: 1.6, layer: 'curves' });
      const lo = year - half;
      const hi = year + half;
      P.rect(lo, 0.22, Math.max(hi - lo, 0.01), 0.4, {
        fill: 'var(--accent)', fillOpacity: 0.16, stroke: 'var(--accent)', width: 1, layer: 'fill',
      });
      P.line(year, 0.08, year, 0.78, { color: 'var(--series-1)', width: 1.5, layer: 'marks' });
      events.forEach((e) => {
        const on = e.year !== 0 && e.year >= lo && e.year <= hi;
        P.dot(e.year, yLine, { r: on ? 6 : 3.6, color: on ? 'var(--series-1)' : 'var(--series-2)' });
      });
      const ticks = [start, end];
      if (year !== 0 && year !== start && year !== end) ticks.push(year);
      ticks.forEach((x) => {
        const anchor = x === start ? 'start' : x === end ? 'end' : 'middle';
        P.text(x, 0.02, era(x), { anchor, dy: 14, size: 12, color: 'var(--ink-2)' });
      });
      const inside = events.filter((e) => e.year !== 0 && e.year >= lo && e.year <= hi);
      let nearest = null;
      let best = Infinity;
      events.forEach((e) => {
        if (e.year === 0) return;
        const d = span(year, e.year);
        if (d < best) { best = d; nearest = e; }
      });
      const parts = [MA.ui.kv(MA.t('Year'), year === 0 ? MA.t('no year 0') : era(year))];
      if (year === 0) parts.push(MA.t('There is no year 0. The year after 1 BCE is 1 CE.'));
      parts.push(MA.ui.kv(MA.t('In the window'), String(inside.length)));
      if (inside.length) parts.push(inside.map((e) => e.label).join(', '));
      else parts.push(MA.t('No listed event in this window.'));
      if (nearest) {
        parts.push(MA.ui.kv(MA.t('Nearest'), nearest.label));
        parts.push(MA.ui.kv(MA.t('Distance'), MA.t('%s years', best)));
      }
      info.set(...parts);
    }

    MA.ui.slider(bar, {
      label: MA.t('Year'), min: start, max: end, step: 1, value: year,
      fmt: (v) => era(v),
      onInput: (v) => { year = Math.round(v); draw(); },
    });
    MA.ui.slider(bar, {
      label: MA.t('Window'), min: 0, max: maxHalf, step: 1, value: half,
      fmt: (v) => MA.t('±%s', Math.round(v)),
      onInput: (v) => { half = Math.round(v); draw(); },
    });
    draw();
  });

  MA.widget('series', (stage, cfg) => {
    const pts = C.list(cfg.points).map((item) => {
      const i = item.indexOf(',');
      if (i < 1) throw new Error('A point must look like year,value.');
      return { year: yearNum(item.slice(0, i)), value: C.num(item.slice(i + 1)) };
    }).filter((p) => p.year !== 0).sort((a, b) => a.year - b.year || a.value - b.value);
    if (!pts.length) throw new Error('The series needs at least one point.');
    const ylab = C.str(cfg.ylabel, '');
    let year = pts[Math.floor((pts.length - 1) / 2)].year;
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    const xs = pts.map((p) => p.year);
    const ys = pts.map((p) => p.value);
    const xmin = Math.min.apply(null, xs);
    const xmax = Math.max.apply(null, xs);
    const ymin = Math.min.apply(null, ys);
    const ymax = Math.max.apply(null, ys);
    const xpad = xmin === xmax ? 1 : (xmax - xmin) * 0.06;
    const yspan = ymax - ymin;
    const ypad = yspan === 0 ? (Math.abs(ymin) * 0.08 || 1) : yspan * 0.14;
    const P = new MA.Plot(stage, {
      x: [xmin - xpad, xmax + xpad],
      y: [ymin - ypad, ymax + ypad],
      height: 320, width: 640,
      grid: true, axes: true, ticks: true,
      yLabel: ylab,
      label: MA.t('Dated series'),
    });
    const info = MA.ui.info(stage);

    function shown(v) {
      if (Number.isInteger(v)) return String(v);
      return String(Math.round(v * 1000) / 1000).replace(/^-/, '−');
    }

    function draw() {
      P.clear('marks', 'labels', 'curves');
      if (pts.length >= 2) P.path(pts.map((p) => [p.year, p.value]), { color: 'var(--series-1)', width: 2.2 });
      pts.forEach((p) => P.dot(p.year, p.value, { r: 4.5, color: 'var(--series-1)' }));
      let nearest = pts[0];
      let best = Infinity;
      pts.forEach((p) => {
        const d = Math.abs(p.year - year);
        if (d < best) { best = d; nearest = p; }
      });
      P.line(year, P.y0, year, P.y1, { color: 'var(--series-2)', width: 1.4, layer: 'marks' });
      P.dot(nearest.year, nearest.value, { r: 6.5, color: 'var(--series-2)' });
      info.set(
        MA.ui.kv(MA.t('Year'), era(year)),
        MA.ui.kv(MA.t('Nearest recorded year'), era(nearest.year)),
        MA.ui.kv(MA.t('Value'), shown(nearest.value)),
        best === 0 ? MA.t('This year is one of the recorded points.') : MA.t('No value is invented between recorded years.')
      );
    }

    const smax = xmax === xmin ? xmin + 1 : xmax;
    year = Math.min(smax, Math.max(xmin, year));
    MA.ui.slider(bar, {
      label: MA.t('Year'), min: xmin, max: smax, step: 1, value: year,
      fmt: (v) => era(v),
      onInput: (v) => { year = Math.round(v); draw(); },
    });
    draw();
  });
})();
