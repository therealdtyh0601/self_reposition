export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site">
      <div class="wrap">
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <div>
            <div class="pill">🧿 <span>Lumi Studio</span> <span class="kbd">v1</span></div>
            <div class="p" data-i18n="footer.note">…</div>
          </div>
          <div class="small right">
            <div>© ${year} Lumi Studio</div>
            <div><a href="/legal/terms.html">Terms</a> · <a href="/legal/privacy.html">Privacy</a> · <a href="/legal/disclaimer.html">Disclaimer</a></div>
          </div>
        </div>
      </div>
    </footer>
  `;
}
