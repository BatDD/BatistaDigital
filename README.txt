BATISTA.DIGITAL — EXPORTAÇÃO DO SITE
===================================

Este pacote contém o código-fonte completo do site Batista.Digital
(gerado no Perchance: https://perchance.org/batista.digital).

Conteúdo:
  index.html            — HTML completo da página
  src/styles.css        — todas as folhas de estilo (CSS)
  src/app.js            — lógica principal do site (JavaScript)
  src/admin.js          — painel administrativo (JavaScript)
  src/export.js         — função de exportação do site (JavaScript)
  main.pjs              — código-fonte Perchance (imports de plugins)
  data/content.json     — backup do conteúdo atual (textos, cores, logo, etc.)
  README.txt            — este arquivo

Observações:
  • Para publicar em outro servidor, basta abrir index.html (ou hospedar
    a pasta inteira em qualquer servidor estático).
  • O conteúdo exibido vem de data/content.json e também do Perchance
    (storage local). Para restaurar o conteúdo, use o painel admin:
    Painel Admin → Backup & Restauração → selecione o content.json.
  • O painel administrativo fica em https://perchance.org/batista.digital#admin
    (gerenciar: textos, serviços, portfólio, blog, cores, etc.).
  • Dica oculta: clique 10x na logo do rodapé para baixar esta exportação.
