import IImage from "../imageService/IImage";
import IPrice from "../priceService/IPrice";

interface IBasketItem {
  id: number;
  quantity: number;
  framed: boolean;
  image_id: number;
  user_id: number;
  price_id: number;
  image: IImage;
  price: IPrice;
}

export default IBasketItem;
