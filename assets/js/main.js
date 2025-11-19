(() => {
  const body = document.body;
  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');

  const closeNav = () => {
    nav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-open');
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open');
    const expanded = isOpen ? 'true' : 'false';
    navToggle.setAttribute('aria-expanded', expanded);
    body.classList.toggle('nav-open', Boolean(isOpen));
  });

  const scrollLinks = document.querySelectorAll('[data-scroll]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  scrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) {
        return;
      }
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      closeNav();
    });
  });

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  };

  window.addEventListener('scroll', setHeaderState);
  setHeaderState();

  const sections = document.querySelectorAll('main section[id]');
  const navMap = new Map();

  scrollLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      navMap.set(href.slice(1), link);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = navMap.get(entry.target.id);
          if (!link) return;
          scrollLinks.forEach((item) => item.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.25,
    }
  );

  sections.forEach((section) => observer.observe(section));

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) {
      closeNav();
    }
  });

  // Native lazy loading handles image visibility automatically
  // No additional JavaScript needed for lazy loading
})();

