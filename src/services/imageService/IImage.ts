import ILocation from "./ILocation";
import ITag from "./ITag";
import IPriceGroup from "../priceService/IPriceGroup";
import ICategory from './ICategory';

interface IImage {
  id: number;
  description: string;
  filename: string;
  location: ILocation | null;
  name: string;
  categories: ICategory[];
  tags: ITag[];
  timeTaken: string;
  width: number;
  height: number;
  exposure: number;
  focalLength: number;
  aperture: number;
  iso: number;
  cameraModel: string;
  priceGroup: IPriceGroup;
}

export default IImage;
