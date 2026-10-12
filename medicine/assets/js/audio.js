/* Medicine Atlas — a chapter read aloud. tools/tts.py makes the recording and the start time of every readable
   element of the lesson; this plays it in a bar at the foot of the page, highlights the passage being read and keeps
   it in view (unless "follow" is off, or the reader has scrolled elsewhere: then the follow button brings them back),
   offers "listen from here" on each section heading, and remembers the speed and where each chapter was left. */
(function () {
  'use strict';

  // The readable elements, in document order, skipping figure stages (scripts fill them in).
  // Keep this the same as READABLE in tools/tts.py: element i here is element i there.
  const READABLE = 'p, li, h2, h3, h4, tr, figcaption, .blk-head, summary, .math-block';
  const RATES = [1, 1.25, 1.5, 1.75, 2, 0.75];

  document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('tts-bar');
    const dataEl = document.getElementById('tts-data');
    const body = document.querySelector('.lesson-body');
    const openBtn = document.querySelector('[data-tts-open]');
    if (!bar || !dataEl || !body || !openBtn) return;
    const D = JSON.parse(dataEl.textContent);
    const $ = (s) => bar.querySelector(s);
    const playBtn = $('.tts-play'), seek = $('.tts-seek'), posEl = $('.tts-pos'), secEl = $('.tts-sec');
    const rateBtn = $('.tts-rate'), followBtn = $('.tts-follow');
    const L = bar.dataset;

    const store = {
      get(k, d) { try { const v = localStorage.getItem('med-tts-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
      set(k, v) { try { localStorage.setItem('med-tts-' + k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } },
    };
    const fmt = (t) => {
      t = Math.max(0, Math.floor(t));
      const h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, s = t % 60;
      return (h ? h + ':' + String(m).padStart(2, '0') : String(m)) + ':' + String(s).padStart(2, '0');
    };
    $('.tts-dur').textContent = fmt(D.duration);

    let audio = null, cur = -1, follow = store.get('follow', true), dragging = false, lastSave = 0;
    let detached = false, programmatic = 0; // detached: the reader scrolled away while following
    let els = null;
    const elements = () => {
      if (!els) {
        const all = Array.from(body.querySelectorAll(READABLE)).filter((e) => !e.closest('.widget-stage'));
        els = all.length === D.n ? all : []; // the page changed since the recording was made: play without highlighting
      }
      return els;
    };

    // sections: the opening, then each h2 the recording starts a section at
    const headingText = (h) => {
      const c = h.cloneNode(true);
      c.querySelectorAll('.anchor, .tts-from').forEach((x) => x.remove());
      return c.textContent.trim();
    };
    const sections = D.sections.map(([t, id]) => {
      const h = id ? document.getElementById(id) : null;
      return { t, h, title: h ? headingText(h) : L.title };
    });
    const ticks = $('.tts-ticks');
    sections.slice(1).forEach((s) => {
      const i = document.createElement('i');
      i.style.left = (100 * s.t / D.duration).toFixed(3) + '%';
      ticks.appendChild(i);
    });
    sections.forEach((s) => {
      if (!s.h) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tts-from';
      b.setAttribute('aria-label', L.lFrom);
      b.title = L.lFrom;
      b.innerHTML = playBtn.querySelector('.i-play').innerHTML;
      b.addEventListener('click', () => start(s.t));
      const anchor = s.h.querySelector('.anchor');
      s.h.insertBefore(b, anchor);
    });

    // positions: where each chapter was left, the 60 most recent
    const positions = () => store.get('pos', {});
    const savePos = (t) => {
      const p = positions();
      delete p[D.key];
      if (t > 5 && t < D.duration - 10) p[D.key] = Math.round(t);
      const keys = Object.keys(p);
      keys.slice(0, Math.max(0, keys.length - 60)).forEach((k) => delete p[k]);
      store.set('pos', p);
    };

    const setState = (playing) => {
      bar.dataset.state = playing ? 'playing' : 'paused';
      playBtn.setAttribute('aria-label', playing ? L.lPause : L.lPlay);
      openBtn.classList.toggle('is-playing', playing);
    };
    const showRate = () => { rateBtn.textContent = String(audio ? audio.playbackRate : store.get('rate', 1)) + '×'; };
    const showFollow = () => {
      followBtn.setAttribute('aria-pressed', String(follow));
      followBtn.classList.toggle('is-detached', follow && detached);
      const label = follow && detached ? L.lBack : L.lFollow;
      followBtn.setAttribute('aria-label', label);
      followBtn.title = label;
    };
    const inView = (el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 64 && r.top < window.innerHeight - bar.offsetHeight - 16;
    };

    const segAt = (t) => {
      let lo = 0, hi = D.segs.length - 1, ans = -1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (D.segs[mid][1] <= t + 0.15) { ans = mid; lo = mid + 1; } else hi = mid - 1;
      }
      return ans;
    };
    const reveal = (el) => {
      for (let d = el.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true;
      const r = el.getBoundingClientRect(), bottom = window.innerHeight - bar.offsetHeight;
      if (r.top >= 64 && r.bottom <= bottom - 16) return;
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const top = window.scrollY + r.top - (r.height > (bottom - 64) * 0.7 ? 80 : (bottom - r.height) / 2);
      programmatic = Date.now();
      window.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
    };
    const highlight = (t, force) => {
      if (bar.hidden) return; // a late timeupdate after closing the player
      const list = elements();
      const i = segAt(t);
      if (i === cur && !force) return;
      if (cur >= 0 && list.length) { const old = list[D.segs[cur][0]]; if (old) old.classList.remove('tts-reading'); }
      cur = i;
      if (i < 0 || !list.length) return;
      const el = list[D.segs[i][0]];
      if (!el) return;
      el.classList.add('tts-reading');
      if (detached && inView(el)) { detached = false; showFollow(); } // the reader caught up with the voice
      if (follow && !detached && audio && !audio.paused) reveal(el);
    };
    const showSection = (t) => {
      let s = sections[0];
      for (const x of sections) if (x.t <= t + 0.15) s = x;
      if (s && secEl.textContent !== s.title) secEl.textContent = s.title;
    };
    const onTime = () => {
      const t = audio.currentTime;
      if (!dragging) seek.value = String(Math.floor(t));
      posEl.textContent = fmt(t);
      showSection(t);
      highlight(t);
      if (Date.now() - lastSave > 5000) { lastSave = Date.now(); savePos(t); }
    };

    const ensure = () => {
      if (audio) return audio;
      audio = new Audio();
      audio.preload = 'metadata';
      audio.src = D.src;
      audio.playbackRate = store.get('rate', 1);
      const saved = positions()[D.key];
      if (saved) audio.currentTime = saved;
      audio.addEventListener('timeupdate', onTime);
      audio.addEventListener('seeked', () => { highlight(audio.currentTime, true); onTime(); });
      audio.addEventListener('play', () => setState(true));
      audio.addEventListener('pause', () => { setState(false); savePos(audio.currentTime); });
      audio.addEventListener('ended', () => { setState(false); savePos(0); });
      audio.addEventListener('ratechange', () => { store.set('rate', audio.playbackRate); showRate(); });
      audio.addEventListener('error', () => { secEl.textContent = L.lError; setState(false); });
      if ('mediaSession' in navigator && 'MediaMetadata' in window) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: L.title, artist: L.course, album: L.site });
        const on = (a, f) => { try { navigator.mediaSession.setActionHandler(a, f); } catch (e) { /* unsupported action */ } };
        on('play', () => audio.play());
        on('pause', () => audio.pause());
        on('seekbackward', (e) => skip(-(e.seekOffset || 15)));
        on('seekforward', (e) => skip(e.seekOffset || 15));
        on('seekto', (e) => { audio.currentTime = e.seekTime; });
      }
      return audio;
    };
    const open = () => {
      if (!bar.hidden) return;
      bar.hidden = false;
      document.body.classList.add('tts-open');
      showRate();
      showFollow();
    };
    const start = (t) => {
      open();
      ensure();
      if (typeof t === 'number') audio.currentTime = t;
      const p = audio.play();
      if (p && p.catch) p.catch(() => setState(false));
    };
    const skip = (d) => {
      ensure();
      audio.currentTime = Math.min(Math.max(0, audio.currentTime + d), D.duration - 0.5);
    };
    const close = () => {
      if (audio) { audio.pause(); savePos(audio.currentTime); }
      bar.hidden = true;
      document.body.classList.remove('tts-open');
      const list = elements();
      if (cur >= 0 && list.length) { const el = list[D.segs[cur][0]]; if (el) el.classList.remove('tts-reading'); }
      cur = -1;
    };

    openBtn.addEventListener('click', () => {
      if (bar.hidden || !audio || audio.paused) start();
      else audio.pause();
    });
    playBtn.addEventListener('click', () => { if (!audio || audio.paused) start(); else audio.pause(); });
    bar.querySelectorAll('[data-skip]').forEach((b) => b.addEventListener('click', () => skip(Number(b.dataset.skip))));
    rateBtn.addEventListener('click', () => {
      ensure();
      const i = RATES.indexOf(audio.playbackRate);
      audio.playbackRate = RATES[(i + 1) % RATES.length];
    });
    followBtn.addEventListener('click', () => {
      if (follow && detached) detached = false; // back to the passage being read
      else { follow = !follow; store.set('follow', follow); detached = false; }
      showFollow();
      const list = elements();
      if (follow && cur >= 0 && list.length && list[D.segs[cur][0]]) reveal(list[D.segs[cur][0]]);
    });
    $('.tts-close').addEventListener('click', close);
    seek.addEventListener('input', () => { dragging = true; posEl.textContent = fmt(Number(seek.value)); showSection(Number(seek.value)); });
    seek.addEventListener('change', () => { dragging = false; ensure().currentTime = Number(seek.value); });

    // a reader who scrolls away while following is left alone until they come back or press the follow button
    const userScrolled = () => {
      if (!follow || detached || !audio || audio.paused || Date.now() - programmatic < 1200) return;
      detached = true;
      showFollow();
    };
    window.addEventListener('wheel', userScrolled, { passive: true });
    window.addEventListener('touchmove', userScrolled, { passive: true });
    window.addEventListener('keydown', (e) => { if (['PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End', ' '].includes(e.key) && !e.target.closest('input, textarea, select, button')) userScrolled(); });
    window.addEventListener('pagehide', () => { if (audio) savePos(audio.currentTime); });
  });
})();
