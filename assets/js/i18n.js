const I18N_FILES = {
  en: "/assets/data/i18n-en.json",
  zh: "/assets/data/i18n-zh.json",
  zhHant: "/assets/data/i18n-zhHant.json",
  ms: "/assets/data/i18n-ms.json",
};

let dict = {};
let lang = "en";

export function getLang() {
  return lang;
}

export async function setLang(next) {
  lang = I18N_FILES[next] ? next : "en";
  localStorage.setItem("lumi_lang", lang);
  dict = await (await fetch(I18N_FILES[lang], { cache: "no-store" })).json();
  applyI18n();
}

export function t(key, fallback = "") {
  return dict[key] || fallback || key;
}

export function applyI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key, el.textContent);
  });
}

export async function initI18n() {
  const saved = localStorage.getItem("lumi_lang");
  await setLang(saved || "en");
  const sel = document.getElementById("langSel");
  if (sel) {
    sel.value = lang;
    sel.addEventListener("change", async () => setLang(sel.value));
  }
}
