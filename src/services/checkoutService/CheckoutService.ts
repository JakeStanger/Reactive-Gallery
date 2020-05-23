import UserService from "../userService/UserService";
import ICheckoutSession from "./ICheckoutSession";

class CheckoutService {
  private static _instance: CheckoutService;

  private _userService: UserService;

  private constructor() {
    this._userService = UserService.getInstance();
  }

  public static getInstance(): CheckoutService {
    if (CheckoutService._instance) return CheckoutService._instance;
    else {
      const instance = new CheckoutService();
      CheckoutService._instance = instance;
      return instance;
    }
  }

  public async getPublicKey(): Promise<string> {
    const { publicKey } = await fetch("/api/checkout/public").then(r =>
      r.json()
    );

    return publicKey;
  }

  public async getSecretKey(post: boolean): Promise<string> {
    const response = await fetch("/api/checkout/secret", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${UserService.getInstance().getToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post })
    });
    const { sessionId } = await response.json();

    return sessionId;
  }

  public async getSession(sessionId: string): Promise<ICheckoutSession> {
    const response = await fetch(`/api/checkout/session/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${UserService.getInstance().getToken()}`
      }
    });
    return await response.json();
  }
}

export default CheckoutService;
