import IImage from "../../../../services/imageService/IImage";
import IUser from "../../../../services/userService/IUser";

interface IInfoTableProps {
  image: IImage;
  user: IUser | null;
}

export default IInfoTableProps;