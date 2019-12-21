import { Request, Response } from "express";
import PriceGroup from "../../models/PriceGroup";

export const getPriceGroups = async (req: Request, res: Response) => {
  const events = await PriceGroup.findAll();
  return res.json(events);
};
