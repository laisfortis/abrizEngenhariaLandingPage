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

/* Formulários (orçamento, contato, trabalhe conosco) — envio real via
   Web3Forms (api.web3forms.com), sem precisar de backend próprio. As
   mensagens caem no e-mail contato@abrizengenharia.com.br. */
const WEB3FORMS_ACCESS_KEY = '51680015-03f8-4214-b292-abaff0de5231';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function initForms() {
  document.querySelectorAll('form[data-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      handleSubmit(form);
    });
  });
}

async function handleSubmit(form) {
  const feedback = form.querySelector('.form-feedback');
  const submitBtn = form.querySelector('button[type="submit"]');

  const showFeedback = (text) => {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.hidden = false;
  };

  const formData = new FormData(form);
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);

  if (submitBtn) submitBtn.disabled = true;
  showFeedback('Enviando...');

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      showFeedback('Recebemos sua mensagem! Em breve entraremos em contato.');
      form.reset();
    } else {
      showFeedback('Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.');
    }
  } catch (error) {
    showFeedback('Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
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
