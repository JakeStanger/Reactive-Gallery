import IPriceGroup from "../../../../services/priceService/IPriceGroup";
import IPrice from "../../../../services/priceService/IPrice";
import IImage from "../../../../services/imageService/IImage";

interface IPriceTableProps {
  group: IPriceGroup;
  prices: IPrice[];
  purchaseMode?: boolean;
  image?: IImage;
  className?: string;
}

export default IPriceTableProps;
