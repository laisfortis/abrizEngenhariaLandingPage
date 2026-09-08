// Portfólio — usa o layout compartilhado + o lightbox da galeria de obras.
import { initLayout } from '../layout.js';
import { initLightbox } from '../components/lightbox.js';

document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  initLightbox();
});
