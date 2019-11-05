import IImage from "../../../../services/imageService/IImage";
import ImageService from "../../../../services/imageService/ImageService";

interface ICardProps {
  image: IImage;
  imageService: ImageService;
  height: number;
  showLocation: boolean;
  showTime: boolean;
  showTags: boolean;
  showDescription: boolean;
}

export default ICardProps;