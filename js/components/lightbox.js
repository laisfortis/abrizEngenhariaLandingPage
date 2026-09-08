// Lightbox do Portfólio
export function initLightbox() {
  const items = document.querySelectorAll('[data-obra]');
  const lightbox = document.querySelector('.lightbox');
  if (!items.length || !lightbox) return;

  const photoEl = lightbox.querySelector('.lightbox__photo img');
  const titleEl = lightbox.querySelector('[data-lightbox-title]');
  const dateEl = lightbox.querySelector('[data-lightbox-date]');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');

  // cada item pode indicar uma foto própria pro lightbox via data-img;
  // sem isso, usa a mesma foto que já aparece na miniatura do grid
  const obras = Array.from(items).map((el) => ({
    title: el.dataset.obra,
    date: el.dataset.data || '',
    img: el.dataset.img || el.querySelector('img')?.getAttribute('src') || '',
  }));
  let currentIndex = 0;

  function open(index) {
    currentIndex = (index + obras.length) % obras.length;
    const obra = obras[currentIndex];
    titleEl.textContent = `Obra: ${obra.title}`;
    dateEl.textContent = `Data: ${obra.date}`;
    if (photoEl && obra.img) {
      photoEl.src = obra.img;
      photoEl.alt = `Foto da obra ${obra.title}`;
    }
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
