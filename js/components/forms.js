// Formulários (orçamento, contato, trabalhe conosco) — envio real via
// Web3Forms (api.web3forms.com), sem precisar de backend próprio. As
// mensagens caem no e-mail contato@abrizengenharia.com.br.
const WEB3FORMS_ACCESS_KEY = '51680015-03f8-4214-b292-abaff0de5231';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export function initForms() {
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
