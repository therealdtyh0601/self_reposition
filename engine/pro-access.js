
const PRO_KEY = "lumi_pro_unlocked_until";
function isProUnlocked() {
  const until = localStorage.getItem(PRO_KEY);
  return until && Date.now() < Number(until);
}
function unlockPro(days = 7) {
  localStorage.setItem(PRO_KEY, Date.now() + days*86400000);
}
