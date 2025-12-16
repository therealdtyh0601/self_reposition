import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: process.env.APP_URL + '/pro/index.html',
    cancel_url: process.env.APP_URL,
  });
  res.writeHead(302, { Location: session.url });
  res.end();
}