(() => {
  const CONFIG = {"brand": "Lumi Studio", "stripe_payment_link": "https://buy.stripe.com/aFa14m7pq1IfbeuafW6Na00", "price_label": "RM8.99 one-time", "support_whatsapp": "+60168944406", "ig": "lumistudio2025"};
  const I18N = {"en": {"nav.home": "Home", "nav.free": "Free", "nav.pro": "Pro", "nav.legal": "Legal", "cta.unlock": "Unlock Pro", "cta.back_free": "Back to Free", "gate.title": "Pro is locked 🔒", "gate.body": "This page is part of Pro. Unlock once, use anytime on this device.", "gate.btn": "Unlock Pro (RM8.99)", "success.title": "Unlocked ✅", "success.body": "Pro is now unlocked on this device. You can start using Pro pages.", "footer.note": "Emoji-only UI · Built for speed · GitHub Pages friendly"}, "zh": {"nav.home": "主页", "nav.free": "免费", "nav.pro": "Pro", "nav.legal": "法律", "cta.unlock": "解锁 Pro", "cta.back_free": "回到免费", "gate.title": "Pro 未解锁 🔒", "gate.body": "这个页面属于 Pro。一次性解锁，在这台设备可重复使用。", "gate.btn": "解锁 Pro（RM8.99）", "success.title": "已解锁 ✅", "success.body": "这台设备已解锁 Pro，你可以开始使用 Pro 页面。", "footer.note": "全 emoji UI · 快速加载 · GitHub Pages 友好"}, "zhHant": {"nav.home": "主頁", "nav.free": "免費", "nav.pro": "Pro", "nav.legal": "法務", "cta.unlock": "解鎖 Pro", "cta.back_free": "回到免費", "gate.title": "Pro 未解鎖 🔒", "gate.body": "此頁面屬於 Pro。一次性解鎖，在這台裝置可重複使用。", "gate.btn": "解鎖 Pro（RM8.99）", "success.title": "已解鎖 ✅", "success.body": "此裝置已解鎖 Pro，你可以開始使用 Pro 頁面。", "footer.note": "全 emoji UI · 快速載入 · GitHub Pages 友好"}, "ms": {"nav.home": "Laman Utama", "nav.free": "Percuma", "nav.pro": "Pro", "nav.legal": "Perundangan", "cta.unlock": "Buka Pro", "cta.back_free": "Kembali ke Percuma", "gate.title": "Pro terkunci 🔒", "gate.body": "Halaman ini adalah Pro. Buka sekali, guna bila-bila pada peranti ini.", "gate.btn": "Buka Pro (RM8.99)", "success.title": "Berjaya ✅", "success.body": "Pro telah dibuka pada peranti ini. Anda boleh guna halaman Pro sekarang.", "footer.note": "UI emoji sahaja · Laju · Mesra GitHub Pages"}};
  const TOOLS = [{"tier": "free", "title": "Tianji Toolbox", "emoji": "🧰", "href": "free/tj-toolbox.html", "desc": "Core toolkit entry (free)."}, {"tier": "free", "title": "HouseCheck", "emoji": "🏠", "href": "free/tj-housecheck.html", "desc": "Space / property check (free)."}, {"tier": "free", "title": "BodyCheck", "emoji": "🧍", "href": "free/tj-bodycheck.html", "desc": "Body rhythm module (free)."}, {"tier": "free", "title": "Quote Wheel", "emoji": "🎡", "href": "free/quote-wheel.html", "desc": "Spin and get a quote (free)."}, {"tier": "free", "title": "Resources", "emoji": "📚", "href": "free/resources.html", "desc": "Library & references"}, {"tier": "free", "title": "FAQ", "emoji": "❓", "href": "free/faq.html", "desc": "Common questions"}, {"tier": "pro", "title": "Pro Hub (Textbook v1)", "emoji": "📘", "href": "pro/index.html", "desc": "Deep explanation + how to interpret"}, {"tier": "pro", "title": "Reports", "emoji": "🧾", "href": "pro/reports.html", "desc": "1-pager / 3-pager report guide"}, {"tier": "pro", "title": "Pro Tools", "emoji": "🛠️", "href": "pro/tools.html", "desc": "Advanced tools collection"}, {"tier": "pro", "title": "Support", "emoji": "💬", "href": "pro/support.html", "desc": "Submit details + get help"}];

  function getBasePath() {
    // Works for GitHub project pages: https://user.github.io/repo/... 
    // We infer base by checking if path includes a known file/dir; simplest: use current directory depth.
    // All our links are relative (no leading slash), so base is naturally handled by browser.
    return "";
  }

  const state = {
    lang: localStorage.getItem("lumi_lang") || "en",
    dict: I18N[localStorage.getItem("lumi_lang")] || I18N.en
  };

  function t(key, fallback) {
    return (state.dict && state.dict[key]) || fallback || key;
  }

  function applyI18n(root=document) {
    root.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key, el.textContent);
    });
  }

  function setLang(lang) {
    state.lang = I18N[lang] ? lang : "en";
    state.dict = I18N[state.lang] || I18N.en;
    localStorage.setItem("lumi_lang", state.lang);
    const sel = document.getElementById("langSel");
    if (sel) sel.value = state.lang;
    applyI18n(document);
  }

  function isProUnlocked() {
    return localStorage.getItem("lumi_pro_unlocked") === "true" || localStorage.getItem("lumi_tier") === "pro";
  }

  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2600);
  }

  function ensureModal() {
    if (document.getElementById("lumiModal")) return;
    const el = document.createElement("div");
    el.id = "lumiModal";
    el.style.cssText = "position:fixed;inset:0;display:none;place-items:center;z-index:50;background:rgba(0,0,0,.55);padding:18px;";
    el.innerHTML = `
      <div class="card" style="max-width:720px;width:100%">
        <div class="row" style="justify-content:space-between">
          <div class="h2" id="lumiModalTitle">…</div>
          <button class="btn" id="lumiModalClose">✖️</button>
        </div>
        <div class="p" id="lumiModalBody">…</div>
        <div class="row" style="justify-content:flex-end">
          <button class="btn primary" id="lumiModalAction">…</button>
        </div>
      </div>`;
    document.body.appendChild(el);
    document.getElementById("lumiModalClose").addEventListener("click", () => hideModal());
    el.addEventListener("click", (e) => { if (e.target === el) hideModal(); });
  }

  function showModal({title, body, actionText, onAction}) {
    ensureModal();
    document.getElementById("lumiModalTitle").textContent = title || "";
    document.getElementById("lumiModalBody").textContent = body || "";
    const btn = document.getElementById("lumiModalAction");
    btn.textContent = actionText || "OK";
    btn.onclick = () => { try { onAction && onAction(); } finally { hideModal(); } };
    document.getElementById("lumiModal").style.display = "grid";
  }

  function hideModal() {
    const el = document.getElementById("lumiModal");
    if (el) el.style.display = "none";
  }

  function goCheckout() {
    window.location.href = CONFIG.stripe_payment_link;
  }

  function requireProOrShowGate() {
    if (isProUnlocked()) return true;
    showModal({
      title: t("gate.title","Pro is locked 🔒"),
      body: t("gate.body","This page is part of Pro. Unlock once, use anytime on this device."),
      actionText: t("gate.btn","Unlock Pro (RM8.99)"),
      onAction: goCheckout
    });
    return false;
  }

  function renderHeader(current) {
    const links = [
      { href: "index.html", key: "nav.home" },
      { href: "free/index.html", key: "nav.free" },
      { href: "pro/index.html", key: "nav.pro" },
      { href: "legal/privacy.html", key: "nav.legal" },
    ];
    // If we are inside subfolders, fix relative hrefs by prefixing "../" as needed:
    const depth = (location.pathname.split("/").filter(Boolean).slice(-1)[0] || "").includes(".html")
      ? location.pathname.split("/").filter(Boolean).length - 1
      : location.pathname.split("/").filter(Boolean).length;
    // Depth includes repo name on GH pages, but our links are relative; easiest fix:
    // Use computed prefix: if current page is in /free or /pro or /legal, prefix "../"
    const inSub = /\/free\//.test(location.pathname) || /\/pro\//.test(location.pathname) || /\/legal\//.test(location.pathname);
    const prefix = inSub ? "../" : "";

    return `
      <header class="site">
        <div class="bar">
          <a class="brand" href="${prefix}index.html">
            <span class="logo">🧿</span>
            <span>${CONFIG.brand}</span>
          </a>
          <nav class="links">
            <a href="${prefix}index.html" data-i18n="nav.home"></a>
            <a href="${prefix}free/index.html" data-i18n="nav.free"></a>
            <a href="${prefix}pro/index.html" data-i18n="nav.pro"></a>
            <a href="${prefix}legal/privacy.html" data-i18n="nav.legal"></a>
          </nav>
          <div class="row" style="gap:8px">
            <span class="small">🌐</span>
            <select class="langsel" id="langSel" aria-label="Language">
              <option value="en">EN</option>
              <option value="zh">简中</option>
              <option value="zhHant">繁中</option>
              <option value="ms">BM</option>
            </select>
          </div>
        </div>
      </header>`;
  }

  function renderFooter(prefix) {
    const year = new Date().getFullYear();
    return `
      <footer class="site">
        <div class="wrap">
          <div class="row" style="justify-content:space-between; align-items:flex-start;">
            <div>
              <div class="pill">🧿 <span>${CONFIG.brand}</span> <span class="kbd">v1</span></div>
              <div class="p" data-i18n="footer.note"></div>
            </div>
            <div class="small right">
              <div>© ${year} ${CONFIG.brand}</div>
              <div><a href="${prefix}legal/terms.html">Terms</a> · <a href="${prefix}legal/privacy.html">Privacy</a> · <a href="${prefix}legal/disclaimer.html">Disclaimer</a></div>
            </div>
          </div>
        </div>
      </footer>`;
  }

  function mountChrome() {
    const inSub = /\/free\//.test(location.pathname) || /\/pro\//.test(location.pathname) || /\/legal\//.test(location.pathname);
    const prefix = inSub ? "../" : "";
    const h = document.getElementById("siteHeader");
    const f = document.getElementById("siteFooter");
    if (h) h.innerHTML = renderHeader();
    if (f) f.innerHTML = renderFooter(prefix);
    ensureModal();

    const sel = document.getElementById("langSel");
    if (sel) {
      sel.value = state.lang;
      sel.addEventListener("change", () => setLang(sel.value));
    }
    applyI18n(document);
  }

  function renderToolGrid(tier, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const items = TOOLS.filter(x => x.tier === tier);
    const inSub = /\/free\//.test(location.pathname) || /\/pro\//.test(location.pathname) || /\/legal\//.test(location.pathname);
    const prefix = inSub ? "../" : "";
    el.innerHTML = items.map(t => `
      <a class="card" href="${prefix}${t.href}">
        <div class="h2">${t.emoji} ${t.title}</div>
        <p class="p">${t.desc}</p>
        <div class="small">Open →</div>
      </a>
    `).join("");
  }

  // Expose
  window.Lumi = {
    CONFIG, t, setLang, applyI18n,
    mountChrome, toast,
    isProUnlocked, requireProOrShowGate,
    renderToolGrid, goCheckout
  };
})();
