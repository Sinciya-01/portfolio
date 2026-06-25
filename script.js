/* ─── PORTFOLIO SCRIPT — Sinciya J ─── */

/* ── Typing Animation ── */
(function initTyping() {
  const el = document.getElementById('typedName');
  if (!el) return;

  const names = ['Sinciya J', 'a Developer', 'a Problem Solver', 'a CSE Student'];
  let nameIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseTimer = null;

  function type() {
    const current = names[nameIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        pauseTimer = setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        nameIdx = (nameIdx + 1) % names.length;
      }
    }
    setTimeout(type, deleting ? 60 : 110);
  }

  setTimeout(type, 600);
})();

/* ── Navbar: scroll effect + active link ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    // Scrolled class
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) a.style.color = '#a78bfa';
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile Hamburger ── */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Scroll Reveal ── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
})();

/* ── Skill Bar Animations ── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.style.getPropertyValue('--pct') || '0%';
        setTimeout(() => fill.classList.add('animated'), 900);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();

/* ── Back to Top ── */
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── Contact Form ── */
(function initForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      btn.disabled = false;
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 4000);
    }, 1200);
  });
})();

/* ── Project Card Tilt Effect ── */
(function initTilt() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform .1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .4s ease';
    });
  });
})();

/* ── Counter Animation for Stats ── */
(function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      const plus = raw.includes('+');
      const target = parseInt(raw);
      if (isNaN(target)) return;

      let current = 0;
      const duration = 1200;
      const step = duration / target;
      const timer = setInterval(() => {
        current++;
        el.textContent = current + (plus ? '+' : '');
        if (current >= target) clearInterval(timer);
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
})();

/* ── Smooth Scroll for all anchors ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
