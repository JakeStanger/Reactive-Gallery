import { Request, Response } from "express";
import { getUserBasket } from "../basketItem/BasketItems";
import StripeManager from "../../StripeManager";

export const getClientPublic = async (req: Request, res: Response) => {
  return res.json({ publicKey: process.env.STRIPE_PUBLIC });
};

export const getClientSecret = async (req: Request, res: Response) => {
  const basket = await getUserBasket((req.user as any).id);

  const publicAddress = process.env.PUBLIC_ADDRESS;

  const session = await StripeManager.getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: basket.map(item => ({
      name: `${item.image.name} [${item.price.name}, ${
        item.framed ? "framed" : "unframed"
      }]`,
      description: `${item.price.name}, ${item.framed ? "framed" : "unframed"}`,
      images: [`${publicAddress}/api/image/thumb/${item.image.filename}`],
      amount: (item.framed ? item.price.framed : item.price.unframed) * 100,
      quantity: item.quantity,
      currency: "gbp"
    })),
    client_reference_id: (req.user as any).id,
    shipping_address_collection: {
      allowed_countries: ["GB"]
    },

    success_url: `${publicAddress}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${publicAddress}/basket`
  });

  return res.json({ sessionId: session.id });
};

export const getCheckoutSession = async (req: Request, res: Response) => {
  const session = await StripeManager.getStripe().checkout.sessions.retrieve(
    req.params.sessionId
  );

  return res.json({
    items: session.display_items,
    address: session.shipping.address,
    name: session.shipping.name
  });
};
