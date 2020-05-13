import { Stripe } from "stripe";

class StripeManager {
  private static _stripe: Stripe;

  public static getStripe() {
    if(this._stripe) {
      return this._stripe;
    }

    this._stripe = new Stripe(process.env.STRIPE_SECRET, { apiVersion: "2020-03-02" });
    return this._stripe;
  }
}

export default StripeManager;
