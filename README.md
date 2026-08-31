# Abriz Engenharia — Landing Page

Site institucional da Abriz Engenharia, construído em **HTML + CSS + JavaScript puro** a partir do protótipo do Figma, 100% responsivo (mobile / tablet / desktop).

## Estrutura do projeto

```
├── index.html          → Home (hero, serviços, orçamento, prévia de obras)
├── sobre.html           → Sobre nós (equipe, números, depoimentos)
├── portfolio.html        → Portfólio (grade de obras + lightbox)
├── contato.html          → Contato (orçamento + trabalhe conosco)
├── css/style.css        → Todo o design system (cores, tipografia, componentes)
├── js/main.js           → Menu mobile, formulários, lightbox do portfólio
└── assets/              → Pasta reservada para imagens (img/ e icons/)
```

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
4. Remova o `event.preventDefault()` do trecho correspondente em `js/main.js` (função `handleSubmit`) **ou** siga a documentação do Formspree para envio via `fetch` mantendo a mensagem de confirmação customizada.

---

# ✅ Checklist para atualizar o site no futuro

1. Edite os arquivos `.html` / `css/style.css` / `js/main.js` localmente (ou peça para o Claude editar).
2. Teste localmente: `python3 -m http.server 8080`.
3. `git add .`
4. `git commit -m "descrição da mudança"`
5. `git push`
6. Pronto — o Vercel (ou Netlify) detecta o push e publica a nova versão automaticamente em ~1 minuto.
7. Confira em `https://seudominio.com.br`.

Não é necessário mexer em DNS ou Hostinger novamente depois da configuração inicial — só o passo do Git acima.
