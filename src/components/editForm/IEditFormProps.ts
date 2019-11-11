import IImage from "../../services/imageService/IImage";

interface IEditFormProps {
  image: Partial<IImage>;

  mode: "upload" | "edit";
  file?: File;

  onError: (error: string) => void;
}

export default IEditFormProps;