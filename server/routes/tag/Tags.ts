import { Response, Request } from "express";
import Tag from "../../models/Tag";
import Image from "../../models/Image";

export const getTags = async (req: Request, res: Response) => {
  const tags = await Tag.findAll({ include: [{ model: Image, as: "images" }] });
  const usedTags = tags.filter(tag => tag.images.length > 0);
  return res.json(usedTags.map(t => ({ id: t.id, name: t.name })));
};