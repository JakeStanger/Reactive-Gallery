import IImage from "../../services/imageService/IImage";

interface IGalleryState {
  loading: boolean;
  images: IImage[];

  showLocation: boolean;
  showTime: boolean;
  showDescription: boolean;
  showTags: boolean;

  query: string;
  group: string;

  width: number;
}

export default IGalleryState;
