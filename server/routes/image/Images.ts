import { Request, Response } from "express";
import Location from "../../database/models/Location";
import Tag from "../../database/models/Tag";
import Image from "../../database/models/Image";
import { Op } from "sequelize";

export const getImages = async (req: Request, res: Response) => {
  const images = await Image.findAll({
    where: { deleted: { [Op.or]: [0, null] } },
    include: [{ model: Location, as: "location" }, { model: Tag, as: "tags" }],
    order: [["timeTaken", "DESC"]]
  });
  return res.json(images);
};
