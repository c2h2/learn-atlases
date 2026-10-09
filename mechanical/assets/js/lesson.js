/* Mechanical & Aerospace Atlas (engine shared with Maths Atlas) — lesson page: contents scroll-spy, quick-check quizzes, answer checking, "mark as read". */
(function () {
  'use strict';
  const MA = window.MA;

  document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.lesson-body');
    if (!body) return;

    // ---------- contents: scroll spy and the mobile toggle ----------
    const toc = document.querySelector('.lesson-toc');
    if (toc) {
      const tg = toc.querySelector('.toc-toggle button');
      if (tg) tg.addEventListener('click', () => { const open = toc.classList.toggle('open'); tg.setAttribute('aria-expanded', String(open)); });
      const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
      const map = new Map(links.map((a) => [decodeURIComponent(a.getAttribute('href').slice(1)), a]));
      if ('IntersectionObserver' in window && links.length) {
        const visible = new Set();
        const io = new IntersectionObserver((entries) => {
          entries.forEach((en) => { if (en.isIntersecting) visible.add(en.target.id); else visible.delete(en.target.id); });
          let best = null;
          for (const [id] of map) { if (visible.has(id)) { best = id; break; } }
          if (best) { links.forEach((l) => l.classList.remove('active')); map.get(best).classList.add('active'); }
        }, { rootMargin: '0px 0px -70% 0px' });
        map.forEach((a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
      }
      const cur = body.dataset.current;
      toc.querySelectorAll('.bead').forEach((b) => b.classList.toggle('is-current', b.dataset.key === cur));
    }

    // ---------- quick checks ----------
    body.querySelectorAll('.blk-quiz').forEach((q) => {
      const opts = Array.from(q.querySelectorAll('.quiz-opt'));
      const multi = q.dataset.multi === '1';
      const expl = q.querySelector('.quiz-expl');
      let done = false;
      const reveal = (ok) => {
        done = true;
        opts.forEach((b) => {
          b.disabled = true;
          if (b.dataset.ok === '1') b.classList.add('is-right');
        });
        if (expl) {
          expl.hidden = false;
          const v = MA.el('span', { class: 'quiz-verdict', style: 'color:var(' + (ok ? '--good' : '--bad') + ')', text: ok ? MA.t('Correct.') : MA.t('Not quite.') });
          expl.prepend(v, ' ');
        }
      };
      opts.forEach((b) => b.addEventListener('click', () => {
        if (done) return;
        if (!multi) {
          const ok = b.dataset.ok === '1';
          if (!ok) b.classList.add('is-wrong');
          reveal(ok);
          return;
        }
        b.classList.toggle('is-chosen');
        b.setAttribute('aria-pressed', String(b.classList.contains('is-chosen')));
      }));
      if (multi) {
        const btn = MA.el('button', { type: 'button', class: 'w-btn primary', style: 'margin-top:10px', text: MA.t('Check answer') });
        btn.addEventListener('click', () => {
          if (done) return;
          let ok = true;
          opts.forEach((b) => {
            const chosen = b.classList.contains('is-chosen');
            if (chosen !== (b.dataset.ok === '1')) ok = false;
            if (chosen && b.dataset.ok !== '1') b.classList.add('is-wrong');
          });
          btn.remove();
          reveal(ok);
        });
        q.querySelector('.quiz-opts').after(btn);
      }
    });

    // ---------- numeric answer checks (exercise check="…") ----------
    body.querySelectorAll('.check[data-check]').forEach((box) => {
      const expected = box.dataset.check;
      const input = MA.el('input', { type: 'text', placeholder: MA.t('Your answer, e.g. 3/4 or sqrt(2)'), 'aria-label': MA.t('Your answer'), spellcheck: 'false', autocomplete: 'off' });
      const btn = MA.el('button', { type: 'button', text: MA.t('Check') });
      const verdict = MA.el('span', { class: 'verdict', 'aria-live': 'polite' });
      const preview = MA.el('span', { class: 'preview' });
      const run = () => {
        const s = input.value.trim();
        if (!s) return;
        if (!MA.expr) { verdict.textContent = ''; return; }
        let v, want;
        try { want = MA.expr.value(expected); } catch (e) { return; }
        try { v = MA.expr.value(s); } catch (e) {
          verdict.className = 'verdict no';
          verdict.textContent = MA.t('Could not read that: %s', e.message);
          return;
        }
        const ok = Math.abs(v - want) <= 1e-6 * Math.max(1, Math.abs(want));
        verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
        verdict.textContent = ok ? MA.t('Correct!') : MA.t('Not quite — your answer is %s.', MA.fmt(v, 6));
      };
      btn.addEventListener('click', run);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') run(); });
      input.addEventListener('input', () => { verdict.textContent = ''; });
      box.append(input, btn, verdict, preview);
    });

    // ---------- mark as read ----------
    const done = document.querySelector('.done-toggle');
    if (done) {
      const key = done.dataset.done;
      const label = done.querySelector('span');
      const sync = () => {
        const on = MA.progress.has(key);
        done.setAttribute('aria-pressed', String(on));
        label.textContent = on ? MA.t('Read') : MA.t('Mark as read');
      };
      done.addEventListener('click', () => { MA.progress.set(key, !MA.progress.has(key)); sync(); });
      sync();
    }

    // ---------- open solutions/hints when a link targets them ----------
    const openTarget = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const t = id && document.getElementById(id);
      if (t) { let d = t.closest('details'); while (d) { d.open = true; d = d.parentElement && d.parentElement.closest('details'); } }
    };
    window.addEventListener('hashchange', openTarget);
    openTarget();
  });
})();
