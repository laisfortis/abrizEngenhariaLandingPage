// ABRIZ ENGENHARIA — comportamento compartilhado do site

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initForms();
  initLightbox();
});

/* Menu mobile (hambúrguer) */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => links.classList.remove('is-open'));
  });
}

/* Formulários (orçamento, contato, trabalhe conosco) — sem backend próprio.
   Troque a função handleSubmit por uma chamada real (ex: Formspree, EmailJS,
   endpoint próprio) quando estiver pronto — veja o checklist no README. */
function initForms() {
  document.querySelectorAll('form[data-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      handleSubmit(form);
    });
  });
}

function handleSubmit(form) {
  const feedback = form.querySelector('.form-feedback');
  if (feedback) {
    feedback.textContent = 'Recebemos sua mensagem! Em breve entraremos em contato.';
    feedback.hidden = false;
  }
  form.reset();
}

/* Lightbox do Portfólio */
function initLightbox() {
  const items = document.querySelectorAll('[data-obra]');
  const lightbox = document.querySelector('.lightbox');
  if (!items.length || !lightbox) return;

  const titleEl = lightbox.querySelector('[data-lightbox-title]');
  const dateEl = lightbox.querySelector('[data-lightbox-date]');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');

  const obras = Array.from(items).map((el) => ({
    title: el.dataset.obra,
    date: el.dataset.data || '',
  }));
  let currentIndex = 0;

  function open(index) {
    currentIndex = (index + obras.length) % obras.length;
    titleEl.textContent = `Obra: ${obras[currentIndex].title}`;
    dateEl.textContent = `Data: ${obras[currentIndex].date}`;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  items.forEach((el, index) => {
    el.addEventListener('click', () => open(index));
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => open(currentIndex - 1));
  nextBtn?.addEventListener('click', () => open(currentIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') open(currentIndex - 1);
    if (event.key === 'ArrowRight') open(currentIndex + 1);
  });
}
