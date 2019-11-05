import ILocation from "../../services/imageService/ILocation";
import ITag from "../../services/imageService/ITag";

interface IEditPanelState {
  name: string;
  description: string;
  location: [ILocation] | null;
  tags: ITag[];

  suggestedTags: ITag[];
  suggestedLocations: ILocation[];
}

export default IEditPanelState;