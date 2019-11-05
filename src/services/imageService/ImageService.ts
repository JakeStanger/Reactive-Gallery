import IImage from "./IImage";
import UserService from "../userService/UserService";
import ITag from "./ITag";

class ImageService {
  private static _instance: ImageService;

  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  public static getInstance(): ImageService {
    if (ImageService._instance) return ImageService._instance;
    else {
      const instance = new ImageService();
      ImageService._instance = instance;
      return instance;
    }
  }

  private _updateCache(images: IImage[]) {
    sessionStorage.setItem("images", JSON.stringify(images));
  }

  private _tryGetFromCache(): IImage[] | null {
    const images = sessionStorage.getItem("images");
    if (images) return JSON.parse(images);
    else return null;
  }

  private _clearCache() {
    sessionStorage.removeItem("images");
  }

  public async get(fileName: string): Promise<IImage> {
    return await fetch(`/api/image/${fileName}/info`).then(r => r.json());
  }

  public async update(image: Partial<IImage>) {
    this._clearCache();
    return await fetch(`/api/image/${image.filename}/info`, {
      method: "PATCH",
      body: JSON.stringify(image),
      headers: {
        Authorization: `Bearer ${this._userService.getToken()}`,
        "Content-Type": "application/json"
      }
    }).then(r => r.json());
  }

  public async delete(image: IImage) {
    this._clearCache();
    return await fetch(`/api/image/${image.filename}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._userService.getToken()}`
      }
    }).then(r => r.json());
  }

  public async getAll(skipCache?: boolean): Promise<IImage[]> {
    let images = !skipCache && this._tryGetFromCache();

    if (!images) images = await fetch("/api/image").then(r => r.json());

    if (images && !(images as any).message) {
      this._updateCache(images);

      return images;
    } else return [];
  }

  public getLink(image: IImage, full?: boolean) {
    return `/api/image/${!full ? "thumb/" : ""}${image.filename}`;
  }

  public async upload(file: File, image: Partial<IImage>): Promise<IImage | { msg: string }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(image));

    const res = await fetch("/api/image", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${this._userService.getToken()}`,
      }
    });

    this._clearCache();

    if (res.ok && res.status >= 200 && res.status < 300) return res.json();
    else return { msg: await res.text() };
  }

  public async getTags(): Promise<ITag[]> {
    return fetch(`/api/tag`).then(r => r.json());
  }

  public async getLocations(): Promise<ITag[]> {
    return fetch(`/api/location`).then(r => r.json());
  }
}

export default ImageService;