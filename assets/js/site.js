/* iDataGear · site.js — theme, menu, app filters, video switching,
   before/after slider and scroll reveals. No dependencies.
   (assets/js/main.js belongs to the older pages; leave it alone.) */
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  /* ---------- Theme ---------- */
  const themeMetas = document.querySelectorAll('meta[name="theme-color"]');
  const toggle = document.querySelector('.theme-toggle');
  const storedTheme = () => { try { return localStorage.getItem('theme'); } catch (e) { return null; } };
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const applyTheme = (theme, persist) => {
    root.setAttribute('data-theme', theme);
    themeMetas.forEach((m) => m.setAttribute('content', theme === 'dark' ? '#0f0e17' : '#fbfaf7'));
    toggle?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    if (persist) { try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ } }
  };
  applyTheme(root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light'), false);
  toggle?.addEventListener('click', () => applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));
  systemDark.addEventListener?.('change', (e) => { if (!storedTheme()) applyTheme(e.matches ? 'dark' : 'light', false); });

  /* ---------- Header & mobile menu ---------- */
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setMenu = (open) => {
    document.body.classList.toggle('nav-open', open);
    navToggle?.setAttribute('aria-expanded', String(open));
    navToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  navToggle?.addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
  nav?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- App filters ---------- */
  document.querySelectorAll('[data-filters]').forEach((bar) => {
    const grid = document.getElementById(bar.dataset.filters);
    const status = document.getElementById(bar.dataset.status);
    if (!grid) return;
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      const want = btn.dataset.filter;
      bar.querySelectorAll('button[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let shown = 0;
      grid.querySelectorAll('[data-cat]').forEach((card) => {
        const match = want === 'all' || card.dataset.cat.split(' ').includes(want);
        card.hidden = !match;
        if (match) shown += 1;
      });
      if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'app' : 'apps'}`;
    });
  });

  /* ---------- Video switching (tabs and 简/繁) ---------- */
  document.querySelectorAll('[data-video-switch]').forEach((group) => {
    const video = document.getElementById(group.dataset.videoSwitch);
    if (!video) return;
    const title = document.getElementById(group.dataset.title || '');
    const desc = document.getElementById(group.dataset.desc || '');
    const link = document.getElementById(group.dataset.link || '');
    const card = video.closest('[data-app]');
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      if (focus) tab.focus();
      if (video.getAttribute('src') === tab.dataset.src) return;
      video.pause();
      video.querySelectorAll('track').forEach((t) => t.remove());
      video.setAttribute('poster', tab.dataset.poster);
      video.setAttribute('src', tab.dataset.src);
      if (tab.dataset.track) {
        const tr = document.createElement('track');
        tr.kind = 'captions';
        tr.src = tab.dataset.track;
        tr.srclang = tab.dataset.trackLang || 'en';
        tr.label = tab.dataset.trackLabel || 'English';
        video.appendChild(tr);
      }
      video.load();
      if (title && tab.dataset.title) title.textContent = tab.dataset.title;
      if (desc && tab.dataset.desc) desc.textContent = tab.dataset.desc;
      if (link && tab.dataset.href) { link.href = tab.dataset.href; link.textContent = tab.dataset.linkText || link.textContent; }
      if (card && tab.dataset.app) card.dataset.app = tab.dataset.app;
    };
    group.addEventListener('click', (e) => { const t = e.target.closest('[role="tab"]'); if (t) select(t, false); });
    group.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in keys) { e.preventDefault(); select(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true); }
      if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
      if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
    });
  });

  /* ---------- Before / after slider ---------- */
  document.querySelectorAll('.ba').forEach((ba) => {
    const range = ba.querySelector('input[type="range"]');
    const set = (v) => ba.style.setProperty('--pos', `${v}%`);
    range?.addEventListener('input', () => set(range.value));
    set(range ? range.value : 50);
    const thumbs = document.querySelector(`[data-ba="${ba.id}"]`);
    thumbs?.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-before]');
      if (!b) return;
      ba.querySelector('.ba-before').src = b.dataset.before;
      ba.querySelector('.ba-after').src = b.dataset.after;
      ba.querySelector('.ba-after').alt = b.dataset.alt || '';
      const label = ba.querySelector('.ba-label--after');
      if (label) label.textContent = b.textContent.trim();
      thumbs.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      if (range) { range.value = 50; set(50); }
    });
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
