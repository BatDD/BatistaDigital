const LOGO_IMG = "https://user.uploads.dev/file/ad17ae99c92a0ede2e34f7487f90876e.jpg";
const HERO_IMGS = [
  "https://user.uploads.dev/file/ab8a15c06934d0c452504364a4b12694.jpg",
  "https://user.uploads.dev/file/49133f4e187258c18f8abac3fa56276e.jpg",
  "https://user.uploads.dev/file/d1b02c8315089d1ca69bbc7af90247d0.jpg"
];
const ABOUT_IMG = "https://user.uploads.dev/file/326605ac987607d67f94b6d23071cdd7.jpg";
const OFFICE_IMG = "https://user.uploads.dev/file/4ad90398fa72a723f5a2bad644eab8e8.jpg";
const PORTFOLIO_IMGS = [
  "https://user.uploads.dev/file/4de265e17eb67232e127e98f8fecd0b3.jpg",
  "https://user.uploads.dev/file/94b14a9fc33ca063bd6e6ea130919acf.jpg",
  "https://user.uploads.dev/file/654f220c57cfb076ada2e2838485e7b5.jpg",
  "https://user.uploads.dev/file/b07fdd1f9616ff7275a27881d92531e7.jpg"
];
const AVATAR_IMGS = [
  "https://user.uploads.dev/file/096c3c151413a5be355f866b9ce8a0e2.jpg",
  "https://user.uploads.dev/file/0b9f1b1650c7e15316b6dc2bb9744974.jpg",
  "https://user.uploads.dev/file/c4d951470c8420ce5c9bd50d7184cd5a.jpg"
];

const SVG_ICONS = {
  website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  landing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  googleAds: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  metaAds: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  social: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  seo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
  marketing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  branding: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.504 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>'
};

let content = null;
let adminLoggedIn = false;

const defaultContent = {
  company: {
    name: "Batista.Digital",
    logo: LOGO_IMG,
    phone: "(11) 99999-9999",
    whatsapp: "5511999999999",
    email: "contato@batista.digital",
    address: "São Paulo, SP - Brasil"
  },
  social: {
    instagram: "https://instagram.com/batista.digital",
    facebook: "https://facebook.com/batista.digital",
    linkedin: "https://linkedin.com/company/batista-digital",
    youtube: "",
    tiktok: ""
  },
  colors: {
    primary: "#6C2BD9",
    secondary: "#9F5DE2",
    accent: "#FF6B35",
    dark: "#0F0E17",
    darker: "#070612"
  },
  hero: {
    title: "Transformamos Cliques em Clientes",
    subtitle: "Agência de marketing digital focada em resultados reais. Criamos experiências digitais que geram leads, vendas e crescimento para o seu negócio.",
    images: HERO_IMGS,
    badge: "Agência #1 em Marketing Digital"
  },
  stats: [
    { number: "100+", label: "Projetos Entregues" },
    { number: "50+", label: "Clientes Ativos" },
    { number: "98%", label: "Satisfação" },
    { number: "5+", label: "Anos de Mercado" }
  ],
  services: [
    { icon: SVG_ICONS.website, title: "Criação de Sites Profissionais", description: "Sites modernos, rápidos e otimizados para conversão. Desenvolvemos experiências digitais que representam sua marca com excelência." },
    { icon: SVG_ICONS.landing, title: "Landing Pages", description: "Páginas de alta conversão criadas com base em dados e psicologia do consumidor para maximizar seus resultados." },
    { icon: SVG_ICONS.googleAds, title: "Gestão de Google Ads", description: "Campanhas otimizadas no Google Ads que colocam seu negócio no topo das buscas e geram leads qualificados." },
    { icon: SVG_ICONS.metaAds, title: "Gestão de Meta Ads", description: "Anúncios no Facebook e Instagram que alcançam seu público ideal e geram retorno sobre investimento." },
    { icon: SVG_ICONS.social, title: "Gestão de Redes Sociais", description: "Conteúdo estratégico, criativo e engajador que constrói comunidade e fortalece sua marca nas redes." },
    { icon: SVG_ICONS.seo, title: "SEO", description: "Otimização para motores de busca que coloca seu site no topo do Google e atrai tráfego orgânico qualificado." },
    { icon: SVG_ICONS.marketing, title: "Marketing Digital", description: "Estratégias completas de marketing digital integradas para acelerar o crescimento do seu negócio." },
    { icon: SVG_ICONS.branding, title: "Identidade Visual", description: "Branding memorável que diferencia sua marca, cria conexão emocional e gera reconhecimento no mercado." }
  ],
  process: [
    { step: "01", title: "Contato", description: "Você nos procura com seu desafio. Entendemos suas necessidades e objetivos." },
    { step: "02", title: "Planejamento", description: "Definimos a estratégia, cronograma e escopo do projeto com total transparência." },
    { step: "03", title: "Desenvolvimento", description: "Nossa equipe cria e desenvolve tudo com padrão de excelência e atenção aos detalhes." },
    { step: "04", title: "Aprovação", description: "Você revisa e aprova cada etapa antes da publicação. Sua opinião é fundamental." },
    { step: "05", title: "Publicação", description: "Lançamos seu projeto com otimização completa e configurações de performance." },
    { step: "06", title: "Suporte", description: "Oferecemos suporte contínuo, análises e melhorias para resultados crescentes." }
  ],
  portfolio: [
    { title: "E-commerce Premium", category: "Web Design", image: PORTFOLIO_IMGS[0], description: "Loja virtual completa com design moderno e otimização de conversão." },
    { title: "App Fitness Pro", category: "UX/UI Design", image: PORTFOLIO_IMGS[1], description: "Aplicativo fitness com interface intuitiva e experiência premium." },
    { title: "Branding Studio X", category: "Identidade Visual", image: PORTFOLIO_IMGS[2], description: "Identidade visual completa para startup de tecnologia." },
    { title: "Dashboard Social", category: "Marketing Digital", image: PORTFOLIO_IMGS[3], description: "Gestão de redes sociais com crescimento de 300% em engajamento." }
  ],
  about: {
    title: "Sobre a Batista.Digital",
    text: "Somos uma agência digital especializada em transformar marcas em referências no ambiente digital. Com mais de 5 anos de mercado e mais de 100 projetos entregues, combinamos criatividade, tecnologia e estratégia para criar experiências digitais que geram resultados reais.\n\nNossa equipe é formada por profissionais apaixonados por what fazem, que trabalham lado a lado com cada cliente para entender seus objetivos e criar soluções personalizadas que superam expectativas.",
    image: ABOUT_IMG,
    values: [
      { title: "Transparência", description: "Comunicação clara, relatórios detalhados e sem promessas vazias. Você sempre sabe exatamente onde está investindo." },
      { title: "Resultados", description: "Foco em métricas que importam para o seu negócio. Tráfego, leads, vendas e ROI — não apenas curtidas." },
      { title: "Inovação", description: "Sempre à frente das tendências digitais. Utilizamos as melhores tecnologias e estratégias do mercado." }
    ]
  },
  testimonials: [
    { name: "Carlos Mendes", role: "CEO, TechCorp Solutions", avatar: AVATAR_IMGS[0], text: "A Batista.Digital transformou completamente nossa presença online. Em 3 meses, triplicamos as conversões do site. Profissionais excepcionais!" },
    { name: "Ana Souza", role: "Diretora, ModaBR", avatar: AVATAR_IMGS[1], text: "Investir na Batista.Digital foi a melhor decisão que tomamos. O ROI das campanhas de Google Ads superou todas as expectativas. Recomendo!" },
    { name: "Pedro Lima", role: "Fundador, StartupX", avatar: AVATAR_IMGS[2], text: "Profissionais incríveis! Entregaram um site que superou tudo que imaginávamos. O suporte pós-entrega é impecável." }
  ],
  faq: [
    { question: "Quanto custa um site profissional?", answer: "O investimento varia conforme o escopo e funcionalidades do projeto. Oferecemos soluções para diferentes orçamentos. Solicite um orçamento gratuito e personalizado." },
    { question: "Quanto tempo leva para criar um site?", answer: "Dependendo da complexidade, entre 2 e 6 semanas. Sites simples podem ficar prontos em menos tempo. Definimos um cronograma claro no planejamento." },
    { question: "Vocês oferecem suporte após a entrega?", answer: "Sim! Oferecemos planos de suporte e manutenção contínuos, incluindo atualizações, backups, monitoramento e melhorias." },
    { question: "Como funciona a gestão de tráfego pago?", answer: "Criamos, otimizamos e gerenciamos suas campanhas no Google Ads e Meta Ads. Enviamos relatórios periódicos com métricas e resultados detalhados." },
    { question: "Vocês trabalham com empresas de qualquer tamanho?", answer: "Sim! Atendemos desde pequenas empresas locais até grandes corporações. Cada projeto é único e recebe atenção personalizada." },
    { question: "É possível editar o conteúdo do site depois?", answer: "Com certeza! Todos os nossos sites incluem painel administrativo para você editar textos, imagens e conteúdos sem precisar de conhecimento técnico." }
  ],
  blog: [
    {
      id: "seo-2024",
      title: "Como Otimizar Seu Site para SEO em 2024",
      date: "2024-07-15",
      author: "Equipe Batista.Digital",
      excerpt: "Descubra as melhores práticas de SEO para colocar seu site no topo do Google e atrair tráfego orgânico qualificado.",
      image: PORTFOLIO_IMGS[3],
      content: "O SEO (Search Engine Optimization) é uma das estratégias mais importantes para qualquer negócio que deseja ser encontrado online. Em 2024, as melhores práticas de SEO evoluíram, e estar atualizado é fundamental.\n\n1. Core Web Vitals\nA experiência do usuário é um fator crucial. Tempo de carregamento, interatividade e estabilidade visual são métricas que o Google avalia. Otimize seu site para passar em todos os Core Web Vitals.\n\n2. Conteúdo de Qualidade\nConteúdo rei continua válido. Mas não basta apenas produzir conteúdo — ele precisa ser relevante, original e responder às perguntas dos usuários de forma completa.\n\n3. SEO Local\nSe você atende em uma região específica, o SEO local é essencial. Otimize seu Google Meu Negócio, colete avaliações e use palavras-chave locais.\n\n4. Mobile-First\nMais de 60% das buscas são feitas no celular. Seu site precisa ser responsivo e oferecer excelente experiência mobile.\n\n5. Inteligência Artificial\nO Google utiliza IA para entender o contexto das buscas. Crie conteúdo natural e focado na intenção do usuário, não apenas em palavras-chave."
    },
    {
      id: "google-ads-guia",
      title: "Google Ads: Guia Completo para Iniciantes",
      date: "2024-07-10",
      author: "Equipe Batista.Digital",
      excerpt: "Tudo que você precisa saber para começar no Google Ads e criar campanhas que geram resultados reais.",
      image: PORTFOLIO_IMGS[0],
      content: "O Google Ads é a plataforma de publicidade online do Google, permitindo que empresas de todos os tamanhos anunciem para potenciais clientes no momento exato em que eles buscam por seus produtos ou serviços.\n\nO que é Google Ads?\nÉ uma plataforma de advertising paga onde você cria anúncios que aparecem nos resultados de busca do Google e em sites parceiros. Você paga apenas quando alguém clica no seu anúncio (PPC - Pay Per Click).\n\nTipos de Campanhas\n1. Rede de Busca: Anúncios em texto que aparecem nos resultados de busca\n2. Rede de Display: Anúncios visuais em sites parceiros\n3. Shopping: Para e-commerce, mostra produtos com foto e preço\n4. YouTube: Anúncios em vídeo\n5. Performance Max: Usa IA para otimizar automaticamente\n\nComo começar?\n1. Defina seus objetivos\n2. Escolha as palavras-chave certas\n3. Crie anúncios atrativos\n4. Defina seu orçamento\n5. Monitore e otimize constantemente\n\nDicas de Ouro\n- Use palavras-chave de cauda longa\n- Crie páginas de destino específicas\n- Aproveite extensões de anúncio\n- Monitore seu ROI continuamente"
    },
    {
      id: "tendencias-2024",
      title: "Tendências de Marketing Digital para 2024",
      date: "2024-07-05",
      author: "Equipe Batista.Digital",
      excerpt: "As principais tendências do marketing digital que você precisa conhecer para se destacar em 2024.",
      image: PORTFOLIO_IMGS[2],
      content: "O marketing digital está em constante evolução. Para se manter competitivo, é essencial acompanhar as tendências e adaptar suas estratégias.\n\n1. Inteligência Artificial\nA IA está transformando o marketing. Desde chatbots que atendem clientes 24/7 até ferramentas que criam conteúdo personalizado, a IA é o presente e o futuro.\n\n2. Vídeo Curto\nReels, TikTok e Shorts continuam dominando. Conteúdo em vídeo curto e vertical é o formato preferido das novas gerações.\n\n3. Personalização\nConsumidores esperam experiências personalizadas. Use dados para criar jornadas únicas para cada cliente.\n\n4. Marketing de Influência\nMicro-influenciadores continuam ganhando força. Parcerias autênticas geram mais confiança do que anúncios tradicionais.\n\n5. Sustentabilidade\nConsumidores valorizam marcas com propósito. Demonstre responsabilidade social e ambiental.\n\n6. Primeira Pessoa\nCom a eliminação gradual de cookies de terceiros, focar em dados de primeira pessoa (coletados diretamente) é estratégico.\n\nFique à frente dessas tendências e seu negócio estará preparado para crescer em 2024!"
    }
  ],
  seo: {
    title: "Batista.Digital — Agência de Marketing Digital | Sites, Ads e SEO",
    description: "Agência de marketing digital especializada em criação de sites, Google Ads, Meta Ads, SEO e gestão de redes sociais. Solicite seu orçamento gratuito!",
    keywords: "marketing digital, criação de sites, google ads, meta ads, seo, agência de marketing, landing pages, identidade visual, redes sociais",
    ogImage: HERO_IMGS[0]
  },
  privacy: {
    title: "Política de Privacidade",
    text: "A Batista.Digital valoriza a privacidade de seus usuários. Esta política descreve como coletamos, usamos e protegemos seus dados pessoais.\n\n1. Dados Coletados\nColetamos informações que você nos fornece diretamente, como nome, e-mail, telefone e mensagem através do formulário de contato.\n\n2. Uso dos Dados\nSeus dados são utilizados exclusivamente para responder às suas solicitações, enviar propostas e prestar nossos serviços. Não compartilhamos seus dados com terceiros sem consentimento.\n\n3. Proteção\nAdotamos medidas técnicas e administrativas para proteger seus dados pessoais contra acesso não autorizado, alteração ou divulgação.\n\n4. Cookies\nNosso site pode utilizar cookies para melhorar a experiência de navegação. Você pode desativar cookies nas configurações do seu navegador.\n\n5. Seus Direitos\nVocê tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Para exercer esses direitos, entre em contato pelo e-mail contato@batista.digital.\n\n6. Alterações\nEsta política pode ser atualizada periodicamente. Recomendamos que você revise esta página regularmente.\n\nÚltima atualização: Julho de 2024"
  },
  footer: {
    text: "Transformando marcas digitais com estratégia, criatividade e tecnologia.",
    copyright: "© 2024 Batista.Digital. Todos os direitos reservados."
  }
};

async function loadContent() {
  try {
    if (!root.kv) return JSON.parse(JSON.stringify(defaultContent));
    let saved = await root.kv.batistaDigital.get("content");
    if (saved) return saved;
    let copy = JSON.parse(JSON.stringify(defaultContent));
    await root.kv.batistaDigital.set("content", copy);
    return copy;
  } catch (e) {
    console.error("loadContent error:", e);
    return JSON.parse(JSON.stringify(defaultContent));
  }
}

async function saveContent(newContent) {
  try {
    content = newContent;
    if (root.kv) await root.kv.batistaDigital.set("content", newContent);
    renderAll();
    applyColors();
    applySEO();
    return true;
  } catch (e) {
    console.error("saveContent error:", e);
    return false;
  }
}

function applyColors() {
  const r = document.documentElement;
  r.style.setProperty("--c-primary", content.colors.primary);
  r.style.setProperty("--c-secondary", content.colors.secondary);
  r.style.setProperty("--c-accent", content.colors.accent);
  r.style.setProperty("--c-dark", content.colors.dark);
  r.style.setProperty("--c-darker", content.colors.darker);
}

function applySEO() {
  document.title = content.seo.title || content.company.name;
  let meta = document.querySelector("meta[name='description']");
  if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
  meta.content = content.seo.description;
  let kw = document.querySelector("meta[name='keywords']");
  if (!kw) { kw = document.createElement("meta"); kw.name = "keywords"; document.head.appendChild(kw); }
  kw.content = content.seo.keywords;
  ["og:title", "og:description", "og:image", "twitter:card", "twitter:title", "twitter:description"].forEach(p => {
    let m = document.querySelector(`meta[property='${p}']`) || document.querySelector(`meta[name='${p}']`);
    if (!m) { m = document.createElement("meta"); m.setAttribute(p.startsWith("og:") ? "property" : "name", p); document.head.appendChild(m); }
    if (p === "og:title" || p === "twitter:title") m.content = content.seo.title;
    if (p === "og:description" || p === "twitter:description") m.content = content.seo.description;
    if (p === "og:image") m.content = content.seo.ogImage;
    if (p === "twitter:card") m.content = "summary_large_image";
  });
}

function renderNav() {
  const logoEl = document.getElementById("navLogo");
  if (content.company.logo) {
    logoEl.innerHTML = `<img src="${content.company.logo}" alt="${content.company.name}" class="nav-logo-img"><span class="nav-logo-text">${content.company.name}</span>`;
  } else {
    logoEl.textContent = content.company.name;
  }
}

let heroCarouselIndex = 0;
let heroCarouselTimer = null;

function renderHero() {
  const hero = document.getElementById("hero");
  const images = content.hero.images && content.hero.images.length ? content.hero.images : [""];
  hero.innerHTML = `
    <div class="hero-slides">
      ${images.map((img, i) => `<div class="hero-slide ${i === 0 ? "active" : ""}" data-idx="${i}" style="background-image: linear-gradient(135deg, ${content.colors.darker}ee, ${content.colors.dark}99), url('${img}')"></div>`).join("")}
    </div>
    <div class="hero-dots">
      ${images.map((_, i) => `<button class="hero-dot ${i === 0 ? "active" : ""}" data-idx="${i}" aria-label="Slide ${i+1}"></button>`).join("")}
    </div>
    <div class="hero-content">
      <div class="hero-badge" id="heroBadge"></div>
      <h1 id="heroTitle"></h1>
      <p id="heroSubtitle"></p>
      <div class="hero-buttons">
        <a href="#" id="heroQuoteBtn" class="btn btn-primary">Solicitar Orçamento</a>
        <a href="#portfolio" class="btn btn-outline">Ver Portfólio</a>
      </div>
    </div>
    <div class="hero-scroll">↓</div>
  `;
  document.getElementById("heroBadge").textContent = content.hero.badge;
  document.getElementById("heroTitle").textContent = content.hero.title;
  document.getElementById("heroSubtitle").textContent = content.hero.subtitle;

  const quoteBtn = document.getElementById("heroQuoteBtn");
  if (quoteBtn) quoteBtn.addEventListener("click", e => { e.preventDefault(); openWhatsApp(); });

  document.querySelectorAll(".hero-dot").forEach(dot => {
    dot.addEventListener("click", () => switchHeroSlide(parseInt(dot.dataset.idx)));
  });

  startHeroCarousel();
}

function switchHeroSlide(idx) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  if (idx >= slides.length) idx = 0;
  const scrollY = window.scrollY;
  slides.forEach(s => {
    s.classList.remove("active", "prev");
    s.style.transform = "scale(1.1)";
  });
  if (slides[heroCarouselIndex]) slides[heroCarouselIndex].classList.add("prev");
  slides[idx].classList.add("active");
  slides[idx].style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
  dots.forEach(d => d.classList.remove("active"));
  if (dots[idx]) dots[idx].classList.add("active");
  heroCarouselIndex = idx;
}

function startHeroCarousel() {
  if (heroCarouselTimer) clearInterval(heroCarouselTimer);
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length <= 1) return;
  heroCarouselTimer = setInterval(() => {
    switchHeroSlide((heroCarouselIndex + 1) % slides.length);
  }, 5000);
}

function openWhatsApp(service) {
  const wa = content.company.whatsapp;
  if (!wa) return;
  let msg = "Olá! Vim pelo site da Batista.Digital e gostaria de solicitar um orçamento.";
  if (service) msg = `Olá! Gostaria de um orçamento para: ${service}.`;
  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, "_blank");
}

function renderStats() {
  document.getElementById("statsGrid").innerHTML = content.stats.map(s => `
    <div class="stat-item reveal">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join("");
}

function renderServices() {
  document.getElementById("servicesGrid").innerHTML = content.services.map((s, i) => `
    <div class="service-card reveal" style="animation-delay:${i * 0.1}s">
      <div class="service-icon">${s.icon}</div>
      <h3 class="service-title">${s.title}</h3>
      <p class="service-desc">${s.description}</p>
      <a href="#contact" class="service-link" data-service="${s.title}">Saiba Mais →</a>
    </div>
  `).join("");
  document.querySelectorAll(".service-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const svc = link.dataset.service;
      openWhatsApp(svc);
    });
  });
}

function renderProcess() {
  document.getElementById("processGrid").innerHTML = content.process.map((p, i) => `
    <div class="process-item reveal">
      <div class="process-number">${p.step}</div>
      <h3 class="process-title">${p.title}</h3>
      <p class="process-desc">${p.description}</p>
    </div>
  `).join("");
}

function renderPortfolio() {
  document.getElementById("portfolioGrid").innerHTML = content.portfolio.map((p, i) => `
    <div class="portfolio-card reveal" data-idx="${i}">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="portfolio-overlay">
        <span class="portfolio-category">${p.category}</span>
        <h3 class="portfolio-title">${p.title}</h3>
        <p class="portfolio-desc">${p.description}</p>
      </div>
    </div>
  `).join("");
}

function renderAbout() {
  document.getElementById("aboutImage").src = content.about.image;
  document.getElementById("aboutTitle").textContent = content.about.title;
  document.getElementById("aboutText").innerHTML = content.about.text.replace(/\n/g, "<br>");
  document.getElementById("aboutValues").innerHTML = content.about.values.map(v => `
    <div class="value-card reveal">
      <h4>${v.title}</h4>
      <p>${v.description}</p>
    </div>
  `).join("");
}

function renderTestimonials() {
  document.getElementById("testimonialsGrid").innerHTML = content.testimonials.map(t => `
    <div class="testimonial-card reveal">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <img src="${t.avatar}" alt="${t.name}" loading="lazy">
        <div>
          <strong>${t.name}</strong>
          <span>${t.role}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function renderFAQ() {
  document.getElementById("faqList").innerHTML = content.faq.map((f, i) => `
    <div class="faq-item reveal">
      <button class="faq-question" data-idx="${i}">
        <span>${f.question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer"><p>${f.answer}</p></div>
    </div>
  `).join("");
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const answer = item.querySelector(".faq-answer");
      const icon = btn.querySelector(".faq-icon");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(it => {
        it.classList.remove("open");
        it.querySelector(".faq-answer").style.maxHeight = null;
        it.querySelector(".faq-icon").textContent = "+";
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.textContent = "−";
      }
    });
  });
}

function renderContact() {
  document.getElementById("contactInfo").innerHTML = `
    <div class="contact-info-item">
      <div class="contact-info-icon">📞</div>
      <div><strong>Telefone</strong><br>${content.company.phone}</div>
    </div>
    <div class="contact-info-item">
      <div class="contact-info-icon">✉️</div>
      <div><strong>E-mail</strong><br>${content.company.email}</div>
    </div>
    <div class="contact-info-item">
      <div class="contact-info-icon">📍</div>
      <div><strong>Endereço</strong><br>${content.company.address}</div>
    </div>
    <div class="contact-social">
      ${content.social.instagram ? `<a href="${content.social.instagram}" target="_blank" aria-label="Instagram">Instagram</a>` : ""}
      ${content.social.facebook ? `<a href="${content.social.facebook}" target="_blank" aria-label="Facebook">Facebook</a>` : ""}
      ${content.social.linkedin ? `<a href="${content.social.linkedin}" target="_blank" aria-label="LinkedIn">LinkedIn</a>` : ""}
      ${content.social.youtube ? `<a href="${content.social.youtube}" target="_blank" aria-label="YouTube">YouTube</a>` : ""}
    </div>
  `;
  const sel = document.getElementById("formService");
  if (sel) {
    sel.innerHTML = '<option value="">Selecione um serviço</option>' +
      content.services.map(s => `<option value="${s.title}">${s.title}</option>`).join("") +
      '<option value="Outro">Outro</option>';
  }
}

function renderFooter() {
  document.getElementById("mainFooter").innerHTML = `
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-logo">${content.company.logo ? `<img src="${content.company.logo}" alt="${content.company.name}">` : content.company.name}</div>
        <p class="footer-text">${content.footer.text}</p>
        <div class="footer-social">
          ${content.social.instagram ? `<a href="${content.social.instagram}" target="_blank">IG</a>` : ""}
          ${content.social.facebook ? `<a href="${content.social.facebook}" target="_blank">FB</a>` : ""}
          ${content.social.linkedin ? `<a href="${content.social.linkedin}" target="_blank">IN</a>` : ""}
          ${content.social.youtube ? `<a href="${content.social.youtube}" target="_blank">YT</a>` : ""}
        </div>
      </div>
      <div class="footer-col">
        <h4>Empresa</h4>
        <a href="#about">Sobre Nós</a>
        <a href="#services">Serviços</a>
        <a href="#portfolio">Portfólio</a>
        <a href="#blog">Blog</a>
      </div>
      <div class="footer-col">
        <h4>Serviços</h4>
        ${content.services.slice(0, 5).map(s => `<a href="#services">${s.title}</a>`).join("")}
      </div>
      <div class="footer-col">
        <h4>Contato</h4>
        <p>${content.company.phone}</p>
        <p>${content.company.email}</p>
        <p>${content.company.address}</p>
        <a href="#contact" class="btn btn-primary btn-sm footer-cta">Solicitar Orçamento</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${content.footer.copyright}</p>
      <p><a href="#privacidade">Política de Privacidade</a> · <a href="#admin">Admin</a></p>
    </div>
  `;
}

function renderAll() {
  renderNav();
  renderHero();
  renderStats();
  renderServices();
  renderProcess();
  renderPortfolio();
  renderAbout();
  renderTestimonials();
  renderFAQ();
  renderContact();
  renderFooter();
  setupAnimations();
}

function setupAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      service: form.service.value,
      message: form.message.value,
      date: new Date().toISOString()
    };
    try {
      if (root.kv) {
        let msgs = await root.kv.batistaDigital.get("messages") || [];
        msgs.unshift(data);
        await root.kv.batistaDigital.set("messages", msgs);
      }
    } catch (err) { console.error(err); }
    form.reset();
    const success = document.getElementById("formSuccess");
    success.style.display = "block";
    setTimeout(() => success.style.display = "none", 5000);
    const wa = content.company.whatsapp;
    if (wa) {
      const waMsg = `Olá! Meu nome é ${data.name}. Gostaria de um orçamento para: ${data.service || "serviços"}. ${data.message}`;
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(waMsg)}`, "_blank");
    }
  });
}

function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    toggle.classList.toggle("active");
  });
  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.classList.remove("active");
    });
  });
  const navCta = menu.querySelector(".nav-cta");
  if (navCta) {
    navCta.addEventListener("click", e => {
      e.preventDefault();
      openWhatsApp();
    });
  }
}

function setupParallax() {
  const heroSlides = document.querySelectorAll(".hero-slide");
  const aboutImg = document.querySelector(".about-img-wrap img");
  const ctaBanner = document.querySelector(".cta-banner");

  function onScroll() {
    const scrollY = window.scrollY;
    const heroHeight = document.getElementById("hero")?.offsetHeight || window.innerHeight;
    if (scrollY < heroHeight) {
      heroSlides.forEach(slide => {
        if (slide.classList.contains("active")) {
          slide.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
        }
      });
    }
    if (aboutImg) {
      const rect = aboutImg.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        aboutImg.style.transform = `translateY(${(window.innerHeight - rect.top) * -0.08}px)`;
      }
    }
    if (ctaBanner) {
      const rect = ctaBanner.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.05;
        ctaBanner.style.transform = `translateY(${offset}px)`;
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function setupNavScroll() {
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  });
}

function renderBlogList() {
  const ctn = document.getElementById("blogListContainer");
  ctn.innerHTML = `
    <div class="blog-header">
      <h1>Blog</h1>
      <p>Insights, dicas e tendências do mundo do marketing digital</p>
    </div>
    <div class="blog-grid">
      ${content.blog.map(post => `
        <article class="blog-card reveal" data-id="${post.id}">
          <div class="blog-card-img"><img src="${post.image}" alt="${post.title}" loading="lazy"></div>
          <div class="blog-card-body">
            <span class="blog-date">${new Date(post.date).toLocaleDateString("pt-BR")}</span>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="#blog/${post.id}" class="blog-readmore">Leia mais →</a>
          </div>
        </article>
      `).join("")}
    </div>
  `;
  document.querySelectorAll(".blog-card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.hash = `blog/${card.dataset.id}`;
    });
  });
  setupAnimations();
}

function renderBlogPost(id) {
  const post = content.blog.find(p => p.id === id);
  const ctn = document.getElementById("blogPostContainer");
  if (!post) {
    ctn.innerHTML = "<p>Artigo não encontrado.</p>";
    return;
  }
  ctn.innerHTML = `
    <article class="blog-post">
      <a href="#blog" class="blog-back">← Voltar ao Blog</a>
      <div class="blog-post-img"><img src="${post.image}" alt="${post.title}"></div>
      <div class="blog-post-meta">
        <span>${new Date(post.date).toLocaleDateString("pt-BR")}</span>
        <span>${post.author}</span>
      </div>
      <h1>${post.title}</h1>
      <div class="blog-post-content">${post.content.replace(/\n/g, "<br>")}</div>
      <div class="blog-cta">
        <h3>Gostou do conteúdo?</h3>
        <p>Fale conosco e descubra como podemos ajudar seu negócio a crescer.</p>
        <a href="#contact" class="btn btn-primary">Solicitar Orçamento</a>
      </div>
    </article>
  `;
}

function renderPrivacy() {
  document.getElementById("privacyContent").innerHTML = `
    <div class="privacy-page">
      <a href="#" class="blog-back">← Voltar ao site</a>
      <h1>${content.privacy.title}</h1>
      <div class="privacy-text">${content.privacy.text.replace(/\n/g, "<br>")}</div>
    </div>
  `;
}

function showPage(page, sub) {
  document.getElementById("mainPage").hidden = page !== "main";
  document.getElementById("blogPage").hidden = page !== "blog";
  document.getElementById("privacyPage").hidden = page !== "privacy";
  document.getElementById("adminPanel").hidden = page !== "admin";
  if (page !== "admin") {
    document.getElementById("mainNav").hidden = false;
  }
  if (page === "main") {
    window.scrollTo(0, 0);
  }
  if (page === "blog") {
    if (sub) {
      document.getElementById("blogListContainer").hidden = true;
      document.getElementById("blogPostContainer").hidden = false;
      renderBlogPost(sub);
    } else {
      document.getElementById("blogListContainer").hidden = false;
      document.getElementById("blogPostContainer").hidden = true;
      renderBlogList();
    }
  }
  if (page === "privacy") {
    renderPrivacy();
  }
  if (page === "admin") {
    if (!adminLoggedIn) {
      document.getElementById("adminLoginScreen").hidden = false;
      document.getElementById("adminDashboard").hidden = true;
      document.getElementById("mainNav").hidden = true;
    } else {
      document.getElementById("adminLoginScreen").hidden = true;
      document.getElementById("adminDashboard").hidden = false;
      document.getElementById("mainNav").hidden = true;
    }
  }
}

function handleRoute() {
  const hash = window.location.hash.slice(1);
  const parts = hash.split("/");
  if (parts[0] === "admin") {
    showPage("admin");
  } else if (parts[0] === "blog") {
    showPage("blog", parts[1]);
  } else if (parts[0] === "privacidade") {
    showPage("privacy");
  } else {
    showPage("main");
    if (parts[0]) {
      setTimeout(() => {
        const el = document.getElementById(parts[0]);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
}

function setupCounterAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ""));
        if (!isNaN(num) && num > 0) {
          const suffix = text.replace(/[\d]/g, "");
          let current = 0;
          const duration = 2000;
          const steps = 60;
          const inc = num / steps;
          const timer = setInterval(() => {
            current += inc;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
          }, duration / steps);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-number").forEach(el => observer.observe(el));
}

function setupFooterCTA() {
  const cta = document.querySelector(".footer-cta");
  if (cta) {
    cta.addEventListener("click", e => {
      e.preventDefault();
      openWhatsApp();
    });
  }
  const ctaBannerBtn = document.querySelector(".cta-banner .btn");
  if (ctaBannerBtn) {
    ctaBannerBtn.addEventListener("click", e => {
      e.preventDefault();
      openWhatsApp();
    });
  }
  const waFloat = document.getElementById("waFloatBtn");
  if (waFloat) {
    waFloat.addEventListener("click", e => {
      e.preventDefault();
      openWhatsApp();
    });
  }
}

async function initSite() {
  content = await loadContent();
  applyColors();
  applySEO();
  renderAll();
  setupContactForm();
  setupMobileNav();
  setupNavScroll();
  setupParallax();
  setupCounterAnimations();
  setupFooterCTA();
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
  window.dispatchEvent(new CustomEvent("siteReady"));
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}
// Fallback: ensure initSite runs even if DOMContentLoaded already fired
window.addEventListener("load", () => {
  if (content === null) initSite();
});
