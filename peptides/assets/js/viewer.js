/* Peptide Atlas — 3D structure viewer (3Dmol.js). The peptide is coloured with the same
   residue-chemistry palette as the bead chains; binding partners stay grey. */
(function () {
  'use strict';
  const A = window.Atlas;

  const THREE = {
    ALA: 'A', ARG: 'R', ASN: 'N', ASP: 'D', CYS: 'C', GLN: 'Q', GLU: 'E', GLY: 'G', HIS: 'H', ILE: 'I', LEU: 'L', LYS: 'K',
    MET: 'M', PHE: 'F', PRO: 'P', SER: 'S', THR: 'T', TRP: 'W', TYR: 'Y', VAL: 'V',
    DAL: 'A', DAR: 'R', DSG: 'N', DAS: 'D', DCY: 'C', DGN: 'Q', DGL: 'E', DHI: 'H', DIL: 'I', DLE: 'L', DLY: 'K',
    MED: 'M', DPN: 'F', DPR: 'P', DSN: 'S', DTH: 'T', DTR: 'W', DTY: 'Y', DVA: 'V',
    AIB: 'A', NLE: 'L', MLE: 'L', MVA: 'V', SAR: 'G', ABA: 'A', ORN: 'K', HYP: 'P', PCA: 'Q', BMT: 'T', NH2: '', ACE: '',
  };
  const CLASS = {
    K: 'positive', R: 'positive', H: 'positive', D: 'negative', E: 'negative', A: 'hydrophobic', V: 'hydrophobic', L: 'hydrophobic',
    I: 'hydrophobic', M: 'hydrophobic', F: 'aromatic', W: 'aromatic', Y: 'aromatic', S: 'polar', T: 'polar', N: 'polar', Q: 'polar',
    G: 'special', P: 'special', C: 'cysteine',
  };
  const PLDDT = [[90, '#0053d6'], [70, '#65cbf3'], [50, '#ffdb13'], [0, '#ff7d45']];

  function palette() {
    const p = {};
    ['positive', 'negative', 'hydrophobic', 'aromatic', 'polar', 'special', 'cysteine', 'noncanonical'].forEach((c) => (p[c] = A.cssVar('--r-' + c) || '#999'));
    p.partner = A.isDark() ? '#7a8294' : '#b9bec7';
    return p;
  }

  A.viewer = function (root, cfg) {
    const canvas = root.querySelector('.viewer-canvas');
    const msg = root.querySelector('.viewer-msg');
    const bar = root.querySelector('.viewer-bar');
    const cap = root.querySelector('.viewer-cap');
    const structures = cfg.structures || [];
    if (!structures.length || !window.$3Dmol) {
      msg.textContent = A.t('No 3D structure is available for this peptide.');
      if (bar) bar.hidden = true;
      return;
    }
    let viewer = null, model = null, cur = null, spinning = false;
    let style = 'cartoon', color = 'chem', partners = true;
    let resList = [];          // peptide residues in the model: {chain, resi, letter, idx}
    let idxClass = new Map();  // "chain|resi" -> class
    let hot = null;

    // ----- controls -----
    const mk = (tag, attrs, ...k) => A.el(tag, attrs, ...k);
    const seg = (name, opts, get, set) => {
      const box = mk('div', { class: 'seg', role: 'group', 'aria-label': name });
      opts.forEach(([v, label]) => {
        const b = mk('button', { type: 'button', 'data-v': v, 'aria-pressed': String(get() === v), text: label });
        b.addEventListener('click', () => { set(v); box.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.v === get()))); });
        box.append(b);
      });
      return box;
    };
    function buildBar() {
      bar.replaceChildren();
      if (structures.length > 1) {
        const sel = mk('select', { class: 'select', 'aria-label': A.t('Structure') });
        structures.forEach((s, i) => sel.append(mk('option', { value: String(i), text: s.label })));
        sel.value = String(structures.indexOf(cur));
        sel.addEventListener('change', () => load(structures[+sel.value]));
        bar.append(sel);
      }
      const styles = (cur.format === 'sdf' ? [['stick', 'Sticks'], ['sphere', 'Spheres'], ['surface', 'Surface']]
        : [['cartoon', 'Cartoon'], ['stick', 'Sticks'], ['sphere', 'Spheres'], ['surface', 'Surface']]).map(([v, l]) => [v, A.t(l)]);
      if (!styles.some(([v]) => v === style)) style = styles[0][0];
      bar.append(seg(A.t('Style'), styles, () => style, (v) => { style = v; apply(); }));
      const colors = (cur.format === 'sdf' ? [['elem', 'Element']] : [['chem', 'Chemistry'], ['rainbow', 'N→C'], ['elem', 'Element']]).map(([v, l]) => [v, A.t(l)]);
      if (cur.plddt) colors.push(['plddt', A.t('Confidence')]);
      if (!colors.some(([v]) => v === color)) color = colors[0][0];
      if (colors.length > 1) bar.append(seg(A.t('Colour'), colors, () => color, (v) => { color = v; apply(); }));
      if (cur.hasPartners) bar.append(seg(A.t('Binding partners'), [['1', A.t('Partners')], ['0', A.t('Peptide only')]], () => (partners ? '1' : '0'), (v) => { partners = v === '1'; apply(); zoom(); }));
      const spin = mk('button', { type: 'button', class: 'chip', 'aria-pressed': String(spinning), text: A.t('Spin') });
      spin.addEventListener('click', () => { spinning = !spinning; viewer.spin(spinning ? 'y' : false, 0.6); spin.setAttribute('aria-pressed', String(spinning)); });
      const reset = mk('button', { type: 'button', class: 'chip', text: A.t('Reset view') });
      reset.addEventListener('click', zoom);
      const dl = mk('a', { class: 'chip', href: cur.url + '&download=1', text: A.t('Download'), style: 'text-decoration:none' });
      bar.append(spin, reset, dl);
    }
    function caption() {
      cap.replaceChildren();
      const t = mk('div');
      t.append(mk('strong', { text: cur.title, lang: /[\u3400-\u9fff]/.test(cur.title) ? null : 'en' }));
      if (cur.meta) t.append(' ', mk('span', { class: 'muted', text: cur.meta }));
      cap.append(t);
      if (cur.note) cap.append(mk('div', { text: cur.note, style: 'margin-top:4px' }));
      if (cur.plddt && color === 'plddt') {
        const k = mk('div', { class: 'plddt-key', style: 'margin-top:6px' });
        [['Very high (>90)', PLDDT[0][1]], ['Confident (70–90)', PLDDT[1][1]], ['Low (50–70)', PLDDT[2][1]], ['Very low (<50)', PLDDT[3][1]]]
          .forEach(([l, c]) => k.append(mk('span', { style: '--c:' + c, text: A.t(l) })));
        cap.append(k);
      }
      if (cur.link) cap.append(mk('div', { style: 'margin-top:4px' }, mk('a', { href: cur.link, target: '_blank', rel: 'noopener', text: cur.linkText || A.t('Open source record') })));
    }

    // ----- residue mapping between our sequence and the model -----
    function mapResidues() {
      resList = [];
      idxClass = new Map();
      if (cur.format === 'sdf') return;
      const chains = cur.chains || [];
      const atoms = model.selectedAtoms({});
      chains.forEach((ch, ci) => {
        const seen = new Set();
        const list = [];
        atoms.forEach((a) => {
          if (a.chain !== ch || a.resn === 'HOH' || THREE[a.resn] === '') return; // skip water and terminal caps
          const key = a.resi + (a.icode || '');
          if (seen.has(key)) return;
          seen.add(key);
          list.push({ chain: ch, resi: a.resi, resn: a.resn, letter: THREE[a.resn] || 'X' });
        });
        const ours = (cfg.chains[ci] || cfg.chains[0] || { letters: '', classes: [] });
        const n = ours.letters.length;
        let best = 0, bestK = 0;
        if (cfg.cyclic && list.length === n) {
          // head-to-tail rings may be deposited starting at any residue: find the rotation
          for (let k = 0; k < n; k++) {
            let s = 0;
            for (let j = 0; j < n; j++) if (list[j].letter === ours.letters[(j + k) % n]) s++;
            if (s > best) { best = s; bestK = k; }
          }
          list.forEach((r, j) => { const i = (j + bestK) % n; r.idx = i + 1; r.ci = ci; idxClass.set(r.chain + '|' + r.resi, ours.classes[i]); resList.push(r); });
          return;
        }
        for (let k = -12; k <= 12; k++) {
          let s = 0;
          for (let i = 0; i < n; i++) { const j = i + k; if (j >= 0 && j < list.length && list[j].letter === ours.letters[i]) s++; }
          if (s > best) { best = s; bestK = k; }
        }
        list.forEach((r, j) => {
          const i = j - bestK;
          r.idx = i >= 0 && i < ours.letters.length ? i + 1 : null;
          r.ci = ci;
          const cls = r.idx ? ours.classes[i] : (CLASS[r.letter] || 'noncanonical');
          idxClass.set(r.chain + '|' + r.resi, cls);
          resList.push(r);
        });
      });
    }

    // ----- styling -----
    function apply() {
      if (!viewer || !model) return;
      const pal = palette();
      viewer.setBackgroundColor(A.cssVar('--sheet') || '#ffffff', 1);
      const pchains = new Set(cur.chains || []);
      const contacts = new Set(cur.contacts || []);
      const isPep = (a) => cur.format === 'sdf' || pchains.size === 0 || pchains.has(a.chain);
      const nRes = Math.max(1, resList.length);
      const rank = new Map(resList.map((r, i) => [r.chain + '|' + r.resi, i]));
      const rainbow = (a) => {
        const t = (rank.get(a.chain + '|' + a.resi) ?? 0) / Math.max(1, nRes - 1);
        const hue = 250 - t * 250;
        return 'hsl(' + hue.toFixed(0) + ',70%,' + (A.isDark() ? 60 : 48) + '%)';
      };
      const plddt = (a) => { let b = a.b; if (cur.bScale) b *= cur.bScale; for (const [t, c] of PLDDT) if (b >= t) return c; return PLDDT[3][1]; };
      const pepColor = (a) => {
        if (color === 'plddt') return plddt(a);
        if (color === 'rainbow') return rainbow(a);
        return pal[idxClass.get(a.chain + '|' + a.resi) || CLASS[THREE[a.resn]] || 'noncanonical'];
      };
      const elemScheme = 'Jmol';
      viewer.setStyle({}, {});
      viewer.removeAllSurfaces();
      const pepSel = { predicate: isPep };
      const otherSel = { predicate: (a) => !isPep(a) && contacts.has(a.chain) && a.resn !== 'HOH' };
      const useElem = color === 'elem';
      const col = useElem ? { colorscheme: elemScheme } : { colorfunc: pepColor };
      if (style === 'cartoon') {
        viewer.setStyle(pepSel, { cartoon: Object.assign({ thickness: 0.6, arrows: true }, useElem ? { color: pal.special } : { colorfunc: pepColor }),
          stick: Object.assign({ radius: 0.14, hidden: false }, useElem ? { colorscheme: elemScheme } : { colorfunc: pepColor }) });
      } else if (style === 'stick') {
        viewer.setStyle(pepSel, { stick: Object.assign({ radius: 0.2 }, col), sphere: Object.assign({ scale: 0.22 }, col) });
      } else if (style === 'sphere') {
        viewer.setStyle(pepSel, { sphere: Object.assign({ scale: 1.0 }, col) });
      } else if (style === 'surface') {
        viewer.setStyle(pepSel, { stick: Object.assign({ radius: 0.12 }, col) });
        viewer.addSurface(window.$3Dmol.SurfaceType.VDW, Object.assign({ opacity: 0.88 }, useElem ? { colorscheme: elemScheme } : { colorfunc: pepColor }), pepSel);
      }
      if (cur.hasPartners && partners) {
        viewer.setStyle(otherSel, { cartoon: { color: pal.partner, opacity: 0.55, thickness: 0.3 } });
        viewer.addStyle({ predicate: (a) => !isPep(a) && contacts.has(a.chain) && a.hetflag && a.resn !== 'HOH' }, { stick: { radius: 0.12, color: pal.partner } });
      }
      caption();
      viewer.render();
    }
    function zoom() {
      if (!viewer) return;
      const pchains = new Set(cur.chains || []);
      const contacts = new Set(cur.contacts || []);
      if (cur.hasPartners && partners) viewer.zoomTo({ predicate: (a) => pchains.has(a.chain) || contacts.has(a.chain) });
      else viewer.zoomTo(cur.format === 'sdf' || !pchains.size ? {} : { predicate: (a) => pchains.has(a.chain) });
      viewer.zoom(cur.hasPartners && partners ? 1.45 : 1.15);
      viewer.render();
    }

    // ----- bead <-> 3D linking -----
    function highlight(ci, i) {
      if (!viewer || !resList.length) return;
      const r = resList.find((x) => x.ci === ci && x.idx === i);
      if (!r) return;
      clearHot();
      const sel = { chain: r.chain, resi: r.resi };
      viewer.addStyle(sel, { stick: { radius: 0.32, color: A.isDark() ? '#ffffff' : '#15192b' } });
      const atoms = model.selectedAtoms(sel);
      const ca = atoms.find((a) => a.atom === 'CA') || atoms[0];
      if (ca) hot = viewer.addLabel(r.resn + ' ' + r.resi, { position: { x: ca.x, y: ca.y, z: ca.z }, backgroundColor: '#15192b', backgroundOpacity: 0.85, fontColor: '#ffffff', fontSize: 12, borderRadius: 4, inFront: true });
      viewer.render();
    }
    function clearHot() {
      if (hot) { viewer.removeLabel(hot); hot = null; apply(); }
    }
    const beads = document.querySelector(cfg.beadSelector || '#chain-main');
    if (beads) {
      beads.addEventListener('bead:hover', (e) => highlight(e.detail.c, e.detail.i));
      beads.addEventListener('bead:leave', clearHot);
      beads.addEventListener('bead:click', (e) => {
        const r = resList.find((x) => x.ci === e.detail.c && x.idx === e.detail.i);
        if (r && viewer) { viewer.zoomTo({ chain: r.chain, resi: r.resi }, 400); }
      });
    }

    /** Chains with any atom within 5 Å of the peptide: the receptor, not the G protein or nanobody. */
    function contactChains(m, pep) {
      if (!pep.length) return [];
      const all = m.selectedAtoms({});
      const P = all.filter((a) => pep.includes(a.chain));
      const cell = 5, grid = new Map();
      const key = (x, y, z) => Math.floor(x / cell) + ',' + Math.floor(y / cell) + ',' + Math.floor(z / cell);
      P.forEach((a) => { const k = key(a.x, a.y, a.z); if (!grid.has(k)) grid.set(k, []); grid.get(k).push(a); });
      const out = new Set();
      for (const a of all) {
        if (pep.includes(a.chain) || out.has(a.chain) || a.resn === 'HOH') continue;
        const cx = Math.floor(a.x / cell), cy = Math.floor(a.y / cell), cz = Math.floor(a.z / cell);
        let hit = false;
        for (let dx = -1; dx <= 1 && !hit; dx++) for (let dy = -1; dy <= 1 && !hit; dy++) for (let dz = -1; dz <= 1 && !hit; dz++) {
          const list = grid.get((cx + dx) + ',' + (cy + dy) + ',' + (cz + dz));
          if (list) for (const b of list) { const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2; if (d < 25) { hit = true; break; } }
        }
        if (hit) out.add(a.chain);
      }
      return [...out];
    }

    // ----- loading -----
    function load(s) {
      cur = s;
      msg.textContent = A.t('Loading %s…', s.label);
      msg.hidden = false;
      fetch(s.url).then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); }).then((txt) => {
        if (!viewer) {
          // an opaque background: 3Dmol drops translucent cartoons on a transparent canvas
          viewer = window.$3Dmol.createViewer(canvas, { backgroundColor: A.cssVar('--sheet') || '#ffffff', antialias: true });
          window.addEventListener('atlas:theme', apply);
          window.addEventListener('resize', () => viewer && viewer.resize());
        }
        viewer.clear();
        model = viewer.addModel(txt, s.format);
        const chainsInModel = new Set(model.selectedAtoms({}).map((a) => a.chain));
        cur.chains = (s.chain ? String(s.chain).split(',').map((c) => c.trim()) : []).filter((c) => chainsInModel.has(c));
        cur.contacts = contactChains(model, cur.chains);
        cur.hasPartners = s.format !== 'sdf' && cur.contacts.length > 0;
        if (s.plddt) {
          const bs = model.selectedAtoms({}).map((a) => a.b);
          cur.bScale = Math.max(...bs) <= 1.0001 ? 100 : 1;
        }
        if (s.plddt && color === 'chem') color = 'plddt';
        mapResidues();
        buildBar();
        apply();
        zoom();
        msg.hidden = true;
      }).catch(() => { msg.textContent = A.t('The structure file could not be loaded.'); });
    }

    const start = () => load(structures[0]);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((en) => { if (en.some((e) => e.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: '200px' });
      io.observe(root);
    } else start();
  };
})();
