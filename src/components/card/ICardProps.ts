import IImage from "../../services/imageService/IImage";
import ImageService from "../../services/imageService/ImageService";
import IBasketItem from "../../services/basketService/IBasketItem";

interface ICardProps {
  image: IImage;
  imageService: ImageService;
  height: number;
  showLocation: boolean;
  showTime: boolean;
  showTags: boolean;
  showDescription: boolean;

  showPriceInfo?: boolean;
  basketItem?: IBasketItem;
  onDelete?: (basketItem: IBasketItem) => void;

  query?: string;
}

export default ICardProps;
