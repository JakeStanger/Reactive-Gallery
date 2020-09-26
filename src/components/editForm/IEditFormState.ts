import ILocation from "../../services/imageService/ILocation";
import ITag from "../../services/imageService/ITag";
import IPriceGroup from "../../services/priceService/IPriceGroup";
import ICategory from '../../services/imageService/ICategory';

interface IEditPanelState {
  name: string;
  description: string;
  categories: ICategory[];
  location: [ILocation] | null;
  tags: ITag[];

  suggestedCategories: ICategory[];
  suggestedTags: ITag[];
  suggestedLocations: ILocation[];

  priceGroup: IPriceGroup | undefined;
  priceGroups: IPriceGroup[];

  loading: boolean;
}

export default IEditPanelState;
