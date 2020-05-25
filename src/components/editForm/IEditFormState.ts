import ILocation from "../../services/imageService/ILocation";
import ITag from "../../services/imageService/ITag";
import IPriceGroup from "../../services/priceService/IPriceGroup";

interface IEditPanelState {
  name: string;
  description: string;
  location: [ILocation] | null;
  tags: ITag[];

  suggestedTags: ITag[];
  suggestedLocations: ILocation[];

  priceGroup: IPriceGroup | undefined;
  priceGroups: IPriceGroup[];

  loading: boolean;
}

export default IEditPanelState;
