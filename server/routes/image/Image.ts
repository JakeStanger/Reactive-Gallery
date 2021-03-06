import { Request, Response } from "express";
import Location from "../../database/models/Location";
import Tag from "../../database/models/Tag";
import Image from "../../database/models/Image";
import * as imageGenerator from "../../utils/imageGenerator";
import * as exifReader from "../../utils/exifReader";
import User from "../../database/models/User";
import PriceGroup from "../../database/models/PriceGroup";
import * as path from "path";
import Category from "../../database/models/Category";

export const getImageThumbnail = async (req: Request, res: Response) => {
  if (req.params.filename.endsWith("webp")) {
    return res.type("image/webp").sendFile(req.params.filename, {
      root: path.join(process.env.UPLOAD_PATH, "thumb")
    });
  } else {
    const filename = req.params.filename.replace(/jpeg$/, "webp");
    await imageGenerator.generateJpeg(filename, "thumb");
    return res.type("image/jpeg").sendFile(req.params.filename, {
      root: path.join(process.env.UPLOAD_PATH, "thumb")
    });
  }
};

export const getImageMarked = async (req: Request, res: Response) => {
  if (req.params.filename.endsWith("webp")) {
    return res.type("image/webp").sendFile(req.params.filename, {
      root: path.join(process.env.UPLOAD_PATH, "marked")
    });
  } else {
    const filename = req.params.filename.replace(/jpeg$/, "webp");
    await imageGenerator.generateJpeg(filename, "marked");

    return res.type("image/jpeg").sendFile(req.params.filename, {
      root: path.join(process.env.UPLOAD_PATH, "marked")
    });
  }
};

export const getImageInfo = async (req: Request, res: Response) => {
  const image = await Image.findOne({
    where: { id: req.params.id },
    include: [
      { model: Category, as: "categories" },
      { model: Location, as: "location" },
      { model: Tag, as: "tags" },
      { model: PriceGroup, as: "priceGroup" }
    ]
  });

  return res.json(image);
};

export const patchImageInfo = async (req: Request, res: Response) => {
  if (!req.body || !Object.keys(req.body).length)
    res.status(400).json({ msg: "Missing request body" });

  const user = await User.findOne({ where: { id: (req.user as any).id } });
  if (!user.canEdit) {
    res.status(401).json({ msg: "Missing edit permissions" });
  }

  // Update name/description
  await Image.update(req.body, {
    where: { id: req.params.id }
  });

  // Update tags, categories and location
  const image = await Image.findOne({
    where: { id: req.params.id }
  });

  if (req.body.location !== undefined) {
    if (req.body.location !== null) {
      const location = await Location.getFromObject(req.body.location);
      await image.setLocation(location);
    } else await image.setLocation(null);
  }

  if (req.body.categories !== undefined) {
    const categories = await Category.getFromArray(req.body.categories);
    await image.setCategories(categories);
  }

  if (req.body.tags !== undefined) {
    const tags = await Tag.getFromArray(req.body.tags);
    await image.setTags(tags);
  }

  if (req.body.priceGroup !== undefined) {
    const priceGroup = await PriceGroup.getFromObject(req.body.priceGroup);
    await image.setPriceGroup(priceGroup);
  }

  return res.json(image);
};

export const deleteImage = async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { id: (req.user as any).id } });
  if (!user.canUpload) {
    res.status(401).json({ msg: "Missing upload permissions" });
  }

  await Image.update({ deleted: true }, { where: { id: req.params.id } });
  return res.json({ msg: "Image deleted" });
};

export const postImage = async (req: Request, res: Response) => {
  let imageData = JSON.parse(req.body.data);
  imageData.filename = req.file.originalname.replace(/\.(.*)$/, ".webp");

  const user = await User.findOne({ where: { id: (req.user as any).id } });
  if (!user.canUpload) {
    res.status(401).json({ msg: "Missing upload permissions" });
  }

  try {
    imageData = {
      ...imageData,
      ...(await exifReader.getExif(req.file.buffer))
    };
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message });
  }

  await imageGenerator.generateThumbnail(req.file.buffer, imageData.filename);
  const { width, height } = await imageGenerator.generateMarked(
    req.file.buffer,
    imageData.filename
  );

  // width and height should be returned form
  imageData.width = width;
  imageData.height = height;

  // delete previous matching entry
  const existingImage = await Image.findOne({
    where: { filename: imageData.filename }
  });
  if (existingImage) {
    if (existingImage.deleted) {
      await existingImage.destroy();
    } else {
      return res.status(400).json({ msg: "Image already exists" });
    }
  }

  const image = await Image.create(imageData);

  if (imageData.location) {
    const location = await Location.getFromObject(imageData.location);
    await image.setLocation(location);
  }

  if (imageData.tags) {
    const tags = await Tag.getFromArray(imageData.tags);
    await image.setTags(tags as Tag[]);
  }

  if (imageData.priceGroup) {
    const priceGroup = await PriceGroup.getFromObject(imageData.priceGroup);
    image.setPriceGroup(priceGroup);
  }

  return res.status(201).json(imageData);
};
