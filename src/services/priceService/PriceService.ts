import IPrice from "./IPrice";
import IPriceGroup from "./IPriceGroup";

class PriceService {
  private static _instance: PriceService;

  public static getInstance(): PriceService {
    if (PriceService._instance) return PriceService._instance;
    else {
      const instance = new PriceService();
      PriceService._instance = instance;
      return instance;
    }
  }

  public async getAllPrices(): Promise<IPrice[]> {
    const prices = await fetch("/api/price").then(r => r.json());

    if (prices && !(prices as any).message) {
      return prices;
    } else {
      console.error(prices);
      return [];
    }
  }

  public async getPricesForGroup(group: IPriceGroup): Promise<IPrice[]> {
    const prices = await fetch(`/api/price/group/${group.id}`).then(r =>
      r.json()
    );

    if (prices && !(prices as any).message) {
      return prices;
    } else {
      console.error(prices);
      return [];
    }
  }

  public async getAllPriceGroups(): Promise<IPriceGroup[]> {
    const priceGroups = await fetch("/api/pricegroup").then(r => r.json());

    if (priceGroups && !(priceGroups as any).message) {
      return priceGroups;
    } else {
      console.error(priceGroups);
      return [];
    }
  }
}

export default PriceService;
