import { t } from "./i18n.js";
import { showModal } from "../../components/modal.js";
import { goCheckout } from "./stripe.js";

export function isProUnlocked() {
  return localStorage.getItem("lumi_pro_unlocked") === "true" || localStorage.getItem("lumi_tier") === "pro";
}

export function requireProOrShowGate() {
  if (isProUnlocked()) return true;

  showModal({
    title: t("gate.title","Pro is locked 🔒"),
    body: t("gate.body","This page is part of Pro. Unlock once, use anytime on this device."),
    actionText: t("gate.btn","Unlock Pro (RM8.99)"),
    onAction: () => goCheckout(),
  });
  return false;
}
