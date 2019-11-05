import IImage from "../../../../../services/imageService/IImage";

interface IEditPanelProps {
  isOpen: boolean;
  onDismiss: () => void;

  image: IImage;
}

export default IEditPanelProps