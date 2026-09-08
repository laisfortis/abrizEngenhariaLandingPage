// ABRIZ ENGENHARIA — layout compartilhado (header + footer)
// Editar partials/header.html ou partials/footer.html reflete em todas as
// páginas automaticamente — não precisa rodar nenhum comando, só dar refresh.

const HEADER_URL = 'partials/header.html';
const FOOTER_URL = 'partials/footer.html';

export async function initLayout() {
  await Promise.all([injectHeader(), injectFooter()]);
}

async function fetchPartial(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha ao carregar ${url}: ${response.status}`);
  return response.text();
}

async function injectHeader() {
  const mount = document.querySelector('[data-header]');
  if (!mount) return;
  try {
    mount.innerHTML = await fetchPartial(HEADER_URL);
  } catch (error) {
    console.error(error);
    return;
  }
  markActiveLink(mount);
  initNavToggle(mount);
}

async function injectFooter() {
  const mount = document.querySelector('[data-footer]');
  if (!mount) return;
  try {
    mount.innerHTML = await fetchPartial(FOOTER_URL);
  } catch (error) {
    console.error(error);
    return;
  }
  const yearEl = mount.querySelector('[data-footer-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* marca is-active no link do menu correspondente à página atual — os links
   com âncora (ex: index.html#servicos) e o botão "Solicite um orçamento"
   nunca ficam ativos, igual ao comportamento anterior fixo no HTML de cada
   página */
function markActiveLink(header) {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  header.querySelectorAll('.nav-links a:not(.btn)').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href && !href.includes('#') && href === currentPage) {
      link.classList.add('is-active');
    }
  });
}

/* Menu mobile (hambúrguer) */
function initNavToggle(header) {
  const toggle = header.querySelector('.nav-toggle');
  const links = header.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => links.classList.remove('is-open'));
  });
}
