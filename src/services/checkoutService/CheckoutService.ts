import UserService from "../userService/UserService";
import IImage from "../imageService/IImage";

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

  public async addToCheckout(image: IImage, quantity: number) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({image, quantity}),
      headers: {
        Authorization: `Bearer ${this._userService.getToken()}`,
      }
    });

    if (res.ok && res.status >= 200 && res.status < 300) return res.json();
    else return { msg: await res.text() };
  }
}

export default CheckoutService;
