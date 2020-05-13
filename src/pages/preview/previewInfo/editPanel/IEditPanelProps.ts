import IImage from "../../../../services/imageService/IImage";
import { History } from "history";

interface IEditPanelProps {
  isOpen: boolean;
  onDismiss: () => void;

  image: IImage;

  history: History;
}

export default IEditPanelProps;
