// ============================================================
//  PAINEL ADMIN BATISTA.DIGITAL — versão estática (GitHub Pages)
//  - Funciona em QUALQUER hospedagem estática (GitHub Pages, etc.)
//  - Conteúdo salvo num arquivo content.json na raiz do site
//  - Painel escondido em:  ?admin  ou  #admin
//  - Salvar: via API do GitHub (token configurado) OU baixa o
//    content.json para você commitar na mão
// ============================================================
(function(){
"use strict";

// Hash SHA-256 da senha de administrador (a senha em si não fica no código).
const ADMIN_HASH = "47b5ef2d86caf9bfb813399b94a53e851af6372e59ccd70c375576fad114ce43";
const CFG_KEY = "bd_gh_cfg";

// ---------------- helpers ----------------
function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function clone(x){ return JSON.parse(JSON.stringify(x)); }
function deepMerge(base, over){
  if (over == null) return base;
  if (Array.isArray(base) || Array.isArray(over)) return over;
  if (typeof base === "object" && typeof over === "object"){
    const out = Object.assign({}, base);
    for (const k of Object.keys(over)) out[k] = deepMerge(base[k], over[k]);
    return out;
  }
  return over;
}
function mergeInto(target, src){
  if (!src) return target;
  for (const k of Object.keys(src)){
    const v = src[k];
    if (v === null || typeof v !== "object" || Array.isArray(v)){ target[k] = v; }
    else {
      if (target[k] == null || typeof target[k] !== "object" || Array.isArray(target[k])) target[k] = {};
      mergeInto(target[k], v);
    }
  }
  return target;
}
function isAdminPage(){ return /[?&]admin\b/.test(location.search) || location.hash === "#admin"; }
function toast(msg, ok){
  const t = document.getElementById("admToast");
  if (!t) return;
  t.textContent = msg;
  t.style.borderColor = ok === false ? "#c0392b" : "#2fbf71";
  t.style.background = ok === false ? "#2b1210" : "#0e2a1a";
  t.style.color = ok === false ? "#ff8a80" : "#7dffb0";
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove("show"), 4200);
}
function b64encode(str){
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

// ---------------- SHA-256 (funciona em qualquer contexto, inclusive file://) ----------------
const SHA_K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
function toUtf8(s){
  const n=s.length, out=[];
  for(let i=0;i<n;i++){
    let c=s.charCodeAt(i);
    if(c<0x80){ out.push(c); }
    else if(c<0x800){ out.push(0xc0|c>>6, 0x80|c&63); }
    else if(c>=0xd800 && c<=0xdbff && i+1<n){
      const c2=s.charCodeAt(i+1);
      if(c2>=0xdc00 && c2<=0xdfff){
        const cp=0x10000+((c-0xd800)<<10)+(c2-0xdc00);
        out.push(0xf0|cp>>18, 0x80|cp>>12&63, 0x80|cp>>6&63, 0x80|cp&63); i++;
      } else out.push(0xe0|c>>12, 0x80|c>>6&63, 0x80|c&63);
    } else out.push(0xe0|c>>12, 0x80|c>>6&63, 0x80|c&63);
  }
  return new Uint8Array(out);
}
function sha256Bytes(bytes){
  function rotr(x,n){ return (x>>>n)|(x<<(32-n)); }
  const ml=bytes.length*8;
  const totalBytes=((ml+65+511)>>9)<<6;
  const buf=new Uint8Array(totalBytes);
  buf.set(bytes);
  buf[bytes.length]=0x80;
  const dv=new DataView(buf.buffer);
  dv.setUint32(buf.length-8, Math.floor(ml/4294967296));
  dv.setUint32(buf.length-4, ml>>>0);
  let h0=0x6a09e667,h1=0xbb67ae85,h2=0x3c6ef372,h3=0xa54ff53a,h4=0x510e527f,h5=0x9b05688c,h6=0x1f83d9ab,h7=0x5be0cd19;
  const w=new Uint32Array(64);
  for(let i=0;i<buf.length;i+=64){
    for(let j=0;j<16;j++) w[j]=dv.getUint32(i+j*4);
    for(let j=16;j<64;j++){
      const s0=rotr(w[j-15],7)^rotr(w[j-15],18)^(w[j-15]>>>3);
      const s1=rotr(w[j-2],17)^rotr(w[j-2],19)^(w[j-2]>>>10);
      w[j]=(w[j-16]+s0+w[j-7]+s1)>>>0;
    }
    let a=h0,b=h1,c=h2,d=h3,e=h4,f=h5,g=h6,h=h7;
    for(let j=0;j<64;j++){
      const S1=rotr(e,6)^rotr(e,11)^rotr(e,25);
      const ch=(e&f)^(~e&g);
      const t1=(h+S1+ch+SHA_K[j]+w[j])>>>0;
      const S0=rotr(a,2)^rotr(a,13)^rotr(a,22);
      const maj=(a&b)^(a&c)^(b&c);
      const t2=(S0+maj)>>>0;
      h=g; g=f; f=e; e=(d+t1)>>>0; d=c; c=b; b=a; a=(t1+t2)>>>0;
    }
    h0=(h0+a)>>>0; h1=(h1+b)>>>0; h2=(h2+c)>>>0; h3=(h3+d)>>>0;
    h4=(h4+e)>>>0; h5=(h5+f)>>>0; h6=(h6+g)>>>0; h7=(h7+h)>>>0;
  }
  return [h0,h1,h2,h3,h4,h5,h6,h7].map(x=>(x>>>0).toString(16).padStart(8,"0")).join("");
}
function sha256hex(s){ return sha256Bytes(toUtf8(s)); }

// ---------------- extração dos padrões direto do HTML ----------------
function extractTier(card){
  const q = s => card.querySelector(s);
  const qa = s => Array.prototype.slice.call(card.querySelectorAll(s));
  const t = el => el ? el.textContent.trim() : "";
  const smalls = qa(".tier-price small");
  return {
    name: t(q("h3")),
    tag: t(q(".tier-tag")),
    featured: card.classList.contains("featured"),
    for: t(q(".for")),
    features: qa(".tier-list li").map(t),
    priceLabel: smalls[0] ? t(smalls[0]) : "",
    price: t(q(".tier-price .grad-text")),
    priceSuffix: smalls.length > 1 ? t(smalls[1]) : "",
    cta: t(q(".tier-cta")),
  };
}
function secHeadFields(sec, titleSel){
  const q = s => sec.querySelector(s);
  const t = el => el ? el.textContent.trim() : "";
  const h = q(titleSel || ".sec-title");
  return {
    eyebrow: t(q(".sec-eyebrow")),
    t1: h ? t(h.childNodes[0]) : "",
    br: h ? !!h.querySelector("br") : false,
    grad: h && h.querySelector(".grad-text") ? t(h.querySelector(".grad-text")) : "",
    sub: t(q(".sec-sub")),
  };
}
function extractFromDOM(){
  const q = s => document.querySelector(s);
  const qa = s => Array.prototype.slice.call(document.querySelectorAll(s));
  const t = el => el ? el.textContent.trim() : "";
  const num = el => {
    if (!el) return "";
    const d = el.getAttribute && el.getAttribute("data-count");
    return d || t(el);
  };
  const C = {};

  const firstWa = q('a[href^="https://wa.me/"]');
  const waMatch = firstWa && firstWa.getAttribute("href").match(/wa\.me\/(\d+)/);
  const G = C.geral = {};
  G.waNumber = waMatch ? waMatch[1] : "";

  const sec = document.getElementById("contato");
  const lis = sec ? qa(".contact-list li", sec) : [];
  G.waDisplay = lis[0] ? t(lis[0].querySelector("span")) : "";
  G.logo = q(".brand-mark") ? q(".brand-mark").getAttribute("src") : "";
  const vid = q(".bg-video source");
  G.bgVideo = vid ? vid.getAttribute("src") : "";

  const H = C.hero = {};
  H.badge = t(q(".hero-badge"));
  const h1 = q(".hero h1");
  H.h1a = h1 ? t(h1.childNodes[0]) : "";
  H.h1b = h1 && h1.querySelector(".grad-text") ? t(h1.querySelector(".grad-text")) : "";
  H.h1c = h1 && h1.childNodes.length ? t(h1.childNodes[h1.childNodes.length - 1]) : "";
  H.lead = t(q(".hero .lead"));
  H.stats = qa(".hero-stats .stat").map(st => ({
    num: num(st.querySelector("b")),
    label: t(st.querySelector("span")),
  }));

  const mt = document.getElementById("marqueeTrack");
  const mtSpan = mt ? mt.querySelector("span") : null;
  C.marquee = mtSpan ? mtSpan.textContent.split("✦").map(s => s.trim()).filter(Boolean) : [];

  const allLogos = qa("#logosTrack .brand-logo");
  C.logos = allLogos.slice(0, Math.max(1, Math.ceil(allLogos.length / 2))).map(l => {
    const im = l.querySelector("img");
    const st = l.getAttribute("style") || "";
    const g = (st.match(/--glow:\s*([^;]+)/) || [])[1] || "";
    return { img: im ? im.getAttribute("src") : "", alt: im ? im.getAttribute("alt") : "", glow: g.trim() };
  });

  const S = C.services = {};
  S.tabs = qa(".svc-tab").map(b => t(b));
  S.section = secHeadFields(document.getElementById("servicos"));
  ["sites","logo","ads","maps","rotulos","conteudo"].forEach(k => {
    const grid = q('.svc-panel[data-panel="' + k + '"] .tier-grid');
    S[k] = grid ? Array.prototype.slice.call(grid.querySelectorAll(".tier-card")).map(extractTier) : [];
  });

  C.portfolioSection = secHeadFields(document.getElementById("projetos"));

  C.projects = qa(".project-card").map(card => ({
    cat: card.getAttribute("data-cat") || "",
    chip: t(card.querySelector(".proj-chip")),
    title: t(card.querySelector(".proj-info h3")),
    desc: t(card.querySelector(".proj-info p")),
    tags: Array.prototype.slice.call(card.querySelectorAll(".mini-tags em")).map(t),
  }));

  const box = q(".cta-box");
  const bh2 = box ? box.querySelector("h2") : null;
  C.cta = {
    eyebrow: box ? t(box.querySelector(".sec-eyebrow")) : "",
    t1: bh2 ? t(bh2.childNodes[0]) : "",
    grad: bh2 && bh2.querySelector(".grad-text") ? t(bh2.querySelector(".grad-text")) : "",
    t2: bh2 && bh2.childNodes.length ? t(bh2.childNodes[bh2.childNodes.length - 1]) : "",
    p: box ? t(box.querySelector("p")) : "",
    btn: box ? t(box.querySelector(".btn")) : "",
  };

  const ct2 = sec ? sec.querySelector("h2") : null;
  C.contact = {
    eyebrow: sec ? t(sec.querySelector(".sec-eyebrow")) : "",
    t1: ct2 ? t(ct2.childNodes[0]) : "",
    grad: ct2 && ct2.querySelector(".grad-text") ? t(ct2.querySelector(".grad-text")) : "",
    p: sec ? t(sec.querySelector(".contact-info > p")) : "",
    waLabel: lis[0] ? t(lis[0].querySelector("b")) : "",
    atendimentoLabel: lis[1] ? t(lis[1].querySelector("b")) : "",
    atendimento: lis[1] ? t(lis[1].querySelector("span")) : "",
    localLabel: lis[2] ? t(lis[2].querySelector("b")) : "",
    local: lis[2] ? t(lis[2].querySelector("span")) : "",
    formTitle: sec ? t(sec.querySelector(".contact-form h3")) : "",
    formHint: sec ? t(sec.querySelector(".contact-form .hint")) : "",
  };

  const made = q(".foot-bottom .made");
  const footPs = qa(".foot-bottom p");
  C.footer = {
    desc: q(".foot-brand p") ? t(q(".foot-brand p")) : "",
    rights: footPs[0] ? t(footPs[0]) : "",
    made1: made && made.childNodes[0] ? t(made.childNodes[0]) : "",
    madeBold: made && made.querySelector("b") ? t(made.querySelector("b")) : "",
    made2: made && made.childNodes.length > 1 ? t(made.childNodes[made.childNodes.length - 1]) : "",
  };

  return C;
}

// ---------------- aplica o conteúdo no site ----------------
function applySecHead(sec, s){
  if (!sec || !s) return;
  const ey = sec.querySelector(".sec-eyebrow");
  if (ey && s.eyebrow != null) ey.textContent = s.eyebrow;
  const h2 = sec.querySelector(".sec-title");
  if (h2) h2.innerHTML = esc(s.t1) + (s.br ? "<br>" : " ") + '<span class="grad-text">' + esc(s.grad) + "</span>";
  const sub = sec.querySelector(".sec-sub");
  if (sub && s.sub != null) sub.textContent = s.sub;
}
function applyContent(c){
  if (!c) return;
  const G = c.geral || {};
  const num = String(G.waNumber || "5517991704631").replace(/\D/g, "");
  window.__waNumber = num;

  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
    a.href = a.href.replace(/https:\/\/wa\.me\/\d+/, "https://wa.me/" + num);
  });

  if (G.logo) document.querySelectorAll(".brand-mark, .hero-logo img, .foot-brand .brand-mark").forEach(im => { im.src = G.logo; });
  if (G.bgVideo) {
    const src = document.querySelector(".bg-video source");
    if (src) { src.src = G.bgVideo; const v = src.closest("video"); if (v) v.load(); }
  }

  if (c.hero) {
    const H = c.hero;
    const badge = document.querySelector(".hero-badge");
    if (badge) badge.innerHTML = '<span class="dot"></span> ' + esc(H.badge);
    const h1 = document.querySelector(".hero h1");
    if (h1) h1.innerHTML = esc(H.h1a) + '<br><span class="grad-text">' + esc(H.h1b) + "</span> " + esc(H.h1c);
    const lead = document.querySelector(".hero .lead");
    if (lead) lead.textContent = H.lead;
    const stats = document.querySelectorAll(".hero-stats .stat");
    if (H.stats) H.stats.forEach((s, i) => {
      if (!stats[i]) return;
      const b = stats[i].querySelector("b"), sp = stats[i].querySelector("span");
      if (b) { b.textContent = s.num; b.setAttribute("data-count", String(s.num).replace(/\D/g, "")); }
      if (sp) sp.textContent = s.label;
    });
  }

  if (c.marquee) {
    const tr = document.getElementById("marqueeTrack");
    if (tr) {
      const items = (Array.isArray(c.marquee) ? c.marquee : []).map(x => String(x).trim()).filter(Boolean);
      const span = "<span>" + items.map(esc).join(" <i>✦</i> ") + " &nbsp;</span>";
      tr.innerHTML = span + span;
    }
  }

  if (c.logos) {
    const tr = document.getElementById("logosTrack");
    if (tr) {
      const items = (Array.isArray(c.logos) ? c.logos : []).map(l =>
        '<span class="brand-logo" style="--glow:' + esc(l.glow || "#38BDF8") + '"><img src="' + esc(l.img) + '" alt="' + esc(l.alt) + '"></span>'
      ).join("");
      tr.innerHTML = items + items;
    }
  }

  if (c.services) {
    const names = c.services.tabs || [];
    document.querySelectorAll(".svc-tab").forEach((b, i) => { if (names[i]) b.textContent = names[i]; });
    applySecHead(document.getElementById("servicos"), c.services.section);
    ["sites","logo","ads","maps","rotulos","conteudo"].forEach(k => {
      const grid = document.querySelector('.svc-panel[data-panel="' + k + '"] .tier-grid');
      if (!grid) return;
      const cards = grid.querySelectorAll(".tier-card");
      (c.services[k] || []).forEach((tier, i) => {
        const card = cards[i]; if (!card) return;
        const h3 = card.querySelector("h3"); if (h3) h3.textContent = tier.name;
        const f = card.querySelector(".for"); if (f) f.textContent = tier.for;
        const lis = card.querySelectorAll(".tier-list li");
        (tier.features || []).forEach((fe, j) => { if (lis[j]) lis[j].textContent = fe; });
        const tp = card.querySelector(".tier-price");
        if (tp) tp.innerHTML = "<small>" + esc(tier.priceLabel || "a partir de") + '</small><b><span class="grad-text">' + esc(tier.price) + "</span></b>" + (tier.priceSuffix ? "<small>" + esc(tier.priceSuffix) + "</small>" : "");
        const cta = card.querySelector(".tier-cta");
        if (cta) { cta.textContent = tier.cta; cta.href = "https://wa.me/" + num + "?text=" + encodeURIComponent("Olá, BATISTA.DIGITAL! Quero " + tier.name + "."); }
        const tag = card.querySelector(".tier-tag");
        if (tier.featured) {
          card.classList.add("featured");
          if (tier.tag && String(tier.tag).trim()) {
            if (!tag) { const sp = document.createElement("span"); sp.className = "tier-tag"; sp.textContent = tier.tag; card.insertBefore(sp, card.firstChild); }
            else tag.textContent = tier.tag;
          } else if (tag) tag.remove();
        } else {
          card.classList.remove("featured");
          if (tag) tag.remove();
        }
      });
    });
  }

  if (c.portfolioSection) applySecHead(document.getElementById("projetos"), c.portfolioSection);

  if (c.projects) {
    const cards = document.querySelectorAll(".project-card");
    c.projects.forEach((p, i) => {
      const card = cards[i]; if (!card) return;
      card.setAttribute("data-cat", p.cat || "sites");
      const chip = card.querySelector(".proj-chip"); if (chip) chip.textContent = p.chip;
      const h3 = card.querySelector(".proj-info h3"); if (h3) h3.textContent = p.title;
      const pd = card.querySelector(".proj-info p"); if (pd) pd.textContent = p.desc;
      const mt = card.querySelector(".mini-tags");
      if (mt && p.tags) mt.innerHTML = (Array.isArray(p.tags) ? p.tags : []).map(x => "<em>" + esc(x) + "</em>").join("");
    });
  }

  if (c.cta) {
    const box = document.querySelector(".cta-box");
    if (box) {
      const ey = box.querySelector(".sec-eyebrow"); if (ey) ey.textContent = c.cta.eyebrow;
      const h2 = box.querySelector("h2");
      if (h2) h2.innerHTML = esc(c.cta.t1) + '<span class="grad-text">' + esc(c.cta.grad) + "</span>" + esc(c.cta.t2 || "");
      const p = box.querySelector("p"); if (p) p.textContent = c.cta.p;
      const b = box.querySelector(".btn"); if (b) b.textContent = c.cta.btn;
    }
  }

  if (c.contact) {
    const sec = document.getElementById("contato");
    if (sec) {
      const ey = sec.querySelector(".sec-eyebrow"); if (ey) ey.textContent = c.contact.eyebrow;
      const h2 = sec.querySelector("h2");
      if (h2) h2.innerHTML = esc(c.contact.t1) + '<span class="grad-text">' + esc(c.contact.grad) + "</span>";
      const p = sec.querySelector(".contact-info > p"); if (p) p.textContent = c.contact.p;
      const lis = sec.querySelectorAll(".contact-list li");
      if (lis[0]) { const b = lis[0].querySelector("b"), sp = lis[0].querySelector("span"); if (b) b.textContent = c.contact.waLabel || "WhatsApp"; if (sp) sp.textContent = G.waDisplay; }
      if (lis[1]) { const b = lis[1].querySelector("b"), sp = lis[1].querySelector("span"); if (b) b.textContent = c.contact.atendimentoLabel; if (sp) sp.textContent = c.contact.atendimento; }
      if (lis[2]) { const b = lis[2].querySelector("b"), sp = lis[2].querySelector("span"); if (b) b.textContent = c.contact.localLabel; if (sp) sp.textContent = c.contact.local; }
      const ft = sec.querySelector(".contact-form h3"); if (ft) ft.textContent = c.contact.formTitle;
      const fh = sec.querySelector(".contact-form .hint"); if (fh) fh.textContent = c.contact.formHint;
    }
  }

  if (c.footer) {
    const d = document.querySelector(".foot-brand p"); if (d) d.textContent = c.footer.desc;
    const r = document.querySelector(".foot-bottom p"); if (r) r.textContent = c.footer.rights;
    const m = document.querySelector(".foot-bottom .made");
    if (m) m.innerHTML = esc(c.footer.made1) + " <b>" + esc(c.footer.madeBold) + "</b> " + esc(c.footer.made2);
  }
}
function waLink(text){
  return "https://wa.me/" + (window.__waNumber || "5517991704631") + "?text=" + encodeURIComponent(text);
}

// ---------------- estado + configuração do GitHub ----------------
let content = {};
let DEFAULTS = {};
let adminAuthed = false;
let cfg = loadCfg();

function loadCfg(){
  try {
    const c = JSON.parse(localStorage.getItem(CFG_KEY) || "{}");
    return { repo: "", branch: "main", token: "", ...c };
  } catch (e) { return { repo: "", branch: "main", token: "" }; }
}
function saveCfg(){ try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch (e) {} }
function ghReady(){ return !!(cfg.token && cfg.repo); }

// ---------------- carregamento do conteúdo publicado ----------------
async function loadRemoteContent(){
  const paths = ["content.json", "src/content.json"];
  for (const p of paths) {
    try {
      const res = await fetch(p + "?v=" + Date.now(), { cache: "no-store" });
      if (!res.ok) continue;
      const data = await res.json();
      if (data && typeof data === "object" && !Array.isArray(data)) {
        mergeInto(content, deepMerge(clone(DEFAULTS), data));
        applyContent(content);
        if (adminAuthed && document.getElementById("admBody")) rebuildEditor();
        return;
      }
    } catch (e) { /* tenta o próximo caminho */ }
  }
}

// ---------------- API do GitHub ----------------
async function ghFetch(apiPath, opts){
  const res = await fetch("https://api.github.com" + apiPath, {
    headers: Object.assign({ Authorization: "Bearer " + cfg.token, Accept: "application/vnd.github+json" }, opts && opts.headers),
    method: opts && opts.method || "GET",
    body: opts && opts.body,
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    let msg = "GitHub " + res.status;
    try { const e = await res.json(); if (e && e.message) msg = e.message; } catch (err) {}
    throw new Error(msg);
  }
  return res.json();
}
async function ghGetFile(path){
  return ghFetch("/repos/" + cfg.repo + "/contents/" + path + "?ref=" + encodeURIComponent(cfg.branch));
}
async function ghPutFile(path, contentB64, message){
  const existing = await ghGetFile(path);
  const body = { message, content: contentB64, branch: cfg.branch };
  if (existing) body.sha = existing.sha;
  return ghFetch("/repos/" + cfg.repo + "/contents/" + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
async function saveToGithub(){
  await ghPutFile("content.json", b64encode(JSON.stringify(content, null, 2)), "Atualização do conteúdo do site (painel admin)");
}
async function ghUploadFile(file){
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const safe = (file.name || "arquivo").replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = "content/" + Date.now() + "-" + safe;
  await ghPutFile(path, btoa(bin), "Upload via painel admin: " + file.name);
  return "https://raw.githubusercontent.com/" + cfg.repo + "/" + cfg.branch + "/" + path;
}
function downloadContentJson(){
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "content.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// ---------------- CSS do painel ----------------
const CSS = `
#adminOverlay{position:fixed;inset:0;z-index:2147483000;background:rgba(6,8,18,.975);color:#eef;font-family:'Inter',sans-serif;overflow:auto;text-align:left}
#adminOverlay *{box-sizing:border-box}
.adm-login{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.adm-card{width:min(420px,100%);background:#12121f;border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px;box-shadow:0 30px 80px rgba(0,0,0,.6);text-align:center}
.adm-card h2{font-family:'Space Grotesk',sans-serif;font-size:22px;margin:12px 0 6px;letter-spacing:-.3px}
.adm-card p{color:#9a9ab0;font-size:14px;line-height:1.6;margin-bottom:20px}
.adm-logo{width:56px;height:56px;margin:0 auto;border-radius:16px;background:linear-gradient(135deg,#38BDF8,#1D4ED8);display:flex;align-items:center;justify-content:center;font-size:24px}
#adminOverlay input[type=text],#adminOverlay input[type=password],#adminOverlay textarea,#adminOverlay select{width:100%;background:#0d0d1c;border:1px solid rgba(255,255,255,.12);border-radius:10px;color:#eef;font-family:'Inter',sans-serif;font-size:14px;padding:11px 13px;outline:none;margin-bottom:12px}
#adminOverlay input:focus,#adminOverlay textarea:focus{border-color:#38BDF8}
#adminOverlay textarea{min-height:76px;resize:vertical;line-height:1.5}
#adminOverlay input[type=checkbox]{width:20px;height:20px;accent-color:#38BDF8;margin-bottom:12px}
.adm-btn{background:linear-gradient(135deg,#38BDF8,#1D4ED8);color:#fff;border:none;border-radius:11px;padding:12px 18px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:.2s}
.adm-btn:hover{filter:brightness(1.12)}
.adm-btn.ghost{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);color:#eef}
.adm-btn.sm{padding:7px 11px;font-size:12px;border-radius:8px}
.adm-btn.xs{padding:3px 9px;font-size:11px}
.adm-btn.save{font-size:15px;padding:13px 24px}
.adm-btn:disabled{opacity:.5;cursor:default;filter:none}
.adm-err{color:#ff6b6b;font-size:13px;margin-top:12px;min-height:18px}
.adm-panel{max-width:920px;margin:0 auto;padding:0 18px 120px}
.adm-top{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:18px 0;background:rgba(6,8,18,.96);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.1)}
.adm-title b{font-family:'Space Grotesk',sans-serif;font-size:18px;display:block}
.adm-title span{color:#9a9ab0;font-size:12.5px}
.adm-actions{display:flex;gap:10px;flex-wrap:wrap}
.adm-body{margin-top:22px;display:flex;flex-direction:column;gap:14px}
.adm-group{background:#12121f;border:1px solid rgba(255,255,255,.1);border-radius:14px;overflow:hidden}
.adm-group summary{cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;padding:14px 18px;background:linear-gradient(90deg,rgba(56,189,248,.12),transparent);list-style:none}
.adm-group summary::-webkit-details-marker{display:none}
.adm-group summary::before{content:"▸ ";color:#38BDF8}
.adm-group[open] summary::before{content:"▾ "}
.adm-group-body{padding:16px 18px 10px;display:flex;flex-direction:column;gap:2px}
.adm-label{font-size:12.5px;font-weight:600;color:#9a9ab0;margin:10px 0 6px;letter-spacing:.2px}
.adm-item{background:#17172b;border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px 14px 6px;margin-bottom:10px}
.adm-item-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}
.adm-item-head b{font-size:13px;color:#7DD3FC}
.adm-item-btns{display:flex;gap:6px}
.adm-media{display:flex;flex-direction:column;gap:8px}
.adm-preview img,.adm-preview video{max-width:230px;max-height:130px;border-radius:10px;border:1px solid rgba(255,255,255,.12)}
.adm-prev-none{color:#6b6b80;font-size:12px;font-style:italic}
.adm-up-status{font-size:12px;color:#7DD3FC;min-height:16px}
.adm-hint{font-size:11px;color:#6b6b80;margin:-6px 0 8px}
.adm-toast{position:fixed;left:50%;bottom:30px;transform:translateX(-50%) translateY(90px);padding:13px 24px;border-radius:12px;font-size:14px;font-weight:600;transition:.3s;opacity:0;z-index:10;pointer-events:none;font-family:'Inter',sans-serif;max-width:92vw}
.adm-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
@media(max-width:560px){.adm-top{position:static}.adm-actions{width:100%}.adm-actions .adm-btn{flex:1;padding:10px 8px;font-size:12.5px}}
`;

// ---------------- editor de formulário ----------------
const TIER_FIELDS = [
  {key:"name", label:"Nome do plano", type:"text"},
  {key:"tag", label:"Texto do selo (deixe vazio para não mostrar)", type:"text"},
  {key:"featured", label:"Mostrar como plano em destaque", type:"bool"},
  {key:"for", label:"Descrição curta", type:"text"},
  {key:"features", label:"Itens incluídos", type:"list", itemLabel:"Item", fields:null},
  {key:"priceLabel", label:"Antes do preço (ex: a partir de)", type:"text"},
  {key:"price", label:"Preço (ex: R$ 449)", type:"text"},
  {key:"priceSuffix", label:"Depois do preço (ex: /mês)", type:"text"},
  {key:"cta", label:"Texto do botão", type:"text"},
];
const SCHEMA = [
  {key:"geral", label:"⚙️ Geral", type:"group", fields:[
    {key:"waNumber", label:"WhatsApp (só números, ex: 5517991704631)", type:"text"},
    {key:"waDisplay", label:"WhatsApp exibido no site (ex: +55 17 99170-4631)", type:"text"},
    {key:"logo", label:"Logo da marca", type:"media", media:"image"},
    {key:"bgVideo", label:"Vídeo de fundo", type:"media", media:"video"},
  ]},
  {key:"hero", label:"🏠 Hero (primeira tela)", type:"group", fields:[
    {key:"badge", label:"Selinho (linha de cima)", type:"text"},
    {key:"h1a", label:"Título — linha 1", type:"text"},
    {key:"h1b", label:"Título — parte em destaque", type:"text"},
    {key:"h1c", label:"Título — final", type:"text"},
    {key:"lead", label:"Parágrafo de apoio", type:"textarea"},
    {key:"stats", label:"Números (120 projetos, etc.)", type:"list", itemLabel:"Número", fields:[
      {key:"num", label:"Valor (ex: 120 ou 24h)", type:"text"},
      {key:"label", label:"Legenda", type:"text"},
    ]},
  ]},
  {key:"marquee", label:"➡️ Faixa deslizante de serviços", type:"list", itemLabel:"Item", fields:null},
  {key:"logos", label:"🤝 Logos de clientes", type:"list", itemLabel:"Logo", fields:[
    {key:"img", label:"Imagem", type:"media", media:"image"},
    {key:"alt", label:"Nome do cliente", type:"text"},
    {key:"glow", label:"Cor do brilho (ex: #f59e0b)", type:"text"},
  ]},
  {key:"services", label:"🧰 Serviços (planos e preços)", type:"group", fields:[
    {key:"tabs", label:"Nomes das abas", type:"list", itemLabel:"Aba", fields:null},
    {key:"section", label:"Cabeçalho da seção", type:"group", fields:[
      {key:"eyebrow", label:"Rótulo (ex: Serviços)", type:"text"},
      {key:"t1", label:"Título — parte 1", type:"text"},
      {key:"grad", label:"Título — parte em destaque", type:"text"},
      {key:"sub", label:"Subtítulo", type:"textarea"},
    ]},
    {key:"sites", label:"Criação de Sites", type:"list", itemLabel:"Plano", fields:TIER_FIELDS},
    {key:"logo", label:"Logomarca", type:"list", itemLabel:"Plano", fields:TIER_FIELDS},
    {key:"ads", label:"ADS · Tráfego Pago", type:"list", itemLabel:"Plano", fields:TIER_FIELDS},
    {key:"maps", label:"Google Maps", type:"list", itemLabel:"Plano", fields:TIER_FIELDS},
    {key:"rotulos", label:"Designer de Rótulos", type:"list", itemLabel:"Plano", fields:TIER_FIELDS},
    {key:"conteudo", label:"Conteúdo Digital", type:"list", itemLabel:"Plano", fields:TIER_FIELDS},
  ]},
  {key:"portfolioSection", label:"🗂️ Cabeçalho do Portfólio", type:"group", fields:[
    {key:"eyebrow", label:"Rótulo", type:"text"},
    {key:"t1", label:"Título — parte 1", type:"text"},
    {key:"grad", label:"Título — parte em destaque", type:"text"},
    {key:"sub", label:"Subtítulo", type:"textarea"},
  ]},
  {key:"projects", label:"🖼️ Portfólio (projetos)", type:"list", itemLabel:"Projeto", fields:[
    {key:"chip", label:"Etiqueta (ex: Site, Logomarca...)", type:"text"},
    {key:"title", label:"Título", type:"text"},
    {key:"desc", label:"Descrição", type:"textarea"},
    {key:"cat", label:"Categoria", type:"text", hint:"sites, logo, rotulos, ads, maps ou conteudo"},
    {key:"tags", label:"Tags", type:"list", itemLabel:"Tag", fields:null},
  ]},
  {key:"cta", label:"🚀 Faixa CTA (chamada final)", type:"group", fields:[
    {key:"eyebrow", label:"Rótulo", type:"text"},
    {key:"t1", label:"Título — parte 1", type:"text"},
    {key:"grad", label:"Título — parte em destaque", type:"text"},
    {key:"t2", label:"Título — final", type:"text"},
    {key:"p", label:"Texto", type:"textarea"},
    {key:"btn", label:"Texto do botão", type:"text"},
  ]},
  {key:"contact", label:"✉️ Contato", type:"group", fields:[
    {key:"eyebrow", label:"Rótulo", type:"text"},
    {key:"t1", label:"Título — parte 1", type:"text"},
    {key:"grad", label:"Título — parte em destaque", type:"text"},
    {key:"p", label:"Texto", type:"textarea"},
    {key:"waLabel", label:"Rótulo do WhatsApp", type:"text"},
    {key:"atendimentoLabel", label:"Rótulo do Atendimento", type:"text"},
    {key:"atendimento", label:"Horário de atendimento", type:"text"},
    {key:"localLabel", label:"Rótulo da Localização", type:"text"},
    {key:"local", label:"Localização", type:"text"},
    {key:"formTitle", label:"Título do formulário", type:"text"},
    {key:"formHint", label:"Texto do formulário", type:"textarea"},
  ]},
  {key:"footer", label:"🧾 Rodapé", type:"group", fields:[
    {key:"desc", label:"Descrição", type:"textarea"},
    {key:"rights", label:"Linha de direitos", type:"text"},
    {key:"made1", label:"Texto antes do destaque", type:"text"},
    {key:"madeBold", label:"Palavra em destaque", type:"text"},
    {key:"made2", label:"Texto depois do destaque", type:"text"},
  ]},
];

let _deb = null;
function onChange(){
  clearTimeout(_deb);
  _deb = setTimeout(() => applyContent(content), 150);
}

function renderField(def, node, writeFn, onChange){
  if (def.type === "group") {
    const fs = document.createElement("details");
    fs.className = "adm-group";
    fs.open = true;
    const lg = document.createElement("summary");
    lg.textContent = def.label;
    const body = document.createElement("div");
    body.className = "adm-group-body";
    for (const c of def.fields) {
      body.appendChild(renderField(c, node[c.key], (v) => { node[c.key] = v; }, onChange));
    }
    fs.append(lg, body);
    return fs;
  }

  if (def.type === "list") {
    const wrap = document.createElement("div");
    wrap.className = "adm-field adm-list";
    const label = document.createElement("div");
    label.className = "adm-label";
    label.textContent = def.label;
    const items = document.createElement("div");
    items.className = "adm-items";
    const addBtn = document.createElement("button");
    addBtn.className = "adm-btn ghost sm";
    addBtn.textContent = "+ Adicionar " + (def.itemLabel || "item");
    addBtn.onclick = () => { node.push(def.fields ? {} : ""); renderItems(); onChange(); };

    function renderItems() {
      items.innerHTML = "";
      node.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "adm-item";
        const head = document.createElement("div");
        head.className = "adm-item-head";
        const lbl = document.createElement("b");
        lbl.textContent = (def.itemLabel || "Item") + " " + (idx + 1);
        const btns = document.createElement("div");
        btns.className = "adm-item-btns";
        const mk = (txt, fn) => {
          const b = document.createElement("button");
          b.className = "adm-btn ghost xs";
          b.textContent = txt;
          b.onclick = () => { fn(); renderItems(); onChange(); };
          return b;
        };
        btns.append(
          mk("↑", () => { if (idx > 0) { node.splice(idx, 1); node.splice(idx - 1, 0, item); } }),
          mk("↓", () => { if (idx < node.length - 1) { node.splice(idx, 1); node.splice(idx + 1, 0, item); } }),
          mk("✕ remover", () => { node.splice(idx, 1); })
        );
        head.append(lbl, btns);
        card.appendChild(head);
        if (def.fields == null) {
          const inp = document.createElement("input");
          inp.type = "text";
          inp.value = item == null ? "" : item;
          inp.addEventListener("input", () => { node[idx] = inp.value; onChange(); });
          card.appendChild(inp);
        } else {
          for (const f of def.fields) {
            card.appendChild(renderField(f, item[f.key], (v) => { item[f.key] = v; }, onChange));
          }
        }
        items.appendChild(card);
      });
    }
    renderItems();
    wrap.append(label, items, addBtn);
    return wrap;
  }

  const wrap = document.createElement("div");
  wrap.className = "adm-field";
  const label = document.createElement("div");
  label.className = "adm-label";
  label.textContent = def.label;

  if (def.type === "bool") {
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = !!node;
    box.addEventListener("change", () => { writeFn(box.checked); onChange(); });
    wrap.append(label, box);
    return wrap;
  }

  if (def.type === "media") {
    const row = document.createElement("div");
    row.className = "adm-media";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = def.media === "video" ? "URL do vídeo (mp4)" : "URL da imagem";
    input.value = node || "";
    const prev = document.createElement("div");
    prev.className = "adm-preview";
    const upBtn = document.createElement("button");
    upBtn.type = "button";
    upBtn.className = "adm-btn ghost sm";
    upBtn.textContent = "📁 Enviar do computador";
    const file = document.createElement("input");
    file.type = "file";
    file.accept = def.media === "video" ? "video/mp4,video/webm,video/ogg" : "image/*";
    file.hidden = true;
    const status = document.createElement("span");
    status.className = "adm-up-status";
    function setPrev() {
      prev.innerHTML = "";
      const v = input.value.trim();
      if (def.media === "video" && v) {
        const vid = document.createElement("video");
        vid.src = v; vid.muted = true; vid.controls = true; vid.playsInline = true;
        prev.appendChild(vid);
      } else if (v) {
        const im = document.createElement("img");
        im.src = v;
        im.onerror = () => { prev.innerHTML = '<span class="adm-prev-none">não foi possível carregar a imagem</span>'; };
        prev.appendChild(im);
      } else {
        prev.innerHTML = '<span class="adm-prev-none">nenhuma ' + (def.media === "video" ? "imagem/vídeo" : "imagem") + ' definida</span>';
      }
    }
    setPrev();
    input.addEventListener("input", () => { writeFn(input.value); setPrev(); onChange(); });
    upBtn.onclick = () => {
      if (!ghReady()) {
        status.textContent = "Configure o GitHub (acima) para enviar arquivos do computador, ou cole uma URL.";
        return;
      }
      file.click();
    };
    file.onchange = async () => {
      const f = file.files[0];
      if (!f) return;
      status.textContent = "Enviando para o GitHub...";
      upBtn.disabled = true;
      try {
        const url = await ghUploadFile(f);
        status.textContent = "Enviado! ✔";
        input.value = url;
        writeFn(url);
        setPrev();
        onChange();
      } catch (e) {
        status.textContent = "Erro no envio: " + (e.message || e);
      }
      upBtn.disabled = false;
      file.value = "";
    };
    row.append(input, prev, upBtn, file, status);
    wrap.append(label, row);
    return wrap;
  }

  let ctl;
  if (def.type === "textarea") ctl = document.createElement("textarea");
  else { ctl = document.createElement("input"); ctl.type = "text"; }
  ctl.value = node == null ? "" : node;
  ctl.addEventListener("input", () => { writeFn(ctl.value); onChange(); });
  wrap.appendChild(label);
  wrap.appendChild(ctl);
  if (def.hint) {
    const hint = document.createElement("div");
    hint.className = "adm-hint";
    hint.textContent = def.hint;
    wrap.appendChild(hint);
  }
  return wrap;
}

function bindEditor(container, schema){
  container.innerHTML = "";
  for (const def of schema) {
    container.appendChild(renderField(def, content[def.key], (v) => { content[def.key] = v; }, onChange));
  }
}
function rebuildEditor(){
  const body = document.getElementById("admBody");
  if (body) bindEditor(body, SCHEMA);
}

// ---------------- painel (config GitHub + login + edição) ----------------
function buildAdmin(){
  const oldOv = document.getElementById("adminOverlay");
  if (oldOv) oldOv.remove();
  const ov = document.createElement("div");
  ov.id = "adminOverlay";
  document.body.appendChild(ov);
  ov.innerHTML =
    '<div class="adm-login" id="admLogin">' +
      '<div class="adm-card">' +
        '<div class="adm-logo">🔐</div>' +
        '<h2>Painel BATISTA.DIGITAL</h2>' +
        '<p>Área restrita. Digite a senha de administrador para editar o site.</p>' +
        '<input type="password" id="admPass" placeholder="Senha" autocomplete="off">' +
        '<button class="adm-btn" id="admLoginBtn" style="width:100%">Entrar</button>' +
        '<div class="adm-err" id="admErr"></div>' +
      '</div>' +
    '</div>' +
    '<div class="adm-panel" id="admPanel" hidden>' +
      '<div class="adm-top">' +
        '<div class="adm-title"><b>✏️ Edição do site</b><span>Salve e o site publicado atualiza para todos.</span></div>' +
        '<div class="adm-actions">' +
          '<button class="adm-btn ghost" id="admResetBtn">↺ Restaurar padrão</button>' +
          '<button class="adm-btn ghost" id="admDlBtn">⬇ Baixar content.json</button>' +
          '<button class="adm-btn ghost" id="admExitBtn">👁 Ver site</button>' +
          '<button class="adm-btn save" id="admSaveBtn">💾 Salvar alterações</button>' +
        '</div>' +
      '</div>' +
      '<div class="adm-body" id="admBody"></div>' +
    '</div>' +
    '<div class="adm-toast" id="admToast"></div>';

  // ---- seção de configuração do GitHub (no topo do editor) ----
  const ghDetails = document.createElement("details");
  ghDetails.className = "adm-group";
  ghDetails.open = true;
  const ghSum = document.createElement("summary");
  ghSum.textContent = "🔐 GitHub (para salvar as edições no seu repositório)";
  const ghBody = document.createElement("div");
  ghBody.className = "adm-group-body";
  ghBody.innerHTML =
    '<div class="adm-label">Repositório (ex: seuusuario/seusite)</div>' +
    '<input type="text" id="ghRepo" placeholder="usuario/repositorio">' +
    '<div class="adm-label">Branch (ex: main)</div>' +
    '<input type="text" id="ghBranch" placeholder="main">' +
    '<div class="adm-label">Token do GitHub (permissão de escrita)</div>' +
    '<input type="password" id="ghToken" placeholder="ghp_..." autocomplete="off">' +
    '<div class="adm-hint">Crie em github.com/settings/tokens → "Generate new token" (marcar a opção "repo"). O token fica salvo apenas no SEU navegador. Sem token, o botão Salvar baixa o content.json para você commitar na mão.</div>' +
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">' +
      '<button class="adm-btn ghost sm" id="ghSaveBtn">💾 Salvar configuração</button>' +
      '<button class="adm-btn ghost sm" id="ghTestBtn">🔌 Testar conexão</button>' +
    '</div>' +
    '<span class="adm-up-status" id="ghStatus"></span>';
  ghDetails.append(ghSum, ghBody);
  ov.querySelector("#admPanel").insertBefore(ghDetails, ov.querySelector("#admBody"));

  const ghRepo = ov.querySelector("#ghRepo");
  const ghBranch = ov.querySelector("#ghBranch");
  const ghToken = ov.querySelector("#ghToken");
  ghRepo.value = cfg.repo;
  ghBranch.value = cfg.branch;
  ghToken.value = cfg.token;
  const ghStatus = ov.querySelector("#ghStatus");
  ov.querySelector("#ghSaveBtn").onclick = () => {
    cfg.repo = ghRepo.value.trim();
    cfg.branch = ghBranch.value.trim() || "main";
    cfg.token = ghToken.value.trim();
    saveCfg();
    ghStatus.textContent = ghReady() ? "Configuração salva ✔" : "Salvo (sem token/repositório) — o Salvar vai baixar o content.json.";
  };
  ov.querySelector("#ghTestBtn").onclick = async () => {
    cfg.repo = ghRepo.value.trim();
    cfg.branch = ghBranch.value.trim() || "main";
    cfg.token = ghToken.value.trim();
    if (!ghReady()) { ghStatus.textContent = "Informe repositório e token primeiro."; return; }
    ghStatus.textContent = "Testando...";
    try {
      await ghFetch("/user");
      ghStatus.textContent = "Conexão OK ✔ — token válido e repositório acessível.";
    } catch (e) {
      ghStatus.textContent = "Falha: " + (e.message || e);
    }
  };
  ov.querySelector("#admDlBtn").onclick = downloadContentJson;

  // ---- login ----
  const pass = ov.querySelector("#admPass");
  const errEl = ov.querySelector("#admErr");
  let loginFails = 0, lockUntil = 0;
  async function doLogin() {
    const pw = pass.value;
    if (!pw) { errEl.textContent = "Digite a senha."; return; }
    if (Date.now() < lockUntil) {
      errEl.textContent = "Muitas tentativas. Aguarde " + Math.ceil((lockUntil - Date.now()) / 1000) + "s.";
      return;
    }
    errEl.textContent = "Verificando...";
    try {
      const h = sha256hex(pw);
      if (h === ADMIN_HASH) {
        errEl.textContent = "";
        loginFails = 0;
        adminAuthed = true;
        ov.querySelector("#admLogin").hidden = true;
        ov.querySelector("#admPanel").hidden = false;
        rebuildEditor();
        toast("Bem-vindo(a)! Edite e clique em Salvar. 🙂");
      } else {
        loginFails++;
        if (loginFails >= 5) lockUntil = Date.now() + 60000;
        errEl.textContent = "Senha incorreta.";
        pass.value = "";
      }
    } catch (e) {
      errEl.textContent = "Erro ao verificar. Recarregue a página e tente novamente.";
    }
  }
  ov.querySelector("#admLoginBtn").onclick = doLogin;
  pass.addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });

  // ---- salvar / restaurar / sair ----
  async function doSave() {
    if (!adminAuthed) { toast("Faça login primeiro.", false); return; }
    const btn = ov.querySelector("#admSaveBtn");
    btn.disabled = true;
    btn.textContent = "Salvando...";
    try {
      if (ghReady()) {
        await saveToGithub();
        toast("✔ Salvo no GitHub! O Pages publica em alguns instantes.");
      } else {
        downloadContentJson();
        toast("content.json baixado — coloque na raiz do repositório (ou configure o GitHub acima).");
      }
    } catch (e) {
      toast("Erro ao salvar: " + (e.message || e), false);
    }
    btn.disabled = false;
    btn.textContent = "💾 Salvar alterações";
  }
  ov.querySelector("#admSaveBtn").onclick = doSave;

  ov.querySelector("#admExitBtn").onclick = () => ov.remove();
  ov.querySelector("#admResetBtn").onclick = async () => {
    if (!confirm("Restaurar TODOS os textos, imagens e o vídeo para o conteúdo padrão? Isso apaga as edições salvas.")) return;
    content = clone(DEFAULTS);
    applyContent(content);
    rebuildEditor();
    doSave();
  };
}

// ---------------- segredo do rodapé: 20 cliques no © baixa o site ----------------
let secClicks = 0, secLast = 0, secBusy = false;
function secStatus(msg){
  let el = document.getElementById("siteDlStatus");
  if (!el) {
    el = document.createElement("div");
    el.id = "siteDlStatus";
    el.style.cssText = "position:fixed;left:50%;bottom:96px;transform:translateX(-50%);z-index:2147483001;background:#0e2a1a;border:1px solid #2fbf71;color:#7dffb0;padding:12px 22px;border-radius:12px;font:600 13px 'Inter',sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.5);display:none;max-width:92vw;text-align:center";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.display = "block";
  clearTimeout(secStatus._t);
  secStatus._t = setTimeout(() => { el.style.display = "none"; }, 6000);
}
async function getIndexHtml(){
  try {
    const r = await fetch("index.html", { cache: "no-store" });
    if (r.ok) return await r.text();
  } catch (e) { /* no GitHub Pages ainda */ }
  // Fallback: reconstruir a partir do DOM atual (funciona no preview do Perchance)
  const mt = document.getElementById("marqueeTrack");
  if (mt) { const spans = mt.querySelectorAll("span"); if (spans.length > 1) mt.innerHTML = spans[0].outerHTML; }
  const lt = document.getElementById("logosTrack");
  if (lt) {
    const logos = Array.prototype.slice.call(lt.querySelectorAll(".brand-logo"));
    if (logos.length > 1) lt.innerHTML = logos.slice(0, Math.ceil(logos.length / 2)).map(l => l.outerHTML).join("");
  }
  const yr = document.getElementById("yearEl");
  if (yr) yr.textContent = "";
  let html = document.body.innerHTML;
  html = html.replace(/https:\/\/perchance\.org\/src\//g, "src/");
  html = html.replace(/https:\/\/[a-z0-9]+\.perchance\.org\/src\//g, "src/");
  return "<!DOCTYPE html>\n" + html;
}
async function buildSiteArchive(){
  if (secBusy) return;
  secBusy = true;
  secStatus("Preparando os arquivos do site...");
  try {
    const zip = await import("https://esm.sh/@zip.js/zip.js@2.7.70");
    const writer = new zip.ZipWriter(new zip.BlobWriter("application/zip"), { password: "BATISTA!@#", encryptionStrength: 3 });
    const addText = async (p, t) => { await writer.add(p, new zip.TextReader(t)); };
    const addBlob = async (p, b) => { await writer.add(p, new zip.BlobReader(b)); };

    secStatus("Gerando index.html...");
    await addText("index.html", await getIndexHtml());

    secStatus("Incluindo arquivos de src/...");
    const srcFiles = [
      "src/admin.js",
      "src/BATISTA-DIGITAL-lp-LOGO.png",
      "src/BATISTA-DIGITAL-nb-LOGO.png",
      "src/BATISTA-DIGITAL_LOGO_11.png"
    ];
    for (const f of srcFiles) {
      try {
        const res = await fetch(f, { cache: "no-store" });
        if (!res.ok) continue;
        const ct = res.headers.get("content-type") || "";
        if (ct.indexOf("image") >= 0 || ct.indexOf("octet") >= 0) await addBlob(f, await res.blob());
        else await addText(f, await res.text());
      } catch (e) {}
    }

    secStatus("Procurando conteúdo salvo (content.json)...");
    for (const f of ["content.json", "src/content.json"]) {
      try {
        const res = await fetch(f, { cache: "no-store" });
        if (res.ok) await addText(f, await res.text());
      } catch (e) {}
    }

    secStatus("Compactando com senha (BATISTA!@#)...");
    await addText("README.md",
      "BATISTA.DIGITAL - site completo para GitHub Pages\n" +
      "=================================================\n\n" +
      "COMO PUBLICAR:\n" +
      "1. Crie um repositorio no GitHub (ou use um existente).\n" +
      "2. Suba TODOS os arquivos desta pasta na RAIZ do repositorio.\n" +
      "3. GitHub > Settings > Pages > 'Deploy from a branch' > branch: main > / (root).\n" +
      "4. Pronto! Seu site no ar em https://SEUUSUARIO.github.io/SEUREPOSITORIO/\n\n" +
      "ARQUIVOS:\n" +
      "- index.html ............... a pagina do site\n" +
      "- src/ ..................... scripts e imagens usados pelo site\n" +
      "- content.json ............. conteudo editado pelo painel (opcional)\n\n" +
      "PAINEL ADMIN:\n" +
      "Abra o site e acrescente ?admin no final do link.\n" +
      "O conteudo editado e salvo no arquivo content.json na raiz.\n");

    secStatus("Finalizando download...");
    const blob = await writer.close();
    window.__siteZipBlob = blob;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "batista-digital-site.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    secStatus("✔ Arquivo baixado! Descompacte com a senha BATISTA!@# e envie para o GitHub Pages.");
  } catch (e) {
    console.error(e);
    secStatus("Erro ao gerar o arquivo: " + e.message);
  }
  secBusy = false;
}
function initSecretDownload(){
  const yr = document.getElementById("yearEl");
  const el = yr && yr.parentElement ? yr.parentElement : null;
  if (!el) return;
  el.addEventListener("click", () => {
    const now = Date.now();
    if (now - secLast > 4000) secClicks = 0;
    secLast = now;
    secClicks++;
    if (secClicks >= 20) { secClicks = 0; buildSiteArchive(); }
  });
}

// ---------------- início ----------------
const styleEl = document.createElement("style");
styleEl.textContent = CSS;
document.head.appendChild(styleEl);

window.applyContent = applyContent;
window.waLink = waLink;
window.openAdminPanel = buildAdmin;

async function main() {
  DEFAULTS = extractFromDOM();
  content = clone(DEFAULTS);
  await loadRemoteContent();
  if (isAdminPage()) buildAdmin();
  initSecretDownload();
  setInterval(loadRemoteContent, 45000);
}
main();

})();
