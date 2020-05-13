import IImage from "../../services/imageService/IImage";
import { History } from "history";

interface IEditFormProps {
  image: Partial<IImage>;

  mode: "upload" | "edit";
  file?: File;

  onError?: (error: string) => void;

  history: History;
}

export default IEditFormProps;
