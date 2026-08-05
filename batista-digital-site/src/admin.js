// Admin Panel for Batista.Digital
let adminUsers = null;

const defaultUsers = [
  { username: "admin", password: "batista2024" }
];

async function loadUsers() {
  try {
    if (!root.kv) return JSON.parse(JSON.stringify(defaultUsers));
    let saved = await root.kv.batistaDigital.get("users");
    if (saved) return saved;
    let copy = JSON.parse(JSON.stringify(defaultUsers));
    await root.kv.batistaDigital.set("users", copy);
    return copy;
  } catch (e) {
    return JSON.parse(JSON.stringify(defaultUsers));
  }
}

async function saveUsers(users) {
  try {
    adminUsers = users;
    if (root.kv) await root.kv.batistaDigital.set("users", users);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function initAdmin() {
  adminUsers = await loadUsers();
  if (!adminUsers || adminUsers.length === 0) {
    adminUsers = [{ username: "admin", password: "batista2024" }];
    await saveUsers(adminUsers);
  }
  const loginForm = document.getElementById("adminLoginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const u = loginForm.username.value;
      const p = loginForm.password.value;
      const found = (adminUsers || [{ username: "admin", password: "batista2024" }]).find(user => user.username === u && user.password === p);
      if (found) {
        adminLoggedIn = true;
        sessionStorage.setItem("adminAuth", "true");
        showPage("admin");
        renderAdminDashboard();
      } else {
        document.getElementById("adminLoginError").style.display = "block";
      }
    });
  }
  const logoutBtn = document.getElementById("adminLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      adminLoggedIn = false;
      sessionStorage.removeItem("adminAuth");
      showPage("admin");
    });
  }
  if (sessionStorage.getItem("adminAuth") === "true") {
    adminLoggedIn = true;
  }
}

function renderAdminDashboard() {
  if (!content) { setTimeout(renderAdminDashboard, 500); return; }
  renderMessages();
  renderAdminSections();
}

// ===== Messages =====
async function renderMessages() {
  try {
    let msgs = root.kv ? await root.kv.batistaDigital.get("messages") || [] : [];
    const ctn = document.getElementById("adminMessages");
    if (!ctn) return;
    if (msgs.length === 0) {
      ctn.innerHTML = "<p style='opacity:.6;padding:20px'>Nenhuma mensagem recebida ainda.</p>";
      return;
    }
    ctn.innerHTML = msgs.map((m, i) => `
      <div class="admin-msg-card">
        <div class="admin-msg-header">
          <strong>${m.name}</strong>
          <span>${new Date(m.date).toLocaleString("pt-BR")}</span>
        </div>
        <div class="admin-msg-body">
          <p><strong>E-mail:</strong> ${m.email}</p>
          <p><strong>Telefone:</strong> ${m.phone || "—"}</p>
          <p><strong>Serviço:</strong> ${m.service || "—"}</p>
          <p><strong>Mensagem:</strong> ${m.message}</p>
        </div>
        <div class="admin-msg-actions">
          ${m.phone ? `<a href="https://wa.me/${(m.phone||"").replace(/\D/g,"")}" target="_blank" class="btn btn-sm btn-primary">WhatsApp</a>` : ""}
          <a href="mailto:${m.email}" class="btn btn-sm btn-outline">Responder</a>
          <button class="btn btn-sm btn-danger" onclick="deleteMessage(${i})">Excluir</button>
        </div>
      </div>
    `).join("");
  } catch (e) { console.error(e); }
}

async function deleteMessage(idx) {
  try {
    let msgs = await root.kv.batistaDigital.get("messages") || [];
    msgs.splice(idx, 1);
    await root.kv.batistaDigital.set("messages", msgs);
    renderMessages();
  } catch (e) { console.error(e); }
}

// ===== Admin Sections =====
function renderAdminSections() {
  if (!content) return;
  if (!adminUsers) adminUsers = [{ username: "admin", password: "batista2024" }];
  const c = content.company;
  document.getElementById("editCompanyName").value = c.name || "";
  document.getElementById("editCompanyPhone").value = c.phone || "";
  document.getElementById("editCompanyWhatsapp").value = c.whatsapp || "";
  document.getElementById("editCompanyEmail").value = c.email || "";
  document.getElementById("editCompanyAddress").value = c.address || "";
  document.getElementById("editLogoUrl").value = c.logo || "";

  // Social
  document.getElementById("editInstagram").value = content.social.instagram || "";
  document.getElementById("editFacebook").value = content.social.facebook || "";
  document.getElementById("editLinkedin").value = content.social.linkedin || "";
  document.getElementById("editYoutube").value = content.social.youtube || "";
  document.getElementById("editTiktok").value = content.social.tiktok || "";

  // Colors
  document.getElementById("editColorPrimary").value = content.colors.primary;
  document.getElementById("editColorSecondary").value = content.colors.secondary;
  document.getElementById("editColorAccent").value = content.colors.accent;
  document.getElementById("editColorDark").value = content.colors.dark;
  document.getElementById("editColorDarker").value = content.colors.darker;

  // Hero
  document.getElementById("editHeroBadge").value = content.hero.badge || "";
  document.getElementById("editHeroTitle").value = content.hero.title || "";
  document.getElementById("editHeroSubtitle").value = content.hero.subtitle || "";
  renderAdminHeroImages();

  // Stats
  renderAdminStats();
  // Services
  renderAdminServices();
  // Process
  renderAdminProcess();
  // Portfolio
  renderAdminPortfolio();
  // About
  document.getElementById("editAboutTitle").value = content.about.title || "";
  document.getElementById("editAboutText").value = content.about.text || "";
  document.getElementById("editAboutImage").value = content.about.image || "";
  renderAdminValues();
  // Testimonials
  renderAdminTestimonials();
  // FAQ
  renderAdminFAQ();
  // Blog
  renderAdminBlog();
  // SEO
  document.getElementById("editSeoTitle").value = content.seo.title || "";
  document.getElementById("editSeoDesc").value = content.seo.description || "";
  document.getElementById("editSeoKeywords").value = content.seo.keywords || "";
  document.getElementById("editSeoImage").value = content.seo.ogImage || "";
  // Footer
  document.getElementById("editFooterText").value = content.footer.text || "";
  document.getElementById("editFooterCopyright").value = content.footer.copyright || "";
  // Privacy
  document.getElementById("editPrivacyText").value = content.privacy.text || "";
  // Users
  renderAdminUsers();
}

// ===== Stats =====
function renderAdminStats() {
  document.getElementById("adminStatsList").innerHTML = content.stats.map((s, i) => `
    <div class="admin-row">
      <input type="text" value="${s.number}" placeholder="Número" onchange="updateStat(${i}, 'number', this.value)">
      <input type="text" value="${s.label}" placeholder="Rótulo" onchange="updateStat(${i}, 'label', this.value)">
      <button class="btn btn-sm btn-danger" onclick="removeStat(${i})">✕</button>
    </div>
  `).join("");
}
function updateStat(i, key, val) { content.stats[i][key] = val; saveContent(content); }
function addStat() { content.stats.push({number:"", label:""}); renderAdminStats(); saveContent(content); }
function removeStat(i) { content.stats.splice(i,1); renderAdminStats(); saveContent(content); }

// ===== Services =====
function renderAdminServices() {
  document.getElementById("adminServicesList").innerHTML = content.services.map((s, i) => `
    <div class="admin-card">
      <div class="admin-row">
        <input type="text" value="${s.title}" placeholder="Título" onchange="updateService(${i},'title',this.value)">
        <button class="btn btn-sm btn-danger" onclick="removeService(${i})">✕</button>
      </div>
      <textarea placeholder="Descrição" onchange="updateService(${i},'description',this.value)">${s.description}</textarea>
    </div>
  `).join("");
}
function updateService(i, key, val) { content.services[i][key] = val; saveContent(content); }
function addService() { content.services.push({icon: SVG_ICONS.website, title:"", description:""}); renderAdminServices(); saveContent(content); }
function removeService(i) { content.services.splice(i,1); renderAdminServices(); saveContent(content); }

// ===== Process =====
function renderAdminProcess() {
  document.getElementById("adminProcessList").innerHTML = content.process.map((p, i) => `
    <div class="admin-row">
      <input type="text" value="${p.step}" style="width:60px" onchange="updateProcess(${i},'step',this.value)">
      <input type="text" value="${p.title}" placeholder="Título" onchange="updateProcess(${i},'title',this.value)">
      <button class="btn btn-sm btn-danger" onclick="removeProcess(${i})">✕</button>
    </div>
    <input type="text" value="${p.description}" placeholder="Descrição" style="width:100%;margin-bottom:8px" onchange="updateProcess(${i},'description',this.value)">
  `).join("");
}
function updateProcess(i, key, val) { content.process[i][key] = val; saveContent(content); }
function addProcess() { content.process.push({step:"", title:"", description:""}); renderAdminProcess(); saveContent(content); }
function removeProcess(i) { content.process.splice(i,1); renderAdminProcess(); saveContent(content); }

// ===== Portfolio =====
function renderAdminPortfolio() {
  document.getElementById("adminPortfolioList").innerHTML = content.portfolio.map((p, i) => `
    <div class="admin-card">
      <div class="admin-row">
        <input type="text" value="${p.title}" placeholder="Título" onchange="updatePortfolio(${i},'title',this.value)">
        <button class="btn btn-sm btn-danger" onclick="removePortfolio(${i})">✕</button>
      </div>
      <input type="text" value="${p.category}" placeholder="Categoria" style="width:100%;margin-bottom:8px" onchange="updatePortfolio(${i},'category',this.value)">
      <input type="text" value="${p.image}" placeholder="URL da Imagem" style="width:100%;margin-bottom:8px" onchange="updatePortfolio(${i},'image',this.value)">
      <textarea placeholder="Descrição" onchange="updatePortfolio(${i},'description',this.value)">${p.description}</textarea>
    </div>
  `).join("");
}
function updatePortfolio(i, key, val) { content.portfolio[i][key] = val; saveContent(content); }
function addPortfolio() { content.portfolio.push({title:"", category:"", image:"", description:""}); renderAdminPortfolio(); saveContent(content); }
function removePortfolio(i) { content.portfolio.splice(i,1); renderAdminPortfolio(); saveContent(content); }

// ===== Values =====
function renderAdminValues() {
  document.getElementById("adminValuesList").innerHTML = content.about.values.map((v, i) => `
    <div class="admin-row">
      <input type="text" value="${v.title}" placeholder="Título" onchange="updateValue(${i},'title',this.value)">
      <button class="btn btn-sm btn-danger" onclick="removeValue(${i})">✕</button>
    </div>
    <input type="text" value="${v.description}" placeholder="Descrição" style="width:100%;margin-bottom:8px" onchange="updateValue(${i},'description',this.value)">
  `).join("");
}
function updateValue(i, key, val) { content.about.values[i][key] = val; saveContent(content); }
function addValue() { content.about.values.push({title:"", description:""}); renderAdminValues(); saveContent(content); }
function removeValue(i) { content.about.values.splice(i,1); renderAdminValues(); saveContent(content); }

// ===== Testimonials =====
function renderAdminTestimonials() {
  document.getElementById("adminTestimonialsList").innerHTML = content.testimonials.map((t, i) => `
    <div class="admin-card">
      <div class="admin-row">
        <input type="text" value="${t.name}" placeholder="Nome" onchange="updateTestimonial(${i},'name',this.value)">
        <button class="btn btn-sm btn-danger" onclick="removeTestimonial(${i})">✕</button>
      </div>
      <input type="text" value="${t.role}" placeholder="Cargo/Empresa" style="width:100%;margin-bottom:8px" onchange="updateTestimonial(${i},'role',this.value)">
      <input type="text" value="${t.avatar}" placeholder="URL do Avatar" style="width:100%;margin-bottom:8px" onchange="updateTestimonial(${i},'avatar',this.value)">
      <textarea placeholder="Depoimento" onchange="updateTestimonial(${i},'text',this.value)">${t.text}</textarea>
    </div>
  `).join("");
}
function updateTestimonial(i, key, val) { content.testimonials[i][key] = val; saveContent(content); }
function addTestimonial() { content.testimonials.push({name:"", role:"", avatar:"", text:""}); renderAdminTestimonials(); saveContent(content); }
function removeTestimonial(i) { content.testimonials.splice(i,1); renderAdminTestimonials(); saveContent(content); }

// ===== FAQ =====
function renderAdminFAQ() {
  document.getElementById("adminFaqList").innerHTML = content.faq.map((f, i) => `
    <div class="admin-card">
      <div class="admin-row">
        <input type="text" value="${f.question}" placeholder="Pergunta" onchange="updateFAQ(${i},'question',this.value)">
        <button class="btn btn-sm btn-danger" onclick="removeFAQ(${i})">✕</button>
      </div>
      <textarea placeholder="Resposta" onchange="updateFAQ(${i},'answer',this.value)">${f.answer}</textarea>
    </div>
  `).join("");
}
function updateFAQ(i, key, val) { content.faq[i][key] = val; saveContent(content); }
function addFAQ() { content.faq.push({question:"", answer:""}); renderAdminFAQ(); saveContent(content); }
function removeFAQ(i) { content.faq.splice(i,1); renderAdminFAQ(); saveContent(content); }

// ===== Blog =====
function renderAdminBlog() {
  document.getElementById("adminBlogList").innerHTML = content.blog.map((b, i) => `
    <div class="admin-card">
      <div class="admin-row">
        <input type="text" value="${b.title}" placeholder="Título" onchange="updateBlog(${i},'title',this.value)">
        <button class="btn btn-sm btn-danger" onclick="removeBlog(${i})">✕</button>
      </div>
      <input type="text" value="${b.id}" placeholder="ID (slug)" style="width:100%;margin-bottom:8px" onchange="updateBlog(${i},'id',this.value)">
      <input type="text" value="${b.author}" placeholder="Autor" style="width:100%;margin-bottom:8px" onchange="updateBlog(${i},'author',this.value)">
      <input type="text" value="${b.date}" placeholder="Data (AAAA-MM-DD)" style="width:100%;margin-bottom:8px" onchange="updateBlog(${i},'date',this.value)">
      <input type="text" value="${b.image}" placeholder="URL da Imagem" style="width:100%;margin-bottom:8px" onchange="updateBlog(${i},'image',this.value)">
      <input type="text" value="${b.excerpt}" placeholder="Resumo" style="width:100%;margin-bottom:8px" onchange="updateBlog(${i},'excerpt',this.value)">
      <textarea placeholder="Conteúdo" rows="5" onchange="updateBlog(${i},'content',this.value)">${b.content}</textarea>
    </div>
  `).join("");
}
function updateBlog(i, key, val) { content.blog[i][key] = val; saveContent(content); }
function addBlog() { content.blog.push({id:"novo-artigo", title:"", date:new Date().toISOString().slice(0,10), author:"Equipe Batista.Digital", excerpt:"", image:"", content:""}); renderAdminBlog(); saveContent(content); }
function removeBlog(i) { content.blog.splice(i,1); renderAdminBlog(); saveContent(content); }

// ===== Users =====
function renderAdminUsers() {
  document.getElementById("adminUsersList").innerHTML = adminUsers.map((u, i) => `
    <div class="admin-row">
      <input type="text" value="${u.username}" placeholder="Usuário" onchange="updateUser(${i},'username',this.value)">
      <input type="text" value="${u.password}" placeholder="Senha" onchange="updateUser(${i},'password',this.value)">
      <button class="btn btn-sm btn-danger" onclick="removeUser(${i})">✕</button>
    </div>
  `).join("");
}
async function updateUser(i, key, val) { adminUsers[i][key] = val; await saveUsers(adminUsers); }
async function addUser() { adminUsers.push({username:"", password:""}); renderAdminUsers(); await saveUsers(adminUsers); }
async function removeUser(i) { adminUsers.splice(i,1); renderAdminUsers(); await saveUsers(adminUsers); }

// ===== Save Handlers =====
function saveCompany() {
  content.company.name = document.getElementById("editCompanyName").value;
  content.company.phone = document.getElementById("editCompanyPhone").value;
  content.company.whatsapp = document.getElementById("editCompanyWhatsapp").value;
  content.company.email = document.getElementById("editCompanyEmail").value;
  content.company.address = document.getElementById("editCompanyAddress").value;
  content.company.logo = document.getElementById("editLogoUrl").value;
  saveContent(content);
  alert("Dados da empresa salvos!");
}
function saveSocial() {
  content.social.instagram = document.getElementById("editInstagram").value;
  content.social.facebook = document.getElementById("editFacebook").value;
  content.social.linkedin = document.getElementById("editLinkedin").value;
  content.social.youtube = document.getElementById("editYoutube").value;
  content.social.tiktok = document.getElementById("editTiktok").value;
  saveContent(content);
  alert("Redes sociais salvas!");
}
function saveColors() {
  content.colors.primary = document.getElementById("editColorPrimary").value;
  content.colors.secondary = document.getElementById("editColorSecondary").value;
  content.colors.accent = document.getElementById("editColorAccent").value;
  content.colors.dark = document.getElementById("editColorDark").value;
  content.colors.darker = document.getElementById("editColorDarker").value;
  saveContent(content);
  applyColors();
  alert("Cores salvas!");
}
function saveHero() {
  content.hero.badge = document.getElementById("editHeroBadge").value;
  content.hero.title = document.getElementById("editHeroTitle").value;
  content.hero.subtitle = document.getElementById("editHeroSubtitle").value;
  saveContent(content);
  alert("Hero salvo!");
}
function renderAdminHeroImages() {
  const images = content.hero.images || [];
  document.getElementById("adminHeroImages").innerHTML = images.map((img, i) => `
    <div class="admin-row">
      <input type="text" class="admin-input" value="${img}" placeholder="URL da imagem" onchange="updateHeroImage(${i}, this.value)">
      <button class="btn btn-sm btn-danger" onclick="removeHeroImage(${i})">✕</button>
    </div>
  `).join("");
}
function updateHeroImage(i, val) { content.hero.images[i] = val; saveContent(content); }
function addHeroImage() { if (!content.hero.images) content.hero.images = []; content.hero.images.push(""); renderAdminHeroImages(); saveContent(content); }
function removeHeroImage(i) { content.hero.images.splice(i, 1); renderAdminHeroImages(); saveContent(content); }
async function uploadHeroImage(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    const result = await root.uploadPlugin(reader.result, { expires: Date.now() + 1000*60*60*24*365 });
    if (result.url) {
      if (!content.hero.images) content.hero.images = [];
      content.hero.images.push(result.url);
      renderAdminHeroImages();
      saveContent(content);
    }
  };
  reader.readAsDataURL(file);
}
function saveAbout() {
  content.about.title = document.getElementById("editAboutTitle").value;
  content.about.text = document.getElementById("editAboutText").value;
  content.about.image = document.getElementById("editAboutImage").value;
  saveContent(content);
  alert("Sobre salvos!");
}
function saveSEO() {
  content.seo.title = document.getElementById("editSeoTitle").value;
  content.seo.description = document.getElementById("editSeoDesc").value;
  content.seo.keywords = document.getElementById("editSeoKeywords").value;
  content.seo.ogImage = document.getElementById("editSeoImage").value;
  saveContent(content);
  applySEO();
  alert("SEO salvo!");
}
function saveFooter() {
  content.footer.text = document.getElementById("editFooterText").value;
  content.footer.copyright = document.getElementById("editFooterCopyright").value;
  saveContent(content);
  alert("Rodapé salvo!");
}
function savePrivacy() {
  content.privacy.text = document.getElementById("editPrivacyText").value;
  saveContent(content);
  alert("Política de privacidade salva!");
}

// ===== Backup / Restore =====
async function exportBackup() {
  try {
    const allData = {
      content: content,
      users: adminUsers,
      messages: root.kv ? await root.kv.batistaDigital.get("messages") || [] : [],
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `batista-digital-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) { console.error(e); alert("Erro ao exportar: " + e.message); }
}

async function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (data.content) {
      content = data.content;
      await saveContent(content);
    }
    if (data.users) {
      await saveUsers(data.users);
      renderAdminUsers();
    }
    if (data.messages && root.kv) {
      await root.kv.batistaDigital.set("messages", data.messages);
    }
    renderAdminSections();
    applyColors();
    applySEO();
    alert("Backup restaurado com sucesso!");
  } catch (e) { alert("Erro ao restaurar: " + e.message); }
}

// ===== Image Upload =====
async function uploadImage(file, inputId) {
  if (!file) return;
  try {
    const reader = new FileReader();
    reader.onload = async () => {
      const result = await root.uploadPlugin(reader.result, { expires: Date.now() + 1000*60*60*24*365 });
      if (result.url) {
        document.getElementById(inputId).value = result.url;
      } else {
        alert("Erro no upload: " + (result.error || "desconhecido"));
      }
    };
    reader.readAsDataURL(file);
  } catch (e) { alert("Erro: " + e.message); }
}

// ===== Admin Nav =====
function showAdminSection(id) {
  document.querySelectorAll(".admin-section").forEach(s => s.hidden = true);
  document.getElementById("adminSection_" + id).hidden = false;
  document.querySelectorAll(".admin-nav-item").forEach(n => n.classList.remove("active"));
  document.querySelector(`[data-admin-section="${id}"]`).classList.add("active");
}

window.initAdmin = initAdmin;
window.showAdminSection = showAdminSection;
window.saveCompany = saveCompany;
window.saveSocial = saveSocial;
window.saveColors = saveColors;
window.saveHero = saveHero;
window.renderAdminHeroImages = renderAdminHeroImages;
window.updateHeroImage = updateHeroImage;
window.addHeroImage = addHeroImage;
window.removeHeroImage = removeHeroImage;
window.uploadHeroImage = uploadHeroImage;
window.saveAbout = saveAbout;
window.saveSEO = saveSEO;
window.saveFooter = saveFooter;
window.savePrivacy = savePrivacy;
window.exportBackup = exportBackup;
window.importBackup = importBackup;
window.uploadImage = uploadImage;
window.addStat = addStat;
window.updateStat = updateStat;
window.removeStat = removeStat;
window.addService = addService;
window.updateService = updateService;
window.removeService = removeService;
window.addProcess = addProcess;
window.updateProcess = updateProcess;
window.removeProcess = removeProcess;
window.addPortfolio = addPortfolio;
window.updatePortfolio = updatePortfolio;
window.removePortfolio = removePortfolio;
window.addValue = addValue;
window.updateValue = updateValue;
window.removeValue = removeValue;
window.addTestimonial = addTestimonial;
window.updateTestimonial = updateTestimonial;
window.removeTestimonial = removeTestimonial;
window.addFAQ = addFAQ;
window.updateFAQ = updateFAQ;
window.removeFAQ = removeFAQ;
window.addBlog = addBlog;
window.updateBlog = updateBlog;
window.removeBlog = removeBlog;
window.addUser = addUser;
window.updateUser = updateUser;
window.removeUser = removeUser;
window.deleteMessage = deleteMessage;
