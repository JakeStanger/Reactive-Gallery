import { Request, Response } from "express";
import Location from "../../models/Location";
import Tag from "../../models/Tag";
import Image from "../../models/Image";
import config from "../../config.json";
import * as imageGenerator from "../../utils/imageGenerator";
import * as exifReader from "../../utils/exifReader";
import User from "../../models/User";

export const getImageThumbnail = async (req: Request, res: Response) => {
  return res
    .type("image/jpeg")
    .sendFile(req.params.filename + ".thumb", { root: config.uploadPath });
};

export const getImageMarked = async (req: Request, res: Response) => {
  return res
    .type("image/jpeg")
    .sendFile(req.params.filename + ".marked", { root: config.uploadPath });
};

export const getImageInfo = async (req: Request, res: Response) => {
  const image = await Image.findOne({
    where: { filename: req.params.filename },
    include: [{ model: Location, as: "location" }, { model: Tag, as: "tags" }]
  });

  return res.json(image);
};

export const patchImageInfo = async (req: Request, res: Response) => {
  if (!req.body || !Object.keys(req.body).length)
    res.status(400).json({ message: "Missing request body" });


  const user = await User.findOne({ where: { id: (req.user as any).id } });
  if (user.canEdit) {
    res.status(401).json({ message: "Missing edit permissions" });
  }

  // Update name/description
  await Image.update(req.body, {
    where: { filename: req.params.filename }
  });

  // Update tags and location
  const image = await Image.findOne({
    where: { filename: req.params.filename }
  });

  if (req.body.location !== undefined) {
    const location = await Location.getFromObject(req.body.location);
    await image.setLocation(location);
  }

  if (req.body.tags !== undefined) {
    const tags = await Tag.getFromArray(req.body.tags);
    await image.setTags(tags);
  }

  return res.json(image);
};

export const deleteImage = async (req: Request, res: Response) => {
  console.log(req.params);

  await Image.update(
    { deleted: true },
    { where: { filename: req.params.filename } }
  );
  return res.json({ message: "Image deleted" });
};

export const postImage = async (req: Request, res: Response) => {
  let imageData = JSON.parse(req.body.data);
  imageData.filename = req.file.originalname;

  const user = await User.findOne({ where: { id: (req.user as any).id } });
  if (user.canUpload) {
    res.status(401).json({ message: "Missing upload permissions" });
  }

  try {
    imageData = {
      ...imageData,
      ...(await exifReader.getExif(req.file.buffer))
    };
  } catch (err) {
    return res.status(500).json(err.message);
  }

  await imageGenerator.generateThumbnail(req.file.buffer, imageData.filename);
  await imageGenerator.generateMarked(req.file.buffer, imageData.filename);

  const image = await Image.create(imageData);

  if (imageData.location) {
    const location = await Location.getFromObject(image.location);
    await image.setLocation(location);
  }

  if (imageData.tags) {
    const tags = await Tag.getFromArray(imageData.tags);
    await image.setTags(tags as Tag[]);
  }

  return res.status(201).json(imageData);
};
