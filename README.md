# Abriz Engenharia — Landing Page

Site institucional da Abriz Engenharia: **HTML + CSS + JavaScript puro** (sem framework, sem build step), 100% responsivo (mobile / tablet / desktop). 4 páginas: Home, Sobre nós, Portfólio e Contato.

## Índice

1. [Como abrir o projeto na sua máquina](#1-como-abrir-o-projeto-na-sua-máquina)
2. [Estrutura de pastas](#2-estrutura-de-pastas)
3. [Como o site funciona](#3-como-o-site-funciona)
4. [Como editar coisas comuns](#4-como-editar-coisas-comuns)
5. [Design tokens extraídos do Figma](#5-design-tokens-extraídos-do-figma)
6. [Imagens (assets/img)](#6-imagens-assetsimg)
7. [Formulários](#7-formulários)
8. [Publicar no ar (Vercel + domínio Hostinger)](#8-publicar-no-ar-vercel--domínio-hostinger)
9. [Checklist rápido pra atualizar o site já publicado](#9-checklist-rápido-pra-atualizar-o-site-já-publicado)

---

## 1. Como abrir o projeto na sua máquina

O site **não pode** ser aberto dando duplo clique no `.html` — o navegador bloqueia, por segurança, o carregamento do header/footer e dos módulos JavaScript quando o arquivo é aberto direto do disco (protocolo `file://`). Ele precisa ser servido por um servidor local, mesmo que simples.

### Opção recomendada: Live Server (VS Code)

1. No VS Code, abra a aba **Extensions** (ícone de blocos na barra lateral) e instale **"Live Server"** (autor: Ritwick Dey).
2. Clique com o botão direito em `index.html` no explorador de arquivos → **"Open with Live Server"**.
3. O navegador abre sozinho em algo como `http://127.0.0.1:5500/index.html`. A partir daí tudo funciona igual à versão publicada — e ao salvar qualquer arquivo, a página recarrega sozinha.

### Alternativa: Python

Se preferir linha de comando e tiver Python instalado:

```bash
python -m http.server 8080
# depois abra http://localhost:8080/index.html
```

(No Mac/Linux geralmente é `python3` em vez de `python`.)

---

## 2. Estrutura de pastas

```
index.html, sobre.html, contato.html, portfolio.html   → as 4 páginas do site

partials/                → header e footer do site inteiro, um arquivo cada
  header.html
  footer.html

css/
  global.css              → tokens, reset, tipografia, container, botões e
                             utilitários realmente usados em várias páginas
  components/             → um arquivo por componente visual reutilizável
    header.css, footer.css, forms.css, combo-card.css, carousel.css,
    trust-badges.css, obras-grid.css, lightbox.css
  pages/                  → um arquivo por página, só com o que é exclusivo dela
    index.css, sobre.css, contato.css, portfolio.css

js/
  layout.js               → injeta header/footer, menu mobile, link ativo do
                             menu, ano do rodapé — usado por todas as páginas
  components/              → um arquivo por comportamento reutilizável
    forms.js, carousel.js, lightbox.js
  pages/                  → um arquivo por página, entry point que decide o
                             que aquela página carrega
    index.js, sobre.js, contato.js, portfolio.js

assets/img/               → todas as imagens do site
```

---

## 3. Como o site funciona

### Sem build step

Não existe `npm install`, `npm run build` nem nada parecido — os arquivos `.html`, `.css` e `.js` do repositório são exatamente os arquivos que o navegador recebe. Isso também é o que a Vercel/Netlify publica: elas só servem os arquivos como estão, sem processar nada.

### Header e footer (um arquivo, todas as páginas)

Em cada página, o header e o footer são só uma casca vazia esperando conteúdo:

```html
<header class="site-header">
  <div class="container" data-header></div>
</header>
...
<footer class="site-footer" data-footer></footer>
```

Quando a página carrega, `js/layout.js` busca `partials/header.html` e `partials/footer.html` e insere o conteúdo de cada um dentro do elemento com `data-header`/`data-footer`. Por isso:

- **Editar o menu ou o rodapé é editar um arquivo só** (`partials/header.html` ou `partials/footer.html`) — a mudança aparece em todas as 4 páginas.
- Isso só funciona servido por HTTP (seção 1 acima) — não funciona abrindo o `.html` direto.
- `layout.js` também calcula sozinho qual link do menu fica sublinhado (comparando a URL atual com o `href` de cada link) e preenche o ano do rodapé — nenhuma página precisa mais disso escrito à mão.

### CSS: global → components → pages

Cada página carrega **um único arquivo CSS** (ex: `<link rel="stylesheet" href="css/pages/index.css">`). Esse arquivo, por sua vez, começa importando tudo que a página precisa:

```css
/* topo de css/pages/index.css */
@import url('../global.css');
@import url('../components/header.css');
@import url('../components/footer.css');
@import url('../components/combo-card.css');
@import url('../components/forms.css');
@import url('../components/carousel.css');
@import url('../components/trust-badges.css');
@import url('../components/obras-grid.css');

/* daqui pra baixo: só regras exclusivas da Home */
.hero { ... }
```

Ou seja: abrindo `css/pages/index.css` você vê, logo no topo, **tudo que a Home usa** — e o resto do arquivo é só o CSS que não existe em nenhuma outra página. A ordem dos `@import` importa (o que vem depois pode sobrescrever o que vem antes), então ao adicionar um novo `@import` prefira colocá-lo perto dos outros, no topo.

Regra de decisão de onde um estilo novo deve morar:
- Usado em **1 página só** → vai no arquivo daquela página (`css/pages/`).
- Usado em **mais de uma página** → vira (ou entra em) um componente (`css/components/`).
- É token/cor/fonte/espaçamento/botão genérico do site inteiro → `css/global.css`.

### JavaScript: módulos ES, um entry point por página

Cada página carrega um único script:

```html
<script type="module" src="js/pages/index.js"></script>
```

E esse arquivo importa só o que aquela página usa:

```js
// js/pages/index.js
import { initLayout } from '../layout.js';
import { initForms } from '../components/forms.js';
import { initCarousels } from '../components/carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  initForms();
  initCarousels();
});
```

`sobre.js`, por exemplo, só importa `initLayout` — a página não baixa nem executa o código de formulário/carrossel/lightbox à toa. Se um dia a página Sobre nós ganhar um formulário, é só editar `js/pages/sobre.js` e importar `initForms` de `js/components/forms.js`.

### Convenções de `data-*` (ganchos entre HTML e JS)

O JS nunca depende de classes visuais (`class="btn"` etc.) pra saber o que fazer — ele procura atributos `data-*`, que servem só como gancho:

| Atributo | Onde aparece | Pra que serve |
|---|---|---|
| `data-header` / `data-footer` | header/footer de cada página | onde `layout.js` injeta os partials |
| `data-footer-year` | dentro do partial do footer | onde `layout.js` escreve o ano atual |
| `data-form` | `<form>` | marca o formulário pro `forms.js` interceptar o envio |
| `data-carousel` | div que envolve as fotos do card de Serviços | marca o carrossel pro `carousel.js` controlar |
| `data-carousel-prev` / `data-carousel-next` | botões de seta do carrossel | qual botão volta/avança a foto |
| `data-obra` / `data-data` | itens do grid de obras (Portfólio) | título e data que aparecem no lightbox ao clicar |
| `data-lightbox-title` / `data-lightbox-date` | dentro do popup do lightbox | onde o título/data são escritos |

---

## 4. Como editar coisas comuns

| Quero mudar... | Edito... |
|---|---|
| Menu (links, botão "Solicite um orçamento") | `partials/header.html` |
| Rodapé (endereço, redes sociais, links) | `partials/footer.html` |
| Cor, fonte, espaçamento usado no site inteiro | `css/global.css` |
| Algo do card de foto do Serviços/Orçamento/Sobre | `css/components/combo-card.css` |
| Algo do carrossel de fotos | `css/components/carousel.css` + `js/components/carousel.js` |
| Algo do popup do Portfólio | `css/components/lightbox.css` + `js/components/lightbox.js` |
| Algo dos formulários (Home, Contato) | `css/components/forms.css` + `js/components/forms.js` |
| Layout específico de UMA página | `css/pages/<nome>.css` |
| Conteúdo/texto/imagens de uma página | o próprio `<nome>.html` |

---

## 5. Design tokens extraídos do Figma

| Token | Valor |
|---|---|
| Amarelo (marca) | `#F6D143` |
| Cinza | `#585656` |
| Branco | `#FFFFFF` |
| Fonte | Sofia Sans (Light, Regular, Medium, Bold, ExtraBold, ExtraBlack Italic) |
| Botão | pill, altura 40px, borda 2px, raio 31px |
| Grid desktop | 12 colunas / largura 80 / gutter 30 |
| Grid mobile | 4 colunas / largura 70 / gutter 24 |

Todos ficam definidos como variáveis CSS (`--color-yellow`, `--font`, etc.) no topo de `css/global.css`.

---

## 6. Imagens (`assets/img`)

| Arquivo | Onde é usado |
|---|---|
| `hero-bg.jpg` | fundo do hero da Home |
| `logo-abriz.png` | logo no hero da Home e no rodapé (todas as páginas) |
| `servico-fachada.jpg`, `servico-fachada-orcamento.jpg` | carrossel do card "Nossos Serviços" e foto do card "Orçamento" (Home) |
| `img-sobre-nos.png` | foto da seção de introdução do Sobre nós |
| `missao-icon.png`, `visao-icon.png`, `valores-icon.png` | ícones dos 3 cards de Missão/Visão/Valores (Sobre nós) |
| `icon-truck.png`, `icon-badge.png`, `icon-city.png` | ícones da barra "Rapidez / Confiança / +anos no mercado" (Home) |
| `chevron-gray-right.png`, `chevron-yellow-right.png`, `chevron-yellow-tall.png` | listras decorativas de fundo das seções |

**Sem uso encontrado hoje** (mantidos no repositório por precaução, não removidos): `Mask group.png`, `logo-footer.png`, `logo-footer-white.png`. Se confirmar que não são necessários, posso removê-los.

Fotos individuais de cada obra do **Portfólio** ainda não existem (hoje são blocos de cor, como no protótipo original) — se você tiver fotos de projetos específicos, exporte como `assets/img/obra-1.jpg` … `obra-9.jpg` e me envie que eu conecto no grid e no lightbox.

---

## 7. Formulários

Os 3 formulários do site (Orçamento na Home, Orçamento no Contato, Trabalhe conosco no Contato) enviam de verdade por e-mail via **Web3Forms** (`api.web3forms.com`), sem precisar de backend próprio — a lógica toda está em `js/components/forms.js`. As mensagens caem em `contato@abrizengenharia.com.br`.

Pra trocar o e-mail de destino ou a chave de acesso, é preciso gerar uma nova chave em [web3forms.com](https://web3forms.com) e trocar o valor de `WEB3FORMS_ACCESS_KEY` no topo de `js/components/forms.js`.

Cada formulário também tem um botão "ou Solicitar pelo WhatsApp" abaixo do Enviar, que abre uma conversa já com uma mensagem pronta.

---

## 8. Publicar no ar (Vercel + domínio Hostinger)

### 8.1 GitHub (já configurado)

O site já está no repositório `laisfortis/abrizEngenhariaLandingPage`.

### 8.2 Publicar com Vercel (recomendado — grátis, deploy automático a cada push)

1. Acesse **https://vercel.com** e clique em **Sign Up** → escolha **Continue with GitHub**.
2. No painel, clique em **Add New… → Project**.
3. Selecione o repositório `abrizengenharialandingpage` (autorize o acesso ao repo se pedido).
4. Em **Framework Preset**, deixe **Other** (site estático — não precisa de build command).
5. Clique em **Deploy**. Em ~30 segundos seu site estará no ar em uma URL tipo `abriz-engenharia.vercel.app`.
6. A partir de agora, **todo push para a branch principal atualiza o site automaticamente**.

> Alternativa equivalente: **Netlify** (netlify.com → "Add new site" → "Import an existing project" → GitHub → selecione o repo → Deploy). O restante do processo (DNS) é o mesmo, só muda os valores do CNAME/registro.

### 8.3 Conectar seu domínio da Hostinger ao Vercel

**No Vercel:**
1. Abra o projeto → aba **Settings → Domains**.
2. Digite seu domínio (ex: `abrizengenharia.com.br`) → **Add**.
3. O Vercel vai mostrar os registros DNS que você precisa criar (normalmente):
   - **Registro A** para o domínio raiz (`@`) apontando para `76.76.21.21`
   - **Registro CNAME** para `www` apontando para `cname.vercel-dns.com`

   (Use exatamente os valores que o Vercel mostrar na tela — eles podem mudar.)

**Na Hostinger:**
1. Faça login em **hpanel.hostinger.com**.
2. Vá em **Domínios** → selecione seu domínio → **DNS / Nameservers** → **Gerenciar registros DNS**.
3. Adicione os registros que o Vercel pediu (tipo `A` e `CNAME`, conforme acima).
4. **Remova** (ou edite) qualquer registro `A`/`CNAME` antigo que aponte para a hospedagem padrão da Hostinger em `@` e `www`, para não conflitar.
5. Salve. A propagação de DNS pode levar de alguns minutos até 24h (geralmente é rápido, 10-30 min).

**SSL (HTTPS):** não precisa fazer nada — o Vercel emite e renova o certificado automaticamente assim que o DNS propaga.

### 8.4 Verificar

- `https://seudominio.com.br` → deve abrir a Home do site.
- Teste em celular e desktop.
- Teste os formulários — a mensagem de confirmação deve aparecer e o e-mail deve chegar em `contato@abrizengenharia.com.br`.

---

## 9. Checklist rápido pra atualizar o site já publicado

1. Edite os arquivos localmente (ou peça para o Claude editar) e confira com o Live Server (seção 1).
2. `git add .`
3. `git commit -m "descrição da mudança"`
4. `git push`
5. Pronto — a Vercel (ou Netlify) detecta o push e publica a nova versão automaticamente em ~1 minuto.
6. Confira em `https://seudominio.com.br`.

Não é necessário mexer em DNS ou Hostinger de novo depois da configuração inicial — só o passo do Git acima.
