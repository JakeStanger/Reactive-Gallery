import IImage from "../../../services/imageService/IImage";
import IUser from "../../../services/userService/IUser";

interface IPreviewState {
  image: IImage | null;
  user: IUser | null;
}

export default IPreviewState;