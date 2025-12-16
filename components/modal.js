export function ensureModal() {
  if (document.getElementById("lumiModal")) return;

  const el = document.createElement("div");
  el.id = "lumiModal";
  el.style.cssText = `
    position:fixed; inset:0; display:none; place-items:center; z-index:50;
    background:rgba(0,0,0,.55); padding:18px;
  `;
  el.innerHTML = `
    <div class="card" style="max-width:720px; width:100%">
      <div class="row" style="justify-content:space-between">
        <div class="h2" id="lumiModalTitle">…</div>
        <button class="btn" id="lumiModalClose">✖️</button>
      </div>
      <div class="p" id="lumiModalBody">…</div>
      <div class="row" style="justify-content:flex-end">
        <button class="btn primary" id="lumiModalAction">…</button>
      </div>
    </div>
  `;
  document.body.appendChild(el);

  document.getElementById("lumiModalClose").addEventListener("click", () => hideModal());
  el.addEventListener("click", (e) => { if (e.target === el) hideModal(); });
}

export function showModal({ title, body, actionText, onAction }) {
  ensureModal();
  document.getElementById("lumiModalTitle").textContent = title || "";
  document.getElementById("lumiModalBody").textContent = body || "";
  const btn = document.getElementById("lumiModalAction");
  btn.textContent = actionText || "OK";
  btn.onclick = () => { try { onAction?.(); } finally { hideModal(); } };
  document.getElementById("lumiModal").style.display = "grid";
}

export function hideModal() {
  const el = document.getElementById("lumiModal");
  if (el) el.style.display = "none";
}
