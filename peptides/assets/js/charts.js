/* Peptide Atlas — chart kit (D3). Thin marks, hairline grid, crosshair tooltips, a table twin for every chart. */
(function () {
  'use strict';
  const A = window.Atlas;
  const d3 = window.d3;

  // ---------- helpers ----------
  function responsive(el, draw) {
    let w = 0;
    const run = () => {
      const nw = Math.round(el.clientWidth);
      if (nw && nw !== w) { w = nw; draw(nw); }
    };
    if ('ResizeObserver' in window) {
      let t = null;
      new ResizeObserver(() => { clearTimeout(t); t = setTimeout(run, 80); }).observe(el);
    } else {
      window.addEventListener('resize', run);
    }
    window.addEventListener('atlas:theme', () => { w = 0; run(); });
    run();
  }

  /** <details> table view: the accessible twin of a chart. */
  function tableView(host, head, rows, label) {
    const old = host.querySelector(':scope > details.table-view');
    if (old) old.remove();
    const det = A.el('details', { class: 'table-view' }, A.el('summary', { text: label || A.t('Show data table') }));
    const wrap = A.el('div', { class: 'table-scroll' });
    const t = A.el('table', { class: 'data-table' });
    const trh = A.el('tr');
    head.forEach((h, i) => trh.append(A.el('th', { class: i ? 'n' : null, text: h })));
    t.append(A.el('thead', null, trh));
    const tb = A.el('tbody');
    rows.forEach((r) => {
      const tr = A.el('tr');
      r.forEach((c, i) => tr.append(A.el('td', { class: i ? 'n' : null, text: c })));
      tb.append(tr);
    });
    t.append(tb);
    wrap.append(t);
    det.append(wrap);
    host.append(det);
  }

  function legend(host, items, kind) {
    const old = host.querySelector(':scope > .chart-legend');
    if (old) old.remove();
    if (items.length < 2) return;
    const box = A.el('div', { class: 'chart-legend' });
    items.forEach((it) => box.append(A.el('span', { class: 'k' }, A.el('span', { class: kind === 'rect' ? 'rc' : 'ln', style: 'background:' + it.color }), it.name)));
    host.append(box);
  }

  /** Vertical bar path with a rounded data end (top) and a square baseline. */
  function colPath(x, y, w, h, r) {
    r = Math.min(r, w / 2, h);
    if (h <= 0) return '';
    return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
  }
  /** Horizontal bar path with a rounded data end (right). */
  function barPath(x, y, w, h, r) {
    r = Math.min(r, h / 2, w);
    if (w <= 0) return '';
    return `M${x},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x}Z`;
  }

  // ---------- line chart (monthly time series) ----------
  /**
   * opts.series: [{name, color, values: [[ 'YYYY-MM' | Date | number, value ], ...]}]
   * opts.height, opts.area (single series), opts.yFormat, opts.xKind ('month' | 'year' | 'index'), opts.xLabel
   */
  A.lineChart = function (el, opts) {
    const host = el.closest('figure') || el;
    const series = opts.series.filter((s) => s.values && s.values.length);
    if (!series.length) { el.textContent = opts.empty || A.t('No data yet.'); return; }
    const kind = opts.xKind || 'month';
    const parse = kind === 'month' ? (k) => new Date(Date.UTC(+k.slice(0, 4), +k.slice(5, 7) - 1, 1)) : (k) => +k;
    series.forEach((s) => (s.pts = s.values.map(([k, v]) => ({ k, x: parse(k), y: v }))));
    const xs = Array.from(new Set(series.flatMap((s) => s.pts.map((p) => +p.x)))).sort((a, b) => a - b);
    const fmtY = opts.yFormat || A.fmt;
    const fmtX = kind === 'month' ? (x) => A.monthLabel(new Date(x).toISOString().slice(0, 7)) : (x) => String(x);

    responsive(el, (W) => {
      const endLabels = series.length > 1 && series.length <= 4 && W > 520;
      const m = { t: 14, r: endLabels ? 104 : 18, b: 28, l: 48 };
      const H = opts.height || 260;
      const iw = W - m.l - m.r, ih = H - m.t - m.b;
      const x = (kind === 'month' ? d3.scaleUtc() : d3.scaleLinear()).domain(d3.extent(xs)).range([0, iw]);
      const ymax = d3.max(series, (s) => d3.max(s.pts, (p) => p.y)) || 1;
      const y = d3.scaleLinear().domain([opts.yMin ?? 0, ymax * 1.06]).nice(5).range([ih, 0]);
      d3.select(el).selectAll('svg').remove();
      const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H)
        .attr('role', 'img').attr('aria-label', opts.label || A.t('Line chart'));
      const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
      g.append('g').attr('class', 'grid').selectAll('line').data(y.ticks(5)).join('line')
        .attr('x1', 0).attr('x2', iw).attr('y1', (d) => y(d)).attr('y2', (d) => y(d));
      const yAxis = g.append('g').attr('class', 'axis');
      yAxis.selectAll('text').data(y.ticks(5)).join('text').attr('x', -8).attr('y', (d) => y(d)).attr('dy', '0.32em')
        .attr('text-anchor', 'end').text((d) => fmtY(d));
      const xt = kind === 'month' ? x.ticks(Math.max(2, Math.min(10, Math.floor(iw / 70)))) : x.ticks(Math.max(2, Math.min(10, Math.floor(iw / 60))));
      const xAxis = g.append('g').attr('class', 'axis').attr('transform', `translate(0,${ih})`);
      xAxis.append('line').attr('class', 'baseline').attr('x1', 0).attr('x2', iw);
      xAxis.selectAll('text').data(xt).join('text').attr('x', (d) => x(d)).attr('y', 18).attr('text-anchor', 'middle')
        .text((d) => (kind === 'month' ? d3.utcFormat('%Y')(d) : d3.format('d')(d)));

      const line = d3.line().defined((p) => p.y !== null).x((p) => x(p.x)).y((p) => y(p.y)).curve(d3.curveMonotoneX);
      if (opts.area && series.length === 1) {
        const area = d3.area().defined((p) => p.y !== null).x((p) => x(p.x)).y0(ih).y1((p) => y(p.y)).curve(d3.curveMonotoneX);
        g.append('path').attr('class', 'area').style('fill', series[0].color).attr('d', area(series[0].pts));
      }
      series.forEach((s) => g.append('path').attr('class', 'line').style('stroke', s.color).attr('d', line(s.pts)));

      // selective direct labels: series ends when they don't collide
      if (endLabels) {
        const ends = series.map((s) => { const p = s.pts[s.pts.length - 1]; return { s, x: x(p.x), y: y(p.y), v: p.y }; }).sort((a, b) => a.y - b.y);
        const clash = ends.some((e, i) => i && e.y - ends[i - 1].y < 14);
        if (!clash) ends.forEach((e) => {
          g.append('circle').attr('cx', e.x).attr('cy', e.y).attr('r', 4).attr('class', 'hover-dot').style('fill', e.s.color);
          g.append('text').attr('class', 'dlabel').attr('x', e.x + 8).attr('y', e.y).attr('dy', '0.32em').text(e.s.name);
        });
      } else if (series.length === 1 && opts.labelPeak !== false) {
        const s = series[0];
        const peak = s.pts.reduce((a, b) => (b.y > a.y ? b : a), s.pts[0]);
        const tx = x(peak.x), ty = y(peak.y);
        g.append('circle').attr('cx', tx).attr('cy', ty).attr('r', 4).attr('class', 'hover-dot').style('fill', s.color);
        g.append('text').attr('class', 'dlabel').attr('x', tx + (tx > iw - 120 ? -8 : 8)).attr('y', ty - 2)
          .attr('text-anchor', tx > iw - 120 ? 'end' : 'start').attr('dy', '-0.2em').text(A.t('Peak %s, %s', fmtY(peak.y), fmtX(peak.x)));
      }

      // crosshair + tooltip listing every series at that x
      const cross = g.append('line').attr('class', 'crosshair').attr('y1', 0).attr('y2', ih).style('opacity', 0);
      const dots = series.map((s) => g.append('circle').attr('r', 4).attr('class', 'hover-dot').style('fill', s.color).style('opacity', 0));
      const overlay = g.append('rect').attr('class', 'hit').attr('width', iw).attr('height', ih).attr('tabindex', 0)
        .attr('aria-label', A.t('Chart data: use left and right arrow keys'));
      let idx = xs.length - 1;
      const showAt = (i, cx, cy) => {
        idx = Math.max(0, Math.min(xs.length - 1, i));
        const xv = xs[idx];
        const px = x(xv);
        cross.attr('x1', px).attr('x2', px).style('opacity', 1);
        const rows = [];
        series.forEach((s, j) => {
          const p = s.pts.find((q) => +q.x === xv);
          if (p && p.y !== null) {
            dots[j].attr('cx', px).attr('cy', y(p.y)).style('opacity', 1);
            rows.push({ value: (opts.tipFormat || A.full)(p.y), name: series.length > 1 ? s.name : opts.unit || '', color: s.color, v: p.y });
          } else dots[j].style('opacity', 0);
        });
        rows.sort((a, b) => b.v - a.v);
        const r = el.getBoundingClientRect();
        A.tip.show(A.tipBody(fmtX(xv), rows), cx ?? r.left + m.l + px, cy ?? r.top + m.t + 10);
      };
      overlay.on('pointermove', (ev) => {
        const [px] = d3.pointer(ev);
        const xv = +x.invert(px);
        const i = d3.bisector((d) => d).center(xs, xv);
        showAt(i, ev.clientX, ev.clientY);
      }).on('pointerleave blur', () => { cross.style('opacity', 0); dots.forEach((d) => d.style('opacity', 0)); A.tip.hide(); })
        .on('focus', () => showAt(idx))
        .on('keydown', (ev) => {
          if (ev.key === 'ArrowLeft') { showAt(idx - 1); ev.preventDefault(); }
          if (ev.key === 'ArrowRight') { showAt(idx + 1); ev.preventDefault(); }
        });
    });
    legend(host, series.map((s) => ({ name: s.name, color: s.color })), 'line');
    if (opts.table !== false) {
      const head = [kind === 'month' ? A.t('Month') : opts.xLabel || 'x', ...series.map((s) => s.name)];
      const rows = xs.slice().reverse().map((xv) => [fmtX(xv), ...series.map((s) => { const p = s.pts.find((q) => +q.x === xv); return p ? A.full(p.y) : '–'; })]);
      tableView(host, head, rows);
    }
  };

  // ---------- column chart (counts per year) ----------
  A.columnChart = function (el, opts) {
    const host = el.closest('figure') || el;
    const data = opts.data || [];
    if (!data.length || !data.some((d) => d.y)) { el.textContent = opts.empty || A.t('No records.'); return; }
    responsive(el, (W) => {
      const m = { t: 18, r: 12, b: 28, l: 44 };
      const H = opts.height || 220;
      const iw = W - m.l - m.r, ih = H - m.t - m.b;
      const x = d3.scaleBand().domain(data.map((d) => d.x)).range([0, iw]).paddingInner(0.18).paddingOuter(0.05);
      const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.y) * 1.08 || 1]).nice(4).range([ih, 0]);
      d3.select(el).selectAll('svg').remove();
      const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H).attr('role', 'img').attr('aria-label', opts.label || A.t('Column chart'));
      const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
      g.append('g').attr('class', 'grid').selectAll('line').data(y.ticks(4)).join('line').attr('x1', 0).attr('x2', iw).attr('y1', (d) => y(d)).attr('y2', (d) => y(d));
      g.append('g').attr('class', 'axis').selectAll('text').data(y.ticks(4)).join('text').attr('x', -8).attr('y', (d) => y(d)).attr('dy', '0.32em').attr('text-anchor', 'end').text((d) => A.fmt(d));
      const bw = Math.min(24, x.bandwidth());
      const off = (x.bandwidth() - bw) / 2;
      const color = opts.color || 'var(--series-1)';
      g.selectAll('path.bar').data(data).join('path').attr('class', 'bar').style('fill', (d) => (d.partial ? 'var(--deemph)' : color))
        .attr('d', (d) => colPath(x(d.x) + off, y(d.y), bw, ih - y(d.y), 4));
      const xa = g.append('g').attr('class', 'axis').attr('transform', `translate(0,${ih})`);
      xa.append('line').attr('class', 'baseline').attr('x1', 0).attr('x2', iw);
      const every = Math.ceil(data.length / Math.max(2, Math.floor(iw / 44)));
      xa.selectAll('text').data(data.filter((d, i) => i % every === 0)).join('text')
        .attr('x', (d) => x(d.x) + x.bandwidth() / 2).attr('y', 18).attr('text-anchor', 'middle').text((d) => d.x);
      // label the peak only
      const peak = data.reduce((a, b) => (b.y > a.y ? b : a), data[0]);
      g.append('text').attr('class', 'dlabel').attr('x', x(peak.x) + x.bandwidth() / 2).attr('y', y(peak.y) - 6).attr('text-anchor', 'middle').text(A.fmt(peak.y));
      g.selectAll('rect.hit').data(data).join('rect').attr('class', 'hit').attr('x', (d) => x(d.x)).attr('y', 0).attr('width', x.bandwidth()).attr('height', ih)
        .on('pointerenter pointermove', (ev, d) => {
          g.selectAll('path.bar').classed('is-hot', (b) => b === d);
          A.tip.show(A.tipBody(String(d.x) + (d.future ? A.t(' (planned)') : d.partial ? A.t(' (year to date)') : ''), [{ value: A.full(d.y), name: opts.unit || '' }]), ev.clientX, ev.clientY);
        })
        .on('pointerleave', () => { g.selectAll('path.bar').classed('is-hot', false); A.tip.hide(); });
    });
    if (opts.table !== false) tableView(host, [opts.xLabel || A.t('Year'), opts.unit || A.t('Value')], data.slice().reverse().map((d) => [String(d.x), A.full(d.y)]));
  };

  // ---------- horizontal bars (ranking) ----------
  /** opts.data: [{label, value, href, note}], opts.highlight: label to emphasise */
  A.barList = function (el, opts) {
    const host = el.closest('figure') || el;
    const data = (opts.data || []).filter((d) => d.value !== null && d.value !== undefined);
    if (!data.length) { el.textContent = opts.empty || A.t('No data yet.'); return; }
    responsive(el, (W) => {
      const labelW = Math.min(170, Math.max(110, W * 0.3));
      const rowH = 24;
      const m = { t: 4, r: 64, b: 4, l: labelW };
      const H = m.t + m.b + data.length * rowH;
      const iw = W - m.l - m.r;
      const x = (opts.log ? d3.scaleLog().domain([1, d3.max(data, (d) => d.value) || 10]) : d3.scaleLinear().domain([0, d3.max(data, (d) => d.value) || 1])).range([0, iw]);
      d3.select(el).selectAll('svg').remove();
      const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H).attr('role', 'img').attr('aria-label', opts.label || A.t('Bar chart'));
      const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
      const row = g.selectAll('g.r').data(data).join('g').attr('class', 'r').attr('transform', (d, i) => `translate(0,${i * rowH})`);
      const lab = row.append('a').attr('href', (d) => d.href || null);
      lab.append('text').attr('x', -10).attr('y', rowH / 2).attr('dy', '0.32em').attr('text-anchor', 'end')
        .style('fill', 'var(--ink)').style('font-size', '12.5px').style('font-weight', (d) => (d.label === opts.highlight ? 700 : 500)).text((d) => d.label);
      row.append('path').attr('class', 'bar')
        .style('fill', (d) => (opts.highlight && d.label !== opts.highlight ? 'var(--deemph)' : opts.color || 'var(--series-1)'))
        .attr('d', (d) => barPath(0, (rowH - 12) / 2, Math.max(2, opts.log ? x(Math.max(1, d.value)) : x(d.value)), 12, 4));
      row.append('text').attr('class', 'dlabel').attr('x', (d) => Math.max(2, opts.log ? x(Math.max(1, d.value)) : x(d.value)) + 6).attr('y', rowH / 2).attr('dy', '0.32em')
        .text((d) => (opts.format || A.fmt)(d.value));
      row.append('rect').attr('class', 'hit').attr('x', -labelW).attr('width', W).attr('height', rowH)
        .on('pointerenter pointermove', (ev, d) => A.tip.show(A.tipBody(d.label, [{ value: A.full(d.value), name: opts.unit || '' }].concat(d.note ? [{ value: '', name: d.note }] : [])), ev.clientX, ev.clientY))
        .on('pointerleave', () => A.tip.hide())
        .on('click', (ev, d) => { if (d.href) location.href = d.href; })
        .style('cursor', (d) => (d.href ? 'pointer' : null));
    });
    if (opts.table !== false) tableView(host, [opts.labelHead || A.t('Peptide'), opts.unit || A.t('Value')], data.map((d) => [d.label, A.full(d.value)]));
  };

  // ---------- dot strip: ordinal x bands, log y (e.g. attention vs evidence) ----------
  /** opts.data: [{label, x (band key), y, href, emph}], opts.bands: [{key, label}], opts.emphLabel, opts.baseLabel */
  A.dotStrip = function (el, opts) {
    const host = el.closest('figure') || el;
    const data = (opts.data || []).filter((d) => d.y > 0);
    if (!data.length) { el.textContent = 'No data yet.'; return; }
    responsive(el, (W) => {
      const m = { t: 14, r: 16, b: 44, l: 52 };
      const H = opts.height || 340;
      const iw = W - m.l - m.r, ih = H - m.t - m.b;
      const x = d3.scaleBand().domain(opts.bands.map((b) => b.key)).range([0, iw]).padding(0.08);
      const y = d3.scaleLog().domain([Math.max(1, d3.min(data, (d) => d.y) / 1.6), d3.max(data, (d) => d.y) * 1.6]).range([ih, 0]);
      d3.select(el).selectAll('svg').remove();
      const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H).attr('role', 'img').attr('aria-label', opts.label || A.t('Dot chart'));
      const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
      // log axis: label 1, 3, 10, 30, 100 ... only
      const nice = (t) => { const e = Math.floor(Math.log10(t) + 1e-9); const mant = t / Math.pow(10, e); return Math.abs(mant - 1) < 1e-6 || Math.abs(mant - 3) < 1e-6; };
      const ticks = y.ticks(5).filter(nice);
      g.append('g').attr('class', 'grid').selectAll('line').data(ticks).join('line').attr('x1', 0).attr('x2', iw).attr('y1', (t) => y(t)).attr('y2', (t) => y(t));
      g.append('g').attr('class', 'axis').selectAll('text').data(ticks).join('text').attr('x', -8).attr('y', (t) => y(t)).attr('dy', '0.32em').attr('text-anchor', 'end').text((t) => A.fmt(t));
      const xa = g.append('g').attr('class', 'axis').attr('transform', `translate(0,${ih})`);
      xa.append('line').attr('class', 'baseline').attr('x1', 0).attr('x2', iw);
      opts.bands.forEach((b) => {
        xa.append('text').attr('x', x(b.key) + x.bandwidth() / 2).attr('y', 18).attr('text-anchor', 'middle').style('font-weight', 600).style('fill', 'var(--ink-2)').text(b.label);
        if (b.sub) xa.append('text').attr('x', x(b.key) + x.bandwidth() / 2).attr('y', 32).attr('text-anchor', 'middle').text(b.sub);
      });
      // deterministic horizontal spread inside each band to avoid overlaps
      const byBand = d3.group(data, (d) => d.x);
      const placed = [];
      byBand.forEach((list, key) => {
        list.sort((a, b) => b.y - a.y);
        const cx = x(key) + x.bandwidth() / 2, half = x.bandwidth() / 2 - 10;
        const taken = [];
        list.forEach((d) => {
          const py = y(d.y);
          let px = cx;
          for (let k = 0; k < 40; k++) {
            const off = (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 11;
            const cand = cx + Math.max(-half, Math.min(half, off));
            if (!taken.some((t) => Math.hypot(t[0] - cand, t[1] - py) < 11)) { px = cand; break; }
          }
          taken.push([px, py]);
          placed.push({ d, px, py });
        });
        // label the two most-read in each band
        list.slice(0, 2).forEach((d) => { const p = placed.find((q) => q.d === d); if (p) p.label = true; });
      });
      // a label goes right of its dot, else left, else nowhere (tooltip and table still carry it)
      const clear = (x0, x1, y) => !placed.some((q) => q.py > y - 9 && q.py < y + 9 && q.px + 5 > x0 && q.px - 5 < x1);
      placed.forEach(({ d, px, py, label }) => {
        const a = g.append('a').attr('href', d.href || null);
        a.append('circle').attr('cx', px).attr('cy', py).attr('r', 5).attr('class', 'hover-dot').style('fill', d.emph ? 'var(--series-2)' : 'var(--series-1)');
        if (label) {
          const w = d.label.length * 6.4;
          const side = clear(px + 7, px + 9 + w, py) ? 1 : clear(px - 9 - w, px - 7, py) ? -1 : 0;
          if (side) a.append('text').attr('class', 'dlabel').attr('x', px + side * 8).attr('y', py).attr('dy', '0.32em')
            .attr('text-anchor', side > 0 ? 'start' : 'end').style('paint-order', 'stroke').style('stroke', 'var(--paper)').style('stroke-width', 3).text(d.label);
        }
        a.append('circle').attr('cx', px).attr('cy', py).attr('r', 12).attr('class', 'hit')
          .on('pointerenter pointermove', (ev) => A.tip.show(A.tipBody(d.label, [{ value: A.full(d.y), name: opts.unit || '' }, { value: '', name: d.note || '' }]), ev.clientX, ev.clientY))
          .on('pointerleave', () => A.tip.hide());
      });
    });
    const lg = host.querySelector(':scope > .chart-legend');
    if (lg) lg.remove();
    const box = A.el('div', { class: 'chart-legend' },
      A.el('span', { class: 'k' }, A.el('span', { class: 'rc', style: 'background:var(--series-2);border-radius:50%' }), opts.emphLabel || A.t('Highlighted')),
      A.el('span', { class: 'k' }, A.el('span', { class: 'rc', style: 'background:var(--series-1);border-radius:50%' }), opts.baseLabel || A.t('Other')));
    el.after(box);
    if (opts.table !== false) tableView(host, [A.t('Peptide'), A.t('Evidence'), opts.unit || A.t('Value')], data.slice().sort((a, b) => b.y - a.y).map((d) => [d.label, String(d.x), A.full(d.y)]));
  };

  // ---------- diverging bars (change around zero) ----------
  /** opts.data: [{label, value, href}] with signed values; blue grows right, red shrinks left. */
  A.divergingBars = function (el, opts) {
    const host = el.closest('figure') || el;
    const data = opts.data || [];
    if (!data.length) { el.textContent = A.t('No data yet.'); return; }
    const fmt = opts.format || ((v) => (v > 0 ? '+' : '') + v);
    responsive(el, (W) => {
      const labelW = Math.min(150, Math.max(96, W * 0.28));
      const rowH = 22;
      const m = { t: opts.ref ? 22 : 4, r: 52, b: 22, l: labelW };
      const H = m.t + m.b + data.length * rowH;
      const iw = W - m.l - m.r;
      const ext = d3.max(data, (d) => Math.abs(d.value)) || 1;
      const lo = Math.min(0, d3.min(data, (d) => d.value));
      const x = d3.scaleLinear().domain([lo < 0 ? -ext : 0, ext]).range([0, iw]).nice();
      d3.select(el).selectAll('svg').remove();
      const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H).attr('role', 'img').attr('aria-label', opts.label || A.t('Diverging bar chart'));
      const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
      g.append('g').attr('class', 'grid').selectAll('line').data(x.ticks(4)).join('line').attr('x1', (t) => x(t)).attr('x2', (t) => x(t)).attr('y1', 0).attr('y2', data.length * rowH);
      g.append('line').attr('class', 'baseline').attr('x1', x(0)).attr('x2', x(0)).attr('y1', 0).attr('y2', data.length * rowH).style('stroke', 'var(--ink-3)');
      if (opts.ref) {
        // context line, e.g. how all of Wikipedia moved over the same period
        const rx = x(opts.ref.value);
        g.append('line').attr('x1', rx).attr('x2', rx).attr('y1', -8).attr('y2', data.length * rowH).style('stroke', 'var(--ink)').style('stroke-width', 1.5).style('opacity', 0.55);
        g.append('text').attr('class', 'dlabel').attr('x', rx - 5).attr('y', -9).attr('text-anchor', 'end').text(opts.ref.label);
      }
      g.append('g').attr('class', 'axis').selectAll('text').data(x.ticks(4)).join('text').attr('x', (t) => x(t)).attr('y', data.length * rowH + 15).attr('text-anchor', 'middle').text((t) => fmt(t));
      data.forEach((d, i) => {
        const y = i * rowH + (rowH - 11) / 2;
        const x0 = x(0), x1 = x(d.value);
        const w = Math.max(2, Math.abs(x1 - x0));
        const pos = d.value >= 0;
        const r = Math.min(4, w);
        const path = pos
          ? `M${x0},${y}H${x0 + w - r}Q${x0 + w},${y} ${x0 + w},${y + r}V${y + 11 - r}Q${x0 + w},${y + 11} ${x0 + w - r},${y + 11}H${x0}Z`
          : `M${x0},${y}H${x0 - w + r}Q${x0 - w},${y} ${x0 - w},${y + r}V${y + 11 - r}Q${x0 - w},${y + 11} ${x0 - w + r},${y + 11}H${x0}Z`;
        const a = g.append('a').attr('href', d.href || null);
        a.append('text').attr('x', -10).attr('y', i * rowH + rowH / 2).attr('dy', '0.32em').attr('text-anchor', 'end').style('fill', 'var(--ink)').style('font-size', '12.5px').text(d.label);
        g.append('path').attr('class', 'bar').style('fill', pos ? 'var(--r-positive)' : 'var(--r-negative)').attr('d', path);
        g.append('text').attr('class', 'dlabel').attr('x', pos ? x0 + w + 5 : x0 - w - 5).attr('y', i * rowH + rowH / 2).attr('dy', '0.32em').attr('text-anchor', pos ? 'start' : 'end').text(fmt(d.value));
        g.append('rect').attr('class', 'hit').attr('x', -labelW).attr('y', i * rowH).attr('width', W).attr('height', rowH)
          .on('pointerenter pointermove', (ev) => A.tip.show(A.tipBody(d.label, [{ value: fmt(d.value), name: opts.unit || '' }]), ev.clientX, ev.clientY))
          .on('pointerleave', () => A.tip.hide())
          .on('click', () => { if (d.href) location.href = d.href; }).style('cursor', d.href ? 'pointer' : null);
      });
    });
    if (opts.table !== false) tableView(host, [A.t('Peptide'), opts.unit || A.t('Change')], data.map((d) => [d.label, fmt(d.value)]));
  };

  // ---------- stacked horizontal bars (ordinal segments, e.g. trial phases) ----------
  /** opts.keys: [{key, label, color}], opts.data: [{label, href, values:{key:n}}] */
  A.stackedBars = function (el, opts) {
    const host = el.closest('figure') || el;
    const data = opts.data || [];
    if (!data.length) { el.textContent = A.t('No data yet.'); return; }
    responsive(el, (W) => {
      const labelW = Math.min(170, Math.max(100, W * 0.28));
      const rowH = opts.rowH || 24;
      const m = { t: 4, r: 56, b: 4, l: labelW };
      const H = m.t + m.b + data.length * rowH;
      const iw = W - m.l - m.r;
      const totals = data.map((d) => opts.keys.reduce((s, k) => s + (d.values[k.key] || 0), 0));
      const x = d3.scaleLinear().domain([0, d3.max(totals) || 1]).range([0, iw]);
      d3.select(el).selectAll('svg').remove();
      const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H).attr('role', 'img').attr('aria-label', opts.label || A.t('Stacked bar chart'));
      const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
      data.forEach((d, i) => {
        const gy = i * rowH;
        const a = g.append('a').attr('href', d.href || null);
        a.append('text').attr('x', -10).attr('y', gy + rowH / 2).attr('dy', '0.32em').attr('text-anchor', 'end').style('fill', 'var(--ink)').style('font-size', '12.5px').text(d.label);
        let cx = 0;
        const segs = opts.keys.filter((k) => d.values[k.key]);
        segs.forEach((k, j) => {
          const w = x(d.values[k.key]);
          const last = j === segs.length - 1;
          const gapW = last ? w : Math.max(0, w - 2);
          const p = last ? barPath(cx, gy + (rowH - 12) / 2, gapW, 12, 4) : `M${cx},${gy + (rowH - 12) / 2}h${gapW}v12h${-gapW}z`;
          g.append('path').attr('class', 'bar').style('fill', k.color).attr('d', p)
            .on('pointerenter pointermove', (ev) => A.tip.show(A.tipBody(d.label, [{ value: A.full(d.values[k.key]), name: k.label, color: k.color }]), ev.clientX, ev.clientY))
            .on('pointerleave', () => A.tip.hide());
          cx += w;
        });
        g.append('text').attr('class', 'dlabel').attr('x', x(totals[i]) + 6).attr('y', gy + rowH / 2).attr('dy', '0.32em').text(A.fmt(totals[i]));
      });
    });
    const lg = host.querySelector(':scope > .chart-legend');
    if (lg) lg.remove();
    const box = A.el('div', { class: 'chart-legend' });
    opts.keys.forEach((k) => box.append(A.el('span', { class: 'k' }, A.el('span', { class: 'rc', style: 'background:' + k.color }), k.label)));
    el.after(box);
    if (opts.table !== false) tableView(host, [A.t('Peptide'), ...opts.keys.map((k) => k.label), A.t('Total')], data.map((d) => [d.label, ...opts.keys.map((k) => A.full(d.values[k.key] || 0)), A.full(opts.keys.reduce((s, k) => s + (d.values[k.key] || 0), 0))]));
  };

  // ---------- heatmap (rows × columns, sequential blue) ----------
  /** opts.rows: [{label, href, values:{col:n}}], opts.cols: [...], opts.log */
  A.heatmap = function (el, opts) {
    const host = el.closest('figure') || el;
    const rows = opts.rows || [];
    const cols = opts.cols || [];
    const ramp = ['--seq-100', '--seq-200', '--seq-300', '--seq-400', '--seq-500', '--seq-600', '--seq-700'];
    const max = d3.max(rows, (r) => d3.max(cols, (c) => r.values[c] || 0)) || 1;
    const bin = (v) => {
      if (!v) return null;
      const t = opts.log ? Math.log10(v) / Math.log10(Math.max(10, max)) : v / max;
      return Math.min(ramp.length - 1, Math.max(0, Math.floor(t * ramp.length)));
    };
    responsive(el, (W) => {
      const labelW = Math.min(150, Math.max(96, W * 0.2));
      const cw = Math.max(6, Math.min(28, (W - labelW - 8) / cols.length));
      const ch = 16;
      const m = { t: 4, r: 8, b: 24, l: labelW };
      const Wd = m.l + cols.length * cw + m.r;
      const H = m.t + rows.length * ch + m.b;
      d3.select(el).selectAll('svg').remove();
      // fixed pixel width: never stretch the grid (that would scale the text too)
      const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${Wd} ${H}`).attr('width', Wd).attr('height', H).style('width', Wd + 'px').style('max-width', 'none').attr('role', 'img').attr('aria-label', opts.label || A.t('Heatmap'));
      const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
      rows.forEach((r, i) => {
        const a = g.append('a').attr('href', r.href || null);
        a.append('text').attr('x', -8).attr('y', i * ch + ch / 2).attr('dy', '0.32em').attr('text-anchor', 'end').style('fill', 'var(--ink)').style('font-size', '11.5px').text(r.label);
        cols.forEach((c, j) => {
          const v = r.values[c] || 0;
          const b = bin(v);
          g.append('rect').attr('x', j * cw).attr('y', i * ch).attr('width', cw - 1).attr('height', ch - 1).attr('rx', 1.5)
            .style('fill', b === null ? 'var(--empty)' : `var(${ramp[b]})`)
            .on('pointerenter pointermove', (ev) => A.tip.show(A.tipBody(r.label + (A.zh ? '，' : ', ') + c, [{ value: A.full(v), name: opts.unit || '' }]), ev.clientX, ev.clientY))
            .on('pointerleave', () => A.tip.hide());
        });
      });
      const every = Math.ceil(cols.length / Math.max(2, Math.floor((cols.length * cw) / 40)));
      g.append('g').attr('class', 'axis').selectAll('text').data(cols.filter((c, j) => j % every === 0)).join('text')
        .attr('x', (c) => cols.indexOf(c) * cw + cw / 2).attr('y', rows.length * ch + 16).attr('text-anchor', 'middle').text((c) => c);
      el.style.overflowX = Wd > W ? 'auto' : '';
    });
    const old = host.querySelector(':scope > .scale-legend');
    if (old) old.remove();
    const sl = A.el('div', { class: 'scale-legend' }, A.el('span', { text: opts.log ? '1' : '0' }));
    const rp = A.el('span', { class: 'ramp' });
    ramp.forEach((v) => rp.append(A.el('i', { style: `background:var(${v})` })));
    sl.append(rp, A.el('span', { text: A.fmt(max) + (opts.unit ? ' ' + opts.unit : '') + (opts.log ? A.t(' (log scale)') : '') }));
    el.after(sl);
    if (opts.table !== false) tableView(host, [A.t('Peptide'), ...cols], rows.map((r) => [r.label, ...cols.map((c) => A.full(r.values[c] || 0))]));
  };

  // ---------- choropleth ----------
  let worldPromise = null;
  A.loadWorld = (url) => (worldPromise = worldPromise || fetch(url).then((r) => r.json()));

  /**
   * opts.values: {ISO-numeric: value}, opts.names: {ISO-numeric: name}, opts.unit, opts.worldUrl, opts.isoUrl
   */
  A.choropleth = function (el, opts) {
    const host = el.closest('figure') || el;
    const ramp = ['--seq-100', '--seq-200', '--seq-300', '--seq-400', '--seq-500', '--seq-600', '--seq-700'];
    const vals = Object.values(opts.values).filter((v) => v > 0);
    const max = vals.length ? Math.max(...vals) : 1;
    const bin = (v) => {
      if (!v) return null;
      const t = max <= 1 ? 1 : Math.log(v) / Math.log(max);
      return Math.min(ramp.length - 1, Math.max(0, Math.floor(t * (ramp.length - 0.001))));
    };
    A.loadWorld(opts.worldUrl).then((topo) => {
      const feats = topojson.feature(topo, topo.objects.countries).features.filter((f) => f.properties.name !== 'Antarctica');
      responsive(el, (W) => {
        const H = Math.round(W * 0.5);
        const proj = d3.geoNaturalEarth1().fitExtent([[4, 4], [W - 4, H - 4]], { type: 'FeatureCollection', features: feats });
        const path = d3.geoPath(proj);
        d3.select(el).selectAll('svg').remove();
        const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H).attr('role', 'img').attr('aria-label', opts.label || A.t('World map'));
        svg.append('g').selectAll('path').data(feats).join('path').attr('class', 'country').attr('d', path)
          .style('fill', (f) => { const b = bin(opts.values[f.id]); return b === null ? 'var(--empty)' : `var(${ramp[b]})`; })
          .on('pointerenter pointermove', function (ev, f) {
            d3.select(this).classed('is-hot', true).raise();
            const v = opts.values[f.id];
            A.tip.show(A.tipBody(opts.names?.[f.id] || f.properties.name, [{ value: v ? A.full(v) : A.t('No data'), name: v ? opts.unit || '' : '' }]), ev.clientX, ev.clientY);
          })
          .on('pointerleave', function () { d3.select(this).classed('is-hot', false); A.tip.hide(); });
      });
      const old = host.querySelector(':scope > .scale-legend');
      if (old) old.remove();
      const sl = A.el('div', { class: 'scale-legend' }, A.el('span', { text: '1' }));
      const rp = A.el('span', { class: 'ramp' });
      ramp.forEach((v) => rp.append(A.el('i', { style: `background:var(${v})` })));
      sl.append(rp, A.el('span', { text: A.fmt(max) + ' ' + (opts.unit || '') + A.t(' (log scale)') }),
        A.el('span', { class: 'k', style: 'margin-left:14px;display:inline-flex;gap:6px;align-items:center' }, A.el('i', { style: 'width:12px;height:10px;border-radius:2px;display:inline-block;background:var(--empty)' }), A.t('no data')));
      el.after(sl);
      if (opts.table !== false) {
        const rows = Object.entries(opts.values).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1])
          .map(([id, v]) => [opts.names?.[id] || (feats.find((f) => f.id === id) || { properties: { name: id } }).properties.name, A.full(v)]);
        tableView(host, [A.t('Country'), opts.unit || A.t('Value')], rows);
      }
    });
  };
})();
