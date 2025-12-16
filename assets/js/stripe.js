export async function getStripeLink() {
  const cfg = await (await fetch("/assets/data/products.json", { cache: "no-store" })).json();
  return cfg.stripe_payment_link;
}

export async function goCheckout() {
  const url = await getStripeLink();
  window.location.href = url;
}
