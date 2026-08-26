# Site — Lucas Müller

Site estático (HTML/CSS/JS) para divulgar e vender **palestras, treinamentos e consultoria
em planejamento estratégico**.

> **Site público.** Usa `<meta name="robots" content="index, follow">` — aparece no Google.
> Domínio de destino: **mullercapital.net** · Hospedagem: **GitHub Pages**

## Estrutura

```
site/
├── index.html                  # A PÁGINA. É esta que vai ao ar.
├── css/styles.css              # estilo (paleta navy/grafite + dourado)
├── js/main.js                  # menu, formulário, gráfico, lightbox
├── assets/                     # fotos e logo
├── CNAME                       # domínio personalizado (GitHub Pages lê este arquivo)
├── robots.txt                  # libera indexação + aponta o sitemap
├── sitemap.xml                 # ajuda o Google a achar a página
├── .nojekyll                   # GitHub serve os arquivos como estão
├── serve.ps1                   # servidor local para testar
└── lucas-muller-publico.html   # CÓPIA de arquivo único (para enviar por e-mail/WhatsApp)
```

**Importante:** `lucas-muller-publico.html` é uma cópia idêntica do site em um único arquivo
(CSS e JS embutidos). Serve para anexar em e-mail ou abrir sem internet. **Não é o arquivo
publicado** — quem vai ao ar é o `index.html`. Se editar o site, veja "Como regerar a cópia".

Arquivos antigos (design anterior, versão com a frase de convite, fotos originais em alta)
foram movidos para `../site-arquivo/` — fora desta pasta, para não subirem por engano.

---

## Como ver localmente antes de publicar

```powershell
# dentro da pasta site/
powershell -ExecutionPolicy Bypass -File serve.ps1
# acesse http://localhost:8080   (Ctrl+C para parar)
```

Abrir o `index.html` com duplo clique também funciona, mas o servidor local é mais fiel
ao que acontece na hospedagem.

---

## Publicar no GitHub Pages (passo a passo)

Há dois caminhos. **A Opção A não exige instalar nada** e é a recomendada para a
primeira publicação. A Opção B (Git) é mais prática para atualizar depois.

### 1. Criar a conta e o repositório no GitHub

1. Crie a conta em <https://github.com> (se ainda não tiver).
2. Clique em **New repository** (botão verde, ou o `+` no topo direito).
3. **Repository name:** `site` (ou `mullercapital`).
4. Visibilidade: **Public** — o GitHub Pages gratuito exige repositório público.
   Isso torna os *arquivos* visíveis; o site ficaria público de qualquer forma.
5. **Não** marque "Add a README file" — a pasta já tem um.
6. **Create repository**.

---

### Opção A — Upload pelo navegador (sem instalar nada)

Na página do repositório recém-criado:

1. Clique em **uploading an existing file** (link no meio da tela). Se o repositório
   já tiver arquivos, use **Add file → Upload files**.
2. Abra a pasta `site/` no Explorer, selecione **tudo** com `Ctrl+A` e arraste para
   a área de upload do navegador.
3. Espere as barras de progresso terminarem (as fotos demoram um pouco).
4. Em **Commit changes**, escreva `Primeira versão do site` e clique em
   **Commit changes**.

**Confira se o arquivo `.nojekyll` subiu.** O Windows esconde arquivos que começam
com ponto, então ele pode ficar de fora. Na lista de arquivos do repositório, se não
aparecer `.nojekyll`:

- Clique em **Add file → Create new file**
- Nome do arquivo: `.nojekyll` (deixe o conteúdo vazio)
- **Commit changes**

Mesma checagem vale para o `CNAME` — sem ele o domínio próprio não funciona.

---

### Opção B — Git (melhor para atualizar depois)

Instale o Git:

```powershell
winget install --id Git.Git -e
```

Feche e reabra o terminal. Configure sua identidade:

```powershell
git config --global user.name "Lucas Müller"
git config --global user.email "lucas11muller@gmail.com"
```

Dentro da pasta `site/`:

```powershell
git init
git add .
git commit -m "Primeira versão do site"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/site.git
git push -u origin main
```

Na primeira vez o Git abre o navegador pedindo login do GitHub — autorize.

---

### 2. Ligar o GitHub Pages

No repositório: **Settings → Pages**

- **Source:** `Deploy from a branch`
- **Branch:** `main` · **Folder:** `/ (root)` → **Save**

Em 1–2 minutos o site fica no ar em `https://SEU_USUARIO.github.io/site/`.

### 3. Apontar o domínio mullercapital.net (Squarespace)

#### 3a. Primeiro no GitHub

O arquivo `CNAME` já está na pasta com o domínio, então o GitHub deve detectá-lo sozinho.
Confirme em **Settings → Pages → Custom domain** que aparece `mullercapital.net`.
Se estiver vazio, digite `mullercapital.net` e clique em **Save**.

> A ordem importa: o GitHub recomenda cadastrar o domínio **antes** de mexer no DNS.

#### 3b. Depois no Squarespace

> ### ⚠️ NÃO APAGUE OS REGISTROS DE E-MAIL
> O endereço `lmuller@mullercapital.net` roda no **Google Workspace** e depende destes
> registros, que já existem no domínio:
>
> - **MX** → `aspmx.l.google.com`, `alt1`…`alt4.aspmx.l.google.com`
> - **TXT** → `v=spf1 include:_spf.google.com ~all`
>
> Se você apagar qualquer um deles, **seu e-mail para de funcionar**. Eles não têm
> nenhuma relação com o site — adicionar os registros A abaixo não os afeta.
>
> Antes de começar, tire um print da tela de DNS. Se algo quebrar, dá para voltar.

1. Acesse <https://account.squarespace.com/domains>
2. Clique no domínio **mullercapital.net**
3. No painel lateral, clique em **DNS**
4. Pode ser pedida a senha ou o código de dois fatores — confirme e clique em **Continue**

**Não há nada para remover.** Hoje o domínio não tem nenhum registro **A** na raiz nem
`www` configurado — ele simplesmente não aponta para nenhum site. Você só vai adicionar.

(Se por algum motivo aparecer um registro **A** com nome `@` apontando para
`198.185.159.x` / `198.49.23.x`, ou um **CNAME** `www` para `ext-cust.squarespace.com`,
são padrões do Squarespace e aí sim precisam ser apagados — eles conflitam com o GitHub.)

**Adicione os 4 registros A do GitHub.** Clique em **Add record** e preencha:

| Type | Name | Data              |
|------|------|-------------------|
| A    | @    | 185.199.108.153   |
| A    | @    | 185.199.109.153   |
| A    | @    | 185.199.110.153   |
| A    | @    | 185.199.111.153   |

Os quatro são obrigatórios — são servidores redundantes do GitHub, não alternativas.
Deixe o **TTL** no padrão (4 horas).

**Adicione 1 registro CNAME** para o `www`:

| Type  | Name | Data                    |
|-------|------|-------------------------|
| CNAME | www  | `SEU_USUARIO.github.io` |

Troque `SEU_USUARIO` pelo seu usuário do GitHub. É `usuario.github.io` — **sem** o nome
do repositório no final.

#### 3c. Ativar HTTPS

Volte em **Settings → Pages** no GitHub e marque **Enforce HTTPS**.
A opção fica cinza até o DNS propagar (normalmente minutos, às vezes até 24h).
O certificado é gratuito e automático.

### 4. Conferir se está no ar

- Abra `https://mullercapital.net` numa aba anônima (evita cache).
- Teste no celular.
- Cole o link no WhatsApp e veja se aparece título, descrição e foto.
- **Mande um e-mail de teste para `lmuller@mullercapital.net`** e confirme que chegou.

Se aparecer erro 404 logo depois de publicar, espere 2 minutos e recarregue —
o GitHub leva um instante para montar o site.

Para checar se o DNS já propagou, rode no PowerShell:

```powershell
Resolve-DnsName mullercapital.net -Type A
```

Deve responder com os quatro endereços `185.199.10x.153`. Enquanto aparecerem os
antigos (`198.185.x` do Squarespace), ainda não propagou — é só esperar.

---

## Publicar alterações depois

**Se usou a Opção A (navegador):** repita o *Add file → Upload files* com os arquivos
que mudaram. O GitHub substitui os antigos automaticamente.

**Se usou a Opção B (Git):** dentro da pasta `site/`:

```powershell
git add .
git commit -m "descrição da mudança"
git push
```

Nos dois casos o site atualiza sozinho em ~1 minuto. Se não vir a mudança,
force o recarregamento com `Ctrl+Shift+R`.

> **Nunca envie a pasta `../site-arquivo/`.** Ela está fora da pasta `site/` de
> propósito: guarda a versão antiga do site e a versão com a frase de convite.

---

## O que personalizar

### Fotos

Substitua os arquivos em `assets/` mantendo **exatamente** estes nomes:

| Arquivo                     | Foto                                        | Onde aparece             |
|-----------------------------|---------------------------------------------|--------------------------|
| `assets/lucas.jpg`          | Headshot profissional (retrato)             | Topo / hero + compartilhamento |
| `assets/palestra-office.jpg`| Palestra no escritório ("comprador B2B")    | Galeria (destaque)       |
| `assets/midia-globo.jpg`    | Entrevista na TV Globo                      | Galeria (selo "Na mídia")|
| `assets/palestra-fesp.jpg`  | Palestra na FESP                            | Galeria                  |
| `assets/palestra-3.jpg`     | Palestra para plateia                       | Galeria                  |
| `assets/palestra-4.jpg`     | Workshop in-company                         | Galeria                  |
| `assets/india-campo.jpg`    | Visita de campo na Índia                    | Galeria                  |
| `assets/muller-capital.png` | Logo Muller Capital                         | Rodapé                   |

As fotos já foram otimizadas para web (máx. 1600px de largura, ~1,2 MB no total).
Os originais em alta resolução estão em `../site-arquivo/assets-originais/`.
Se trocar alguma foto por uma muito grande (> 1 MB), reduza antes — o site fica mais lento.

Se um arquivo faltar, o site continua funcionando (no topo aparece um marcador "LM").

### Formulário de contato

O formulário envia via **Formspree**: a mensagem chega direto em
`lmuller@mullercapital.net` sem o visitante sair da página.

**Como está ligado:** a única coisa que define o destino é o `action` do formulário,
em `index.html`:

```html
<form class="contact-form" id="contact-form" action="https://formspree.io/f/xoeqajvz" method="POST">
```

O JavaScript decide sozinho o que fazer:

- `action` começando com `https://` → envia via AJAX e mostra a confirmação na página
- `action` começando com `mailto:` → abre o app de e-mail do visitante (modo antigo)

Para voltar ao modo antigo, é só trocar o `action` de volta para
`mailto:lmuller@mullercapital.net` (e devolver `method="post" enctype="text/plain"`).

**Plano gratuito do Formspree:** 50 mensagens por mês, formulários ilimitados,
filtro de spam e histórico de 30 dias no painel.

> ⚠️ No plano gratuito o painel guarda as mensagens por **apenas 30 dias**.
> O e-mail que você recebe é a cópia permanente — não apague.
> Passando de 50 mensagens/mês, o Formspree para de aceitar até virar o mês
> (planos pagos começam em US$ 10/mês para 1.000 mensagens).

**Proteção anti-spam:** o formulário tem um campo invisível (`_gotcha`) que pessoas não
veem e robôs preenchem. Se vier preenchido, a mensagem é descartada em silêncio.
O Formspree também reconhece esse nome de campo nativamente. **Não remova esse bloco.**

### Textos, preços e números

Está tudo em `index.html`, em português e fácil de localizar pelos comentários
(`<!-- ===== SERVIÇOS ===== -->`, etc.).

---

## Como regerar a cópia de arquivo único

Depois de editar `index.html`, `css/styles.css` ou `js/main.js`, rode isto na pasta `site/`
para atualizar o `lucas-muller-publico.html`:

```powershell
$root = $PWD.Path
$utf8 = New-Object System.Text.UTF8Encoding($false)
$html = [System.IO.File]::ReadAllText("$root\index.html", [System.Text.Encoding]::UTF8)
$css  = [System.IO.File]::ReadAllText("$root\css\styles.css", [System.Text.Encoding]::UTF8)
$js   = [System.IO.File]::ReadAllText("$root\js\main.js", [System.Text.Encoding]::UTF8)
$html = $html.Replace('<link rel="stylesheet" href="css/styles.css" />', "<style>`n$css`n  </style>")
$html = $html.Replace('<script src="js/main.js"></script>', "<script>`n$js`n  </script>")
[System.IO.File]::WriteAllText("$root\lucas-muller-publico.html", $html, $utf8)
```

---

## Depois de publicar

- **Google Search Console** (<https://search.google.com/search-console>): adicione
  `mullercapital.net`, valide a propriedade e envie `https://mullercapital.net/sitemap.xml`.
  Acelera bastante o aparecimento no Google.
- **Teste o compartilhamento**: cole o link no WhatsApp/LinkedIn e confirme que aparece
  título, descrição e a foto.
- **Teste no celular** — mais da metade das visitas virá de lá.

## Contato configurado no site

- E-mail: lmuller@mullercapital.net
- WhatsApp: +55 41 98411 7807
- LinkedIn: linkedin.com/in/losmuller
