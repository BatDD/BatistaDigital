const SITE_INDEX_HTML = "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap\" rel=\"stylesheet\">\n<link rel=\"stylesheet\" href=\"src/styles.css\">\n<link rel=\"icon\" id=\"favicon\" href=\"https://user.uploads.dev/file/ad17ae99c92a0ede2e34f7487f90876e.jpg\">\n<a href=\"#\" id=\"waFloatBtn\" class=\"wa-float-btn\" aria-label=\"WhatsApp\">\n  <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" width=\"28\" height=\"28\"><path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z\"/></svg>\n</a>\n\n<nav id=\"mainNav\">\n  <div id=\"navLogo\" onclick=\"location.hash=''\">Batista.Digital</div>\n  <div id=\"navMenu\">\n    <a href=\"#about\">Sobre</a>\n    <a href=\"#services\">Serviços</a>\n    <a href=\"#portfolio\">Portfólio</a>\n    <a href=\"#blog\">Blog</a>\n    <a href=\"#faq\">FAQ</a>\n    <a href=\"#contact\" class=\"nav-cta\">Solicitar Orçamento</a>\n  </div>\n  <button id=\"navToggle\">☰</button>\n</nav>\n\n<div id=\"mainPage\">\n  <section id=\"hero\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\" id=\"heroBadge\"></div>\n      <h1 id=\"heroTitle\"></h1>\n      <p id=\"heroSubtitle\"></p>\n      <div class=\"hero-buttons\">\n        <a href=\"#contact\" class=\"btn btn-primary\">Solicitar Orçamento</a>\n        <a href=\"#portfolio\" class=\"btn btn-outline\">Ver Portfólio</a>\n      </div>\n    </div>\n    <div class=\"hero-scroll\">↓</div>\n  </section>\n\n  <section id=\"stats\">\n    <div id=\"statsGrid\"></div>\n  </section>\n\n  <section id=\"services\">\n    <div class=\"container\">\n      <div class=\"section-header\">\n        <span class=\"section-tag\">Nossos Serviços</span>\n        <h2 class=\"section-title\">Soluções Digitais Completas</h2>\n        <p class=\"section-subtitle\">Tudo o que sua marca precisa para crescer no ambiente digital, em um só lugar.</p>\n      </div>\n      <div id=\"servicesGrid\"></div>\n    </div>\n  </section>\n\n  <section id=\"process\">\n    <div class=\"container\">\n      <div class=\"section-header\">\n        <span class=\"section-tag\">Como Funciona</span>\n        <h2 class=\"section-title\">Nosso Processo</h2>\n        <p class=\"section-subtitle\">Do primeiro contato ao suporte contínuo, cuidamos de cada detalhe.</p>\n      </div>\n      <div id=\"processGrid\"></div>\n    </div>\n  </section>\n\n  <section id=\"portfolio\">\n    <div class=\"container\">\n      <div class=\"section-header\">\n        <span class=\"section-tag\">Portfólio</span>\n        <h2 class=\"section-title\">Projetos que Deliveram</h2>\n        <p class=\"section-subtitle\">Conheça alguns dos trabalhos que transformaram marcas e negócios.</p>\n      </div>\n      <div id=\"portfolioGrid\"></div>\n    </div>\n  </section>\n\n  <div class=\"cta-banner reveal\">\n    <h2>Pronto para transformar seu negócio?</h2>\n    <p>Solicite um orçamento gratuito e descubra como podemos ajudar.</p>\n    <a href=\"#contact\" class=\"btn\">Solicitar Orçamento</a>\n  </div>\n\n  <section id=\"about\">\n    <div class=\"container\">\n      <div class=\"about-grid\">\n        <div class=\"about-img-wrap reveal\">\n          <img id=\"aboutImage\" src=\"\" alt=\"Equipe Batista.Digital\" loading=\"lazy\">\n        </div>\n        <div class=\"about-text reveal\">\n          <span class=\"section-tag\">Sobre Nós</span>\n          <h2 id=\"aboutTitle\"></h2>\n          <p id=\"aboutText\"></p>\n        </div>\n      </div>\n      <div id=\"aboutValues\"></div>\n    </div>\n  </section>\n\n  <section id=\"testimonials\">\n    <div class=\"container\">\n      <div class=\"section-header\">\n        <span class=\"section-tag\">Depoimentos</span>\n        <h2 class=\"section-title\">O Que Dizem Nossos Clientes</h2>\n        <p class=\"section-subtitle\">A satisfação de quem confia na gente é nosso maior orgulho.</p>\n      </div>\n      <div id=\"testimonialsGrid\"></div>\n    </div>\n  </section>\n\n  <section id=\"faq\">\n    <div class=\"container\">\n      <div class=\"section-header\">\n        <span class=\"section-tag\">FAQ</span>\n        <h2 class=\"section-title\">Perguntas Frequentes</h2>\n        <p class=\"section-subtitle\">Tire suas dúvidas antes de começar.</p>\n      </div>\n      <div id=\"faqList\"></div>\n    </div>\n  </section>\n\n  <section id=\"contact\">\n    <div class=\"container\">\n      <div class=\"section-header\">\n        <span class=\"section-tag\">Contato</span>\n        <h2 class=\"section-title\">Vamos Conversar</h2>\n        <p class=\"section-subtitle\">Conte seu desafio e receba uma proposta personalizada.</p>\n      </div>\n      <div class=\"contact-grid\">\n        <div id=\"contactInfo\"></div>\n        <div class=\"contact-form-wrap\">\n          <form id=\"contactForm\">\n            <div class=\"form-group\">\n              <label>Nome</label>\n              <input type=\"text\" name=\"name\" required placeholder=\"Seu nome completo\">\n            </div>\n            <div class=\"form-group\">\n              <label>E-mail</label>\n              <input type=\"email\" name=\"email\" required placeholder=\"seu@email.com\">\n            </div>\n            <div class=\"form-group\">\n              <label>Telefone / WhatsApp</label>\n              <input type=\"text\" name=\"phone\" placeholder=\"(11) 99999-9999\">\n            </div>\n            <div class=\"form-group\">\n              <label>Serviço de Interesse</label>\n              <select name=\"service\" id=\"formService\">\n                <option value=\"\">Selecione um serviço</option>\n              </select>\n            </div>\n            <div class=\"form-group\">\n              <label>Mensagem</label>\n              <textarea name=\"message\" rows=\"4\" required placeholder=\"Conte sobre seu projeto...\"></textarea>\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\" style=\"width:100%;justify-content:center\">Enviar Mensagem</button>\n          </form>\n          <div id=\"formSuccess\" class=\"form-success-msg\" style=\"display:none\">\n            ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <footer id=\"mainFooter\"></footer>\n</div>\n\n<div id=\"blogPage\" hidden>\n  <div id=\"blogListContainer\"></div>\n  <div id=\"blogPostContainer\" hidden></div>\n</div>\n\n<div id=\"privacyPage\" hidden>\n  <div id=\"privacyContent\"></div>\n</div>\n\n<div id=\"adminPanel\" hidden>\n  <div id=\"adminLoginScreen\">\n    <div class=\"admin-login-box\">\n      <h2>Painel Administrativo</h2>\n      <p>Batista.Digital — Acesso restrito</p>\n      <form id=\"adminLoginForm\">\n        <div class=\"form-group\">\n          <label>Usuário</label>\n          <input type=\"text\" name=\"username\" required placeholder=\"admin\" autocomplete=\"off\">\n        </div>\n        <div class=\"form-group\">\n          <label>Senha</label>\n          <input type=\"password\" name=\"password\" required placeholder=\"••••••••\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" style=\"width:100%;justify-content:center\">Entrar</button>\n      </form>\n      <div id=\"adminLoginError\" class=\"admin-login-error\">Usuário ou senha incorretos.</div>\n    </div>\n  </div>\n\n  <div id=\"adminDashboard\">\n    <div class=\"admin-sidebar\">\n      <div class=\"admin-sidebar-logo\">Batista.Digital</div>\n      <div class=\"admin-nav-item active\" data-admin-section=\"messages\" onclick=\"showAdminSection('messages')\">📨 Mensagens</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"company\" onclick=\"showAdminSection('company')\">🏢 Empresa & Logo</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"hero\" onclick=\"showAdminSection('hero')\">🖼️ Hero / Banner</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"stats\" onclick=\"showAdminSection('stats')\">📊 Números</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"services\" onclick=\"showAdminSection('services')\">🛠️ Serviços</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"process\" onclick=\"showAdminSection('process')\">⚙️ Processo</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"portfolio\" onclick=\"showAdminSection('portfolio')\">📁 Portfólio</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"about\" onclick=\"showAdminSection('about')\">ℹ️ Sobre</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"testimonials\" onclick=\"showAdminSection('testimonials')\">💬 Depoimentos</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"faq\" onclick=\"showAdminSection('faq')\">❓ FAQ</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"blog\" onclick=\"showAdminSection('blog')\">📝 Blog</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"social\" onclick=\"showAdminSection('social')\">📱 Redes Sociais</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"colors\" onclick=\"showAdminSection('colors')\">🎨 Cores</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"seo\" onclick=\"showAdminSection('seo')\">🔍 SEO</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"footer\" onclick=\"showAdminSection('footer')\">🦶 Rodapé</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"privacy\" onclick=\"showAdminSection('privacy')\">🔒 Privacidade</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"users\" onclick=\"showAdminSection('users')\">👥 Usuários</div>\n      <div class=\"admin-nav-item\" data-admin-section=\"backup\" onclick=\"showAdminSection('backup')\">💾 Backup</div>\n      <div class=\"admin-nav-item\" onclick=\"location.hash=''\">← Voltar ao site</div>\n      <div class=\"admin-nav-item\" id=\"adminLogout\" style=\"color:#e53935\">⏻ Sair</div>\n    </div>\n\n    <div class=\"admin-content\">\n      <div class=\"admin-header\">\n        <h2 id=\"adminSectionTitle\">Mensagens</h2>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_messages\">\n        <h3>Mensagens Recebidas</h3>\n        <p>Todas as mensagens enviadas através do formulário de contato.</p>\n        <div id=\"adminMessages\"></div>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_company\" hidden>\n        <h3>Dados da Empresa</h3>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Nome da Empresa</label><input class=\"admin-input\" id=\"editCompanyName\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Telefone</label><input class=\"admin-input\" id=\"editCompanyPhone\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">WhatsApp (somente números, ex: 5511999999999)</label><input class=\"admin-input\" id=\"editCompanyWhatsapp\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">E-mail</label><input class=\"admin-input\" id=\"editCompanyEmail\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Endereço</label><input class=\"admin-input\" id=\"editCompanyAddress\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Logo (URL da imagem)</label><input class=\"admin-input\" id=\"editLogoUrl\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Ou faça upload do logo</label><div class=\"admin-file-upload\"><input type=\"file\" accept=\"image/*\" onchange=\"uploadImage(this.files[0], 'editLogoUrl')\"></div></div>\n        <button class=\"btn btn-primary\" onclick=\"saveCompany()\">Salvar</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_hero\" hidden>\n        <h3>Seção Hero (Banner Principal)</h3>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Badge (texto superior)</label><input class=\"admin-input\" id=\"editHeroBadge\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Título Principal</label><input class=\"admin-input\" id=\"editHeroTitle\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Subtítulo</label><textarea class=\"admin-input admin-textarea\" id=\"editHeroSubtitle\"></textarea></div>\n        <h3 style=\"margin-top:20px\">Imagens do Carrossel</h3>\n        <div id=\"adminHeroImages\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addHeroImage()\">+ Adicionar Imagem (URL)</button>\n        <div class=\"admin-field-group\" style=\"margin-top:16px\"><label class=\"admin-label\">Ou faça upload de uma imagem para o carrossel</label><div class=\"admin-file-upload\"><input type=\"file\" accept=\"image/*\" onchange=\"uploadHeroImage(this.files[0])\"></div></div>\n        <div style=\"margin-top:20px\"><button class=\"btn btn-primary\" onclick=\"saveHero()\">Salvar Textos</button></div>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_stats\" hidden>\n        <h3>Números da Empresa</h3>\n        <div id=\"adminStatsList\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addStat()\">+ Adicionar</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_services\" hidden>\n        <h3>Serviços</h3>\n        <div id=\"adminServicesList\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addService()\">+ Adicionar Serviço</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_process\" hidden>\n        <h3>Processo</h3>\n        <div id=\"adminProcessList\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addProcess()\">+ Adicionar Etapa</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_portfolio\" hidden>\n        <h3>Portfólio</h3>\n        <div id=\"adminPortfolioList\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addPortfolio()\">+ Adicionar Projeto</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_about\" hidden>\n        <h3>Sobre Nós</h3>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Título</label><input class=\"admin-input\" id=\"editAboutTitle\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Texto</label><textarea class=\"admin-input admin-textarea\" id=\"editAboutText\" rows=\"6\"></textarea></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Imagem (URL)</label><input class=\"admin-input\" id=\"editAboutImage\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Ou faça upload da imagem</label><div class=\"admin-file-upload\"><input type=\"file\" accept=\"image/*\" onchange=\"uploadImage(this.files[0], 'editAboutImage')\"></div></div>\n        <h3 style=\"margin-top:30px\">Valores</h3>\n        <div id=\"adminValuesList\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addValue()\">+ Adicionar Valor</button>\n        <div style=\"margin-top:20px\"><button class=\"btn btn-primary\" onclick=\"saveAbout()\">Salvar</button></div>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_testimonials\" hidden>\n        <h3>Depoimentos</h3>\n        <div id=\"adminTestimonialsList\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addTestimonial()\">+ Adicionar Depoimento</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_faq\" hidden>\n        <h3>Perguntas Frequentes</h3>\n        <div id=\"adminFaqList\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addFAQ()\">+ Adicionar Pergunta</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_blog\" hidden>\n        <h3>Blog</h3>\n        <div id=\"adminBlogList\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addBlog()\">+ Adicionar Artigo</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_social\" hidden>\n        <h3>Redes Sociais</h3>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Instagram</label><input class=\"admin-input\" id=\"editInstagram\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Facebook</label><input class=\"admin-input\" id=\"editFacebook\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">LinkedIn</label><input class=\"admin-input\" id=\"editLinkedin\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">YouTube</label><input class=\"admin-input\" id=\"editYoutube\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">TikTok</label><input class=\"admin-input\" id=\"editTiktok\"></div>\n        <button class=\"btn btn-primary\" onclick=\"saveSocial()\">Salvar</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_colors\" hidden>\n        <h3>Cores do Site</h3>\n        <div class=\"admin-color-row\"><input type=\"color\" id=\"editColorPrimary\"><label class=\"admin-label\" style=\"margin:0\">Cor Primária</label><input class=\"admin-input\" id=\"editColorPrimaryText\" style=\"flex:0;width:120px\" onchange=\"document.getElementById('editColorPrimary').value=this.value\"></div>\n        <div class=\"admin-color-row\"><input type=\"color\" id=\"editColorSecondary\"><label class=\"admin-label\" style=\"margin:0\">Cor Secundária</label><input class=\"admin-input\" id=\"editColorSecondaryText\" style=\"flex:0;width:120px\" onchange=\"document.getElementById('editColorSecondary').value=this.value\"></div>\n        <div class=\"admin-color-row\"><input type=\"color\" id=\"editColorAccent\"><label class=\"admin-label\" style=\"margin:0\">Cor de Destaque</label><input class=\"admin-input\" id=\"editColorAccentText\" style=\"flex:0;width:120px\" onchange=\"document.getElementById('editColorAccent').value=this.value\"></div>\n        <div class=\"admin-color-row\"><input type=\"color\" id=\"editColorDark\"><label class=\"admin-label\" style=\"margin:0\">Fundo Escuro</label><input class=\"admin-input\" id=\"editColorDarkText\" style=\"flex:0;width:120px\" onchange=\"document.getElementById('editColorDark').value=this.value\"></div>\n        <div class=\"admin-color-row\"><input type=\"color\" id=\"editColorDarker\"><label class=\"admin-label\" style=\"margin:0\">Fundo Mais Escuro</label><input class=\"admin-input\" id=\"editColorDarkerText\" style=\"flex:0;width:120px\" onchange=\"document.getElementById('editColorDarker').value=this.value\"></div>\n        <button class=\"btn btn-primary\" onclick=\"saveColors()\" style=\"margin-top:20px\">Salvar Cores</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_seo\" hidden>\n        <h3>SEO</h3>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Título SEO</label><input class=\"admin-input\" id=\"editSeoTitle\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Descrição SEO</label><textarea class=\"admin-input admin-textarea\" id=\"editSeoDesc\"></textarea></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Palavras-chave</label><input class=\"admin-input\" id=\"editSeoKeywords\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Imagem OG (URL)</label><input class=\"admin-input\" id=\"editSeoImage\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Ou faça upload da imagem</label><div class=\"admin-file-upload\"><input type=\"file\" accept=\"image/*\" onchange=\"uploadImage(this.files[0], 'editSeoImage')\"></div></div>\n        <button class=\"btn btn-primary\" onclick=\"saveSEO()\">Salvar</button>\n      </h4>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_footer\" hidden>\n        <h3>Rodapé</h3>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Texto do Rodapé</label><input class=\"admin-input\" id=\"editFooterText\"></div>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Copyright</label><input class=\"admin-input\" id=\"editFooterCopyright\"></div>\n        <button class=\"btn btn-primary\" onclick=\"saveFooter()\">Salvar</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_privacy\" hidden>\n        <h3>Política de Privacidade</h3>\n        <div class=\"admin-field-group\"><label class=\"admin-label\">Texto da Política</label><textarea class=\"admin-input admin-textarea\" id=\"editPrivacyText\" rows=\"10\"></textarea></div>\n        <button class=\"btn btn-primary\" onclick=\"savePrivacy()\">Salvar</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_users\" hidden>\n        <h3>Usuários do Painel</h3>\n        <div id=\"adminUsersList\"></div>\n        <button class=\"btn btn-outline btn-sm admin-add-btn\" onclick=\"addUser()\">+ Adicionar Usuário</button>\n      </div>\n\n      <div class=\"admin-section\" id=\"adminSection_backup\" hidden>\n        <h3>Backup & Restauração</h3>\n        <p>Faça backup de todo o conteúdo do site ou restaure a partir de um arquivo.</p>\n        <button class=\"btn btn-primary\" onclick=\"exportBackup()\">📥 Exportar Backup</button>\n        <div style=\"margin-top:20px\"><label class=\"admin-label\">Restaurar a partir de arquivo:</label><input type=\"file\" accept=\".json\" onchange=\"importBackup(event)\" class=\"admin-file-upload\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<script src=\"src/app.js\"></script>\n<script src=\"src/admin.js\"></script>\n<script src=\"src/export.js\"></script>\n<script>\n  function tryInitAdmin() {\n    if (typeof initAdmin === \"function\") {\n      initAdmin();\n    } else {\n      setTimeout(tryInitAdmin, 200);\n    }\n  }\n  window.addEventListener(\"siteReady\", tryInitAdmin);\n  if (document.readyState === \"complete\") tryInitAdmin();\n</script>\n";
const SITE_MAIN_PJS = "kv = {import:kv-plugin}\nuploadPlugin = {import:upload-plugin}\n";

const EXPORT_README = `BATISTA.DIGITAL — EXPORTAÇÃO DO SITE
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
`;

function buildStandaloneIndexHtml() {
  const lines = SITE_INDEX_HTML.split("\n");
  let i = 0;
  const headLinks = [];
  while (i < lines.length && /^\s*<link\b/i.test(lines[i])) {
    headLinks.push(lines[i]);
    i++;
  }
  const bodyHtml = lines.slice(i).join("\n");
  const title = (typeof document !== "undefined" && document.title) || "Batista.Digital";
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${headLinks.join("\n")}
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

async function collectSiteFiles() {
  const files = {
    "index.html": buildStandaloneIndexHtml(),
    "main.pjs": SITE_MAIN_PJS,
    "README.txt": EXPORT_README,
  };
  const paths = ["src/styles.css", "src/app.js", "src/admin.js", "src/export.js"];
  for (const p of paths) {
    try {
      const r = await fetch(p);
      if (r.ok) {
        files[p] = await r.text();
      } else {
        files[p] = "/* erro ao ler " + p + ": HTTP " + r.status + " */";
      }
    } catch (e) {
      files[p] = "/* erro ao ler " + p + ": " + e + " */";
    }
  }
  try {
    if (root && root.kv) {
      const data = await root.kv.batistaDigital.get("content");
      if (data) files["data/content.json"] = JSON.stringify(data, null, 2);
    }
  } catch (e) {
    files["data/content.json"] = "/* erro ao exportar conteúdo: " + e + " */";
  }
  return files;
}

function triggerDownload(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

async function downloadSiteExport() {
  const files = await collectSiteFiles();
  try {
    const JSZip = (await import("https://esm.sh/jszip@3.10.1")).default;
    const zip = new JSZip();
    const folder = zip.folder("batista-digital-site");
    for (const [name, text] of Object.entries(files)) folder.file(name, text);
    const blob = await zip.generateAsync({ type: "blob" });
    triggerDownload(blob, "batista-digital-site.zip");
  } catch (err) {
    for (const [name, text] of Object.entries(files)) {
      triggerDownload(
        new Blob([text], { type: "text/plain;charset=utf-8" }),
        "batista-digital-site/" + name
      );
    }
  }
}

let _toastEl = null;
function showExportToast(msg) {
  if (!_toastEl) {
    _toastEl = document.createElement("div");
    _toastEl.className = "bd-export-toast";
    document.body.appendChild(_toastEl);
  }
  _toastEl.textContent = msg;
  _toastEl.classList.add("show");
  clearTimeout(_toastEl._t);
  _toastEl._t = setTimeout(() => _toastEl.classList.remove("show"), 3500);
}

let _logoClicks = 0;
let _logoClickTimer = null;
document.addEventListener("click", (e) => {
  const logo = e.target.closest(".footer-logo");
  if (!logo) return;
  _logoClicks++;
  clearTimeout(_logoClickTimer);
  _logoClickTimer = setTimeout(() => {
    _logoClicks = 0;
  }, 2000);
  logo.classList.remove("logo-tap");
  void logo.offsetWidth;
  logo.classList.add("logo-tap");
  if (_logoClicks >= 10) {
    _logoClicks = 0;
    showExportToast("Gerando download do site...");
    downloadSiteExport().catch((err) =>
      showExportToast("Falha no download: " + err)
    );
  }
});

const exportStyle = document.createElement("style");
exportStyle.textContent = `
.bd-export-toast {
  position: fixed;
  bottom: 84px;
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: rgba(15, 14, 23, 0.95);
  color: #fff;
  padding: 10px 18px;
  border-radius: 10px;
  font: 500 14px/1.4 'Inter', sans-serif;
  box-shadow: 0 6px 24px rgba(0,0,0,0.35);
  z-index: 99999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.bd-export-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.footer-logo.logo-tap { animation: bdLogoPop 0.15s ease; }
@keyframes bdLogoPop { 0% { transform: scale(1); } 50% { transform: scale(1.12); } 100% { transform: scale(1); } }
`;
document.head.appendChild(exportStyle);
