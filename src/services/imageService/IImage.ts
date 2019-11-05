import ILocation from "./ILocation";
import ITag from "./ITag";

interface IImage {
  description: string;
  filename: string;
  location: ILocation | null;
  name: string;
  tags: ITag[];
  timeTaken: string;
  width: number;
  height: number;
  exposure: number;
  focalLength: number;
  aperture: number;
  iso: number;
  cameraModel: string;
}

export default IImage;