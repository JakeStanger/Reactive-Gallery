import { Request, Response } from "express";
import Price from "../../models/Price";

export const getPrices = async (req: Request, res: Response) => {
  const prices = await Price.findAll();
  return res.json(prices);
};

export const getPricesForGroup = async (req: Request, res: Response) => {
  const prices = await Price.findAll({
    where: { price_group_id: req.params.groupId }
  });

  return res.json(prices);
};
