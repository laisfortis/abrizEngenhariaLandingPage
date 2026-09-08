// Carrossel de fotos (card de Serviços na Home) — troca a foto ativa ao
// clicar nas setas; basta acrescentar mais <img class="servicos-card__img">
// dentro do [data-carousel] para adicionar novas fotos. Cada <img> pode
// ter seu próprio data-tag (o texto do cardzinho amarelo) — se não tiver,
// o cardzinho mantém o texto que já estava fixo no HTML.
export function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.servicos-card__img'));
    if (slides.length < 2) return;

    const tagEl = carousel.closest('.servicos-card')?.querySelector('.servicos-card__tag');

    let current = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (current === -1) current = 0;

    const updateTag = () => {
      const tag = slides[current].dataset.tag;
      if (tagEl && tag) tagEl.innerHTML = tag;
    };

    const show = (index) => {
      slides[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      updateTag();
    };

    updateTag();

    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => show(current - 1));
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => show(current + 1));
  });
}
