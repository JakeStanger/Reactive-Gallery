import IImage from "../../../services/imageService/IImage";
import IUser from "../../../services/userService/IUser";
import { History } from 'history';

interface IPreviewInfoProps {
  image: IImage;
  user: IUser | null;

  history: History;
}

export default IPreviewInfoProps;
