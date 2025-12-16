export function renderHeader(opts = {}) {
  const { current = "" } = opts;
  const brand = "Lumi Studio";
  const links = [
    { href: "/", key: "nav.home" },
    { href: "/free/", key: "nav.free" },
    { href: "/pro/", key: "nav.pro" },
    { href: "/legal/privacy.html", key: "nav.legal" },
  ];

  return `
  <header class="site">
    <div class="bar">
      <a class="brand" href="/">
        <span class="logo">🧿</span>
        <span>${brand}</span>
      </a>

      <nav class="links">
        ${links.map(l => `
          <a href="${l.href}" data-i18n="${l.key}" ${current===l.href ? 'style="color:var(--text); border-color:var(--line); background:rgba(255,255,255,.04)"' : ""}>
            …
          </a>`).join("")}
      </nav>

      <div class="lang">
        <span class="small">🌐</span>
        <select class="langsel" id="langSel" aria-label="Language">
          <option value="en">EN</option>
          <option value="zh">简中</option>
          <option value="zhHant">繁中</option>
          <option value="ms">BM</option>
        </select>
      </div>
    </div>
  </header>
  `;
}
