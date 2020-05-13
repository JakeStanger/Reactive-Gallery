import IPriceGroup from "../../../services/priceService/IPriceGroup";
import IPrice from "../../../services/priceService/IPrice";

interface IPriceTableProps {
  group: IPriceGroup;
  prices: IPrice[];
  className?: string;
}

export default IPriceTableProps;
