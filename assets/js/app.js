import { renderHeader } from "../../components/header.js";
import { renderFooter } from "../../components/footer.js";
import { initI18n, applyI18n } from "./i18n.js";
import { ensureModal } from "../../components/modal.js";

export async function mountChrome({ current = "" } = {}) {
  const rootHeader = document.getElementById("siteHeader");
  const rootFooter = document.getElementById("siteFooter");

  if (rootHeader) rootHeader.innerHTML = renderHeader({ current });
  if (rootFooter) rootFooter.innerHTML = renderFooter();

  ensureModal();
  await initI18n();
  applyI18n(document);
}

export function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2600);
}
