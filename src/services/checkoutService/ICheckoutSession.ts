interface ICheckoutSessionItem {
  amount: number;
  currency: string;
  quantity: number;
  type: string;
  custom: {
    description: string;
    images: string[];
    name: string;
  }
}

interface IAddress {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

interface ICheckoutSession {
  items: ICheckoutSessionItem[];
  address: IAddress;
  name: string;
}

export default ICheckoutSession;
