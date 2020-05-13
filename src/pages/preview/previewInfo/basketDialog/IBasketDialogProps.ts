import IImage from "../../../../services/imageService/IImage";
import IPrice from "../../../../services/priceService/IPrice";
import { History } from 'history';

interface IBasketDialogProps {
  onDismiss: () => void;
  image: IImage;
  prices: IPrice[];
  history: History
}

export default IBasketDialogProps;
