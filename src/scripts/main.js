document.addEventListener('DOMContentLoaded', () => {
  // Scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });

  // Back to top
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile nav
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const body = document.body;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.classList.toggle('open');
      body.classList.toggle('menu-open');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        body.classList.remove('menu-open');
      });
    });
  }

  // Sticky header shadow
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Product filter (home & products page)
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.product-card').forEach((card) => {
        const name = card.dataset.category?.toLowerCase() || '';
        card.style.display = name.includes(query) ? '' : 'none';
      });
    });
  }

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    // Pre-fill product from URL
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    if (product) {
      const select = form.querySelector('#product');
      if (select) {
        for (const option of select.options) {
          if (option.value.toLowerCase() === product.toLowerCase()) {
            option.selected = true;
            break;
          }
        }
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const errors = [];

      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const phone = formData.get('phone')?.toString().trim();
      const message = formData.get('message')?.toString().trim();

      if (!name || name.length < 2) errors.push('Please enter your full name.');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
      if (!phone || phone.replace(/\D/g, '').length < 8) errors.push('Please enter a valid phone number.');
      if (!message || message.length < 10) errors.push('Please enter a message (at least 10 characters).');

      const errorEl = document.getElementById('form-errors');
      const successEl = document.getElementById('form-success');

      if (errors.length > 0) {
        if (errorEl) {
          errorEl.innerHTML = errors.map((e) => `<p>${e}</p>`).join('');
          errorEl.style.display = 'block';
        }
        if (successEl) successEl.style.display = 'none';
        return;
      }

      if (errorEl) errorEl.style.display = 'none';

      // Show success message (no backend connected yet)
      if (successEl) {
        successEl.style.display = 'block';
        successEl.innerHTML = '<p>Thank you for your enquiry. This form is not yet connected to a backend service. Please call <a href="tel:0434287537">0434 287 537</a> for immediate assistance.</p>';
      }
      form.reset();
    });
  }
});
