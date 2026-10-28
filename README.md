# Instituto Raízes do Bairro

Plataforma web de uma ONG fictícia de hortas comunitárias, desenvolvida totalmente para um projeto academico. Feito pela dupla de Universinatários João Pedro e Biatriz Xavier

## Páginas

- `index.html`: apresentação da organização (missão, visão, valores, história, equipe, transparência) e contato.
- `projetos.html`: projetos sociais, voluntariado e formas de doação.
- `guia-de-estilo.html`: design system (cores, tipografia, espaçamento, grid e componentes).
- `cadastro.html`: formulário de cadastro com validação nativa HTML5 e máscaras de CPF, telefone e CEP.

## Estrutura de pastas

```
ong-raizes/
├── index.html
├── projetos.html
├── cadastro.html
├── guia-de-estilo.html
├── css/
│   ├── main.css              (importa todos os módulos)
│   ├── base/                 tokens.css, reset.css, tipografia.css
│   ├── layout/               pagina.css, grid.css, conteudo.css
│   └── components/           navegacao, botoes, cartoes, formularios, feedback, badges, guia
├── js/
│   ├── menu.js               hambúrguer e dropdown
│   ├── ui.js                 toasts, modals, alerts e validação visual
│   └── mascaras.js
└── imagens/
```

## Entrega II — CSS3

- **Design system** (`css/base/tokens.css`): 16 cores (primárias, secundárias, neutras e de feedback), 6 tamanhos de fonte, escala de espaçamento 8/16/24/32/48/64px.
- **Layout**: CSS Grid na estrutura da página (topo/principal/rodapé) e nos blocos; Flexbox nos componentes; grid customizado de 12 colunas (`.grid`, `.col-*`, `.col-md-*`, `.col-lg-*`).
- **Breakpoints**: 30em, 48em, 64em, 80em e 96em (480, 768, 1024, 1280 e 1536px).
- **Navegação**: menu com submenu dropdown (desktop) e menu hambúrguer (mobile), acessível por teclado (Esc fecha).
- **Componentes**: cards, botões (hover, focus, active, disabled), formulário com validação visual, alerts, toasts, modals (`<dialog>`), badges e tags.

## Recursos aplicados

- HTML5 semântico: `header`, `nav`, `main`, `section`, `article`, `figure`, `address`, `footer`, hierarquia de títulos h1 → h2 → h3.
- Formulário com `fieldset`/`legend`, tipos `email`, `tel`, `date`, `select`, `radio`, `checkbox` e atributos `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`.
- Imagens otimizadas em WebP e JPG com `<picture>`, `srcset` e `loading="lazy"`.
- Layout responsivo mobile-first com breakpoints em 48em (tablet) e 64em (desktop).
- Acessibilidade: link "pular para o conteúdo", foco visível, textos alternativos, `aria-current` no menu.

## Validação

Os três arquivos HTML foram validados sem erros no W3C Nu HTML Checker (https://validator.w3.org/nu/).

## Notas importantes sobre o protótipo (Entrega II)

- Este projeto é **front-end estático**: não existe API, banco de dados, autenticação, armazenamento ou processamento de doações.
- O formulário valida e apresenta feedback localmente, **sem transmitir dados pessoais**. Use informações fictícias nos testes.
- A ONG, os indicadores e os valores de campanha são fictícios, apenas para fins didáticos. Não há chave Pix válida.
- Execute abrindo `index.html` no navegador; para testar via servidor local, use `python -m http.server 8000` dentro da pasta.
- Pontos de verificação: menu hambúrguer e dropdown (teclado e toque), cinco larguras (480/768/1024/1280/1536px), cards, estados dos botões, campos inválidos, diálogo, toast e redução de movimento.
- Estrutura CSS: `base` (tokens, reset, tipografia), `layout` (página, grid 12 colunas, conteúdo), `components` (navegação, formulários, cartões, botões, feedback, badges, guia e refinamentos).
