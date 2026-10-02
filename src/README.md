# Batista 3D — Portfólio & Cotação

Página única de portfólio (one-page) usada para apresentar o trabalho de design de joias
e modelagem 3D a contatos e clientes fora da região.

## Identidade

- **Marca:** Batista 3D (Wellington Batista) · Designer de Joias.
- **Logo** (wordmark dourado, PNG de fundo transparente, 1600x485):
  `https://user.uploads.dev/file/268b9a29b9a1481095ad6a5a55e626c7.png`
  Usado na barra do topo, no rodapé e no topo do hero (`PORTFOLIO.logo`).
  O nav/rodapé mostram **só a imagem** (o nome fica no `alt` + `aria-label`), sem texto duplicado.
- **Sem foto no bloco "Sobre".** `PORTFOLIO.sobreImagem.src` está **vazio** (o antigo emblema
  quadrado foi removido a pedido do designer). Com o campo vazio, o layout do "Sobre" vira
  coluna única automaticamente (`.about.single`) — ou seja, o texto ocupa a largura toda e
  nenhum quadro pontilhado aparece. Para voltar a ter uma imagem ali, basta preencher o `src`
  (ex.: uma foto do Wellington / do ateliê).

## Onde editar

Praticamente tudo vive em **um único objeto** no topo do `<script>` do `index.html`:

```
const DEMO = false;
const PORTFOLIO = { ... };
```

- `DEMO` — quando `true`, toda imagem com `src` ganha o selo **"imagem de exemplo"**.
  Está em `false` porque as imagens atuais são peças reais. Volte para `true` só se
  for colocar imagens de teste.
- `PORTFOLIO.marca` / `heroTitulo` / `cargo` — nome e posicionamento.
  `heroTitulo` é a manchete grande do hero (não repete o nome da logo).
- `PORTFOLIO.logo` — URL da logo (ver "Identidade"). Deixe vazio e o hero/nav ficam sem imagem.
- `PORTFOLIO.sobreImagem.src` — foto do bloco "Sobre". Vazio = o bloco vira coluna única,
  sem imagem e sem quadro pontilhado.
- `PORTFOLIO.whatsapp` — número no formato `55` + DDD + número, só dígitos (ex.: `5511987654321`).
- `PORTFOLIO.instagram` / `email` — sem o "@" no campo do Instagram.
- `PORTFOLIO.processo` — as 4 etapas (croqui, modelagem, protótipo, peça final).
  Deixe `img: ""` para exibir o quadro pontilhado "adicione sua imagem".
  `curto` é o rótulo que aparece na tira de miniaturas dentro da janela da peça.
- `PORTFOLIO.pecas` — a galeria. Cada peça tem `nome`, `material`, `texto`, `img` e `specs`.
- `PORTFOLIO.servicos` — títulos, textos, `prazo` e `preco`. **Os valores atuais são
  exemplos — confira antes de enviar pra qualquer pessoa.**
- `PORTFOLIO.videoUrl` — link do YouTube/Vimeo ou arquivo `.mp4`. Vazio mostra o aviso.
- `PORTFOLIO.cotacaoLead` / `mcTexto` — textos da seção de cotação e da calculadora.
- `heroMeta` — os três números da faixa do hero. Os itens com `key: "gold"` / `"silver"`
  são preenchidos automaticamente com a cotação ao vivo.

## Cotação e calculadora

A seção `#cotacao` traz o preço do ouro e da prata em R$/g em tempo real, com histórico
(1M / 3M / 6M) desenhado em canvas, e uma calculadora enxuta logo abaixo.

- Fontes de dados: `api.gold-api.com` (spot XAU/XAG em US$/oz), `open.er-api.com` (USD→BRL)
  e `query1.finance.yahoo.com` (histórico + câmbio). Tudo via `superFetch` (import no `main.pjs`).
- A última cotação fica em `localStorage` (`jwl_market`), então a página abre com número
  mesmo antes das APIs responderem.
- `TROY` = 31,1034768 (gramas por onça troy).
- A calculadora tem 3 opções de metal em `MC_PURITY`: `ouro24` (0,999), `ouro18` (0,75)
  e `prata` (1). O default é `ouro24` — ajuste `mcMetal` se quiser outro.
- O botão da calculadora abre o WhatsApp com o cálculo na mensagem, o que transforma
  quem usou a calculadora em lead.

## Imagens

As imagens do portfólio são **renders reais do designer**, hospedadas em `user.uploads.dev`
(as mesmas URLs que ele já usava no gerador antigo, `perchance.org/lrfcm9lfql`).
São 12 peças em `PORTFOLIO.pecas` (anéis, colar, choker, brincos, pulseira e abotoaduras),
escolhidas entre as ~56 do catálogo antigo por serem as de fundo escuro/luz de estúdio.

Ainda **pendentes** (aparecem como quadro pontilhado "adicione sua imagem"):

- `PORTFOLIO.processo[0]` — **croqui** (o desenho à mão/briefing).
- `PORTFOLIO.processo[1]` — **modelagem CAD** (print da tela modelando).
- `PORTFOLIO.videoUrl` — o vídeo do processo.

As etapas 03 (protótipo) e 04 (peça final) usam renders reais, mas o ideal é uma foto do
protótipo em resina na etapa 03.

Para trocar qualquer imagem: suba o arquivo na pasta `src/` deste gerador e use
`src/nome-da-foto.jpg`, ou cole qualquer URL pública.

Recomendado: imagens quadradas (1:1), mínimo 1000x1000, fundo escuro e luz quente —
é o padrão visual que a página espera. A primeira peça da lista (`pecas[0]`) também é
usada como imagem de fundo do hero, então mantenha uma peça forte no topo.

## Vídeo

Formatos aceitos em `videoUrl`: YouTube (watch/shorts/youtu.be), Vimeo e `.mp4` direto.
O embed é gerado automaticamente. O vídeo mais convincente é uma gravação de tela
modelando uma peça do zero, acelerada (60–90s).

## Estrutura

- `index.html` — página inteira: CSS, HTML das seções e o `<script>` que renderiza
  tudo a partir de `PORTFOLIO`. Sem dependências além das fontes do Google.
- `main.pjs` — apenas o `$meta` (título, descrição, imagem de compartilhamento, tags).
- Seções: hero, cotação + calculadora, sobre, processo (metodologia), portfólio (com
  janela/lightbox), vídeo, serviços e contato.

## Notas técnicas

- O CSS/JS do `index.html` não passa pelo templating quadrado do Perchance —
  só o texto em HTML puro. Evite colchetes em textos visíveis.
- O menu mobile é um overlay `position:fixed`. Ele NÃO pode ficar dentro de um
  ancestral com `backdrop-filter`/`transform`, senão o `inset:0` passa a ser
  relativo a esse ancestral (já aconteceu: a barra do topo engolia o menu).
  Por isso `.nav.solid` desliga o `backdrop-filter` no mobile.
- Selos de "imagem de exemplo" são posicionados em relação a `.card-media` /
  `.step-media` (que têm `position:relative`) — se criar novos contêineres de
  imagem, mantenha o `position:relative`.
- As animações de entrada usam IntersectionObserver com fallback por timeout.
