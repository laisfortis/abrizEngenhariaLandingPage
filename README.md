# Abriz Engenharia — Landing Page

Site institucional da Abriz Engenharia, construído em **HTML + CSS + JavaScript puro** a partir do protótipo do Figma, 100% responsivo (mobile / tablet / desktop).

## Estrutura do projeto

```
├── index.html, sobre.html, contato.html, portfolio.html   → as 4 páginas do site
│
├── partials/            → header e footer, um arquivo cada — edite aqui e a
│   ├── header.html        mudança aparece em TODAS as páginas automaticamente,
│   └── footer.html        sem precisar rodar nenhum comando (é carregado por
│                           js/layout.js via fetch, ao abrir a página)
│
├── css/
│   ├── global.css         → tokens (cores/fontes/espaçamentos), reset, container,
│   │                        botões e utilitários realmente usados em várias páginas
│   ├── components/         → um arquivo por componente visual reutilizável
│   │   ├── header.css, footer.css, forms.css, combo-card.css, carousel.css,
│   │   └── trust-badges.css, obras-grid.css, lightbox.css
│   └── pages/              → um arquivo por página — SÓ o que é exclusivo dela.
│       ├── index.css        Cada um começa com @import do global.css + dos
│       ├── sobre.css        components/ que aquela página usa, então é só abrir
│       ├── contato.css      o arquivo da página pra ver tudo que ela carrega.
│       └── portfolio.css
│
├── js/
│   ├── layout.js           → injeta header/footer, menu mobile, link ativo do
│   │                          menu, ano do rodapé — compartilhado por todas as páginas
│   ├── components/          → um arquivo por comportamento reutilizável
│   │   ├── forms.js          (Web3Forms), carousel.js (carrossel de fotos),
│   │   └── lightbox.js       (popup do Portfólio)
│   └── pages/               → um arquivo por página, só importando o que ela usa
│       ├── index.js          (layout + forms + carousel)
│       ├── sobre.js          (só layout)
│       ├── contato.js        (layout + forms)
│       └── portfolio.js      (layout + lightbox)
│
└── assets/img/           → imagens do site
```

**Como editar o header ou o footer:** abra `partials/header.html` ou
`partials/footer.html`, edite e salve. Não precisa rodar nada — ao abrir
qualquer página (localmente ou já publicada), o `js/layout.js` busca esses
arquivos e insere o conteúdo automaticamente. Funciona igual em produção
(Vercel/Netlify) e localmente, desde que seja com um servidor (veja "Rodar
localmente" abaixo) — não funciona abrindo o `.html` direto no navegador
(protocolo `file://`), porque o navegador bloqueia esse tipo de busca sem
servidor.

**Como editar CSS/JS de uma página específica:** edite o arquivo correspondente
em `css/pages/` ou `js/pages/` — um ajuste ali nunca afeta as outras páginas.
Para mudar algo usado em mais de uma página (ex: o card de foto do Serviços),
edite o arquivo em `css/components/` ou `js/components/` correspondente.

## Design tokens extraídos do Figma

| Token | Valor |
|---|---|
| Amarelo (marca) | `#F6D143` |
| Cinza | `#585656` |
| Branco | `#FFFFFF` |
| Fonte | Sofia Sans (Light, Regular, Medium, Bold, ExtraBold, ExtraBlack Italic) |
| Botão | pill, altura 40px, borda 2px, raio 31px |
| Grid desktop | 12 colunas / largura 80 / gutter 30 |
| Grid mobile | 4 colunas / largura 70 / gutter 24 |

## Fotos

As fotos exportadas do Figma já estão aplicadas em `assets/img/`:

- `hero-bg.jpg` — foto do canteiro de obras, usada no hero de todas as páginas
- `servico-fachada.jpg` — foto do trabalho de revitalização de fachada, usada na seção "Nossos Serviços", na foto "Sobre nós", no card "Trabalhe conosco" e no lightbox do portfólio
- `logo-abriz.png` — logo real da marca (isolado do gráfico do hero via corte por canal alfa), usado no hero da Home e no rodapé de todas as páginas

**Ainda faltam** (o Figma original também usa placeholders genéricos nesses pontos, então não é urgente):
- Fotos de retrato de **Fernando Abriz** e **Sandro** (página Sobre Nós) — hoje são placeholders cinza.
- Fotos individuais de cada obra do **Portfólio** (hoje são blocos de cor, como no protótipo original) — se você tiver fotos de projetos específicos, exporte como `assets/img/obra-1.jpg` … `obra-9.jpg` e me envie que eu conecto no grid e no lightbox.

## Rodar localmente

Qualquer servidor estático funciona. Exemplo:

```bash
python3 -m http.server 8080
# depois abra http://localhost:8080
```

---

# Passo a passo: do GitHub ao ar no seu domínio Hostinger

## 1. GitHub (já configurado)

O site já está no repositório `laisfortis/abrizEngenhariaLandingPage`, na branch `main` — pronto para conectar no passo 2 abaixo.

## 2. Publicar com Vercel (recomendado — grátis, deploy automático a cada push)

1. Acesse **https://vercel.com** e clique em **Sign Up** → escolha **Continue with GitHub**.
2. No painel, clique em **Add New… → Project**.
3. Selecione o repositório `abrizengenharialandingpage` (autorize o acesso ao repo se pedido).
4. Em **Framework Preset**, deixe **Other** (site estático — não precisa de build command).
5. Clique em **Deploy**. Em ~30 segundos seu site estará no ar em uma URL tipo `abriz-engenharia.vercel.app`.
6. A partir de agora, **todo push para a branch principal atualiza o site automaticamente**.

> Alternativa equivalente: **Netlify** (netlify.com → "Add new site" → "Import an existing project" → GitHub → selecione o repo → Deploy). O restante do processo (DNS) é o mesmo, só muda os valores do CNAME/registro.

## 3. Conectar seu domínio da Hostinger ao Vercel

### 3.1 No Vercel
1. Abra o projeto → aba **Settings → Domains**.
2. Digite seu domínio (ex: `abrizengenharia.com.br`) → **Add**.
3. O Vercel vai mostrar os registros DNS que você precisa criar (normalmente um destes dois formatos):
   - **Registro A** para o domínio raiz (`@`) apontando para `76.76.21.21`
   - **Registro CNAME** para `www` apontando para `cname.vercel-dns.com`
   
   (Use exatamente os valores que o Vercel mostrar na tela — eles podem mudar.)

### 3.2 Na Hostinger
1. Faça login em **hpanel.hostinger.com**.
2. Vá em **Domínios** → selecione seu domínio → **DNS / Nameservers** → **Gerenciar registros DNS**.
3. Adicione os registros que o Vercel pediu:
   - Tipo `A`, Nome `@`, Aponta para `76.76.21.21`, TTL padrão.
   - Tipo `CNAME`, Nome `www`, Aponta para `cname.vercel-dns.com`, TTL padrão.
4. **Remova** (ou edite) qualquer registro `A`/`CNAME` antigo que aponte para a hospedagem padrão da Hostinger em `@` e `www`, para não conflitar.
5. Salve. A propagação de DNS pode levar de alguns minutos até 24h (geralmente é rápido, 10-30 min).

### 3.3 SSL (HTTPS)
Não precisa fazer nada — o Vercel emite e renova o certificado SSL automaticamente assim que o DNS propaga. Depois de propagado, acesse `https://seudominio.com.br` para confirmar o cadeado.

## 4. Verificar

- `https://seudominio.com.br` → deve abrir a Home do site.
- Teste em celular e desktop.
- Teste os formulários (por enquanto eles só mostram uma mensagem de confirmação — veja abaixo como conectar a um e-mail de verdade).

## 5. (Opcional) Formulários enviando e-mail de verdade

Os formulários hoje só validam e mostram "recebemos sua mensagem" (não há backend). Para receber os envios por e-mail sem programar um backend, a forma mais simples é:

1. Crie uma conta grátis em **https://formspree.io**.
2. Crie um formulário e copie a **action URL** (algo como `https://formspree.io/f/xxxxxxx`).
3. Em cada `<form data-form ...>` dos arquivos `.html`, adicione `action="COLE_A_URL_AQUI" method="POST"`.
4. Remova o `event.preventDefault()` do trecho correspondente em `js/components/forms.js` (função `handleSubmit`) **ou** siga a documentação do Formspree para envio via `fetch` mantendo a mensagem de confirmação customizada.

---

# ✅ Checklist para atualizar o site no futuro

1. Edite os arquivos `.html`, os partials (`partials/header.html`/`footer.html`) ou os CSS/JS em `css/` e `js/` localmente (ou peça para o Claude editar).
2. Teste localmente: `python3 -m http.server 8080`.
3. `git add .`
4. `git commit -m "descrição da mudança"`
5. `git push`
6. Pronto — o Vercel (ou Netlify) detecta o push e publica a nova versão automaticamente em ~1 minuto.
7. Confira em `https://seudominio.com.br`.

Não é necessário mexer em DNS ou Hostinger novamente depois da configuração inicial — só o passo do Git acima.
