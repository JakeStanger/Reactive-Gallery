import { Request, Response } from "express";
import Image from "../../database/models/Image";
import Category from "../../database/models/Category";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    include: [{ model: Image, as: "images" }]
  });
  return res.json(categories.map(t => ({ id: t.id, name: t.name })));
};
