// Carrossel de fotos (card de Serviços na Home) — troca a foto ativa ao
// clicar nas setas; basta acrescentar mais <img class="servicos-card__img">
// dentro do [data-carousel] para adicionar novas fotos.
export function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.servicos-card__img'));
    if (slides.length < 2) return;

    let current = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (current === -1) current = 0;

    const show = (index) => {
      slides[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    };

    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => show(current - 1));
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => show(current + 1));
  });
}
