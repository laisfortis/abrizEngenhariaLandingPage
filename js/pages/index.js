// Home — usa o layout compartilhado + o formulário de orçamento + o
// carrossel de fotos do card de Serviços.
import { initLayout } from '../layout.js';
import { initForms } from '../components/forms.js';
import { initCarousels } from '../components/carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  initForms();
  initCarousels();
});
