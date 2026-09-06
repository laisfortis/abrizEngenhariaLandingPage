// Lightbox do Portfólio
export function initLightbox() {
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
