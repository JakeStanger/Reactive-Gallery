import UserService from "../userService/UserService";
import IImage from "../imageService/IImage";
import IBasketItem from "./IBasketItem";
import IPrice from "../priceService/IPrice";

class BasketService {
  private static _instance: BasketService;

  private _userService: UserService;

  private constructor() {
    this._userService = UserService.getInstance();
  }

  public static getInstance(): BasketService {
    if (BasketService._instance) return BasketService._instance;
    else {
      const instance = new BasketService();
      BasketService._instance = instance;
      return instance;
    }
  }

  public async getBasket(): Promise<IBasketItem[] | {msg: string}> {
    const res = await fetch("/api/basket", {
      headers: {
        Authorization: `Bearer ${this._userService.getToken()}`,
      }
    });

    if (res.ok && res.status >= 200 && res.status < 300) return res.json();
    else return { msg: await res.text() };
  }

  public async addToBasket(
    image: IImage,
    price: IPrice,
    quantity: number,
    framed: boolean
  ) {
    const res = await fetch("/api/basket", {
      method: "POST",
      body: JSON.stringify({ image, price, quantity, framed }),
      headers: {
        Authorization: `Bearer ${this._userService.getToken()}`,
        "Content-Type": "application/json"
      }
    });

    if (res.ok && res.status >= 200 && res.status < 300) return res.json();
    else return { msg: await res.text() };
  }

  public async removeFromBasket(basketItem: IBasketItem) {
    const res = await fetch(`/api/basket/${basketItem.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._userService.getToken()}`
      }
    });

    if (res.ok && res.status >= 200 && res.status < 300) return res.json();
    else return { msg: await res.text() };
  }

  public async emptyBasket() {
    const res = await fetch('/api/basket', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this._userService.getToken()}`
      }
    });

    if (res.ok && res.status >= 200 && res.status < 300) return res.json();
    else return { msg: await res.text() };
  }
}

export default BasketService;
