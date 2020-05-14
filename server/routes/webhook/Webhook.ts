import { Request, Response } from "express";
import BasketItem from "../../database/models/BasketItem";
import StripeManager from "../../StripeManager";

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res
      .status(401)
      .json({ msg: "Webhook can only be triggered by Stripe" });
  }

  let event;

  try {
    event = StripeManager.getStripe().webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any; // Typings look to be broken?

    // Clear basket and log
    await BasketItem.destroy({
      where: { user_id: session.client_reference_id }
    });
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};
