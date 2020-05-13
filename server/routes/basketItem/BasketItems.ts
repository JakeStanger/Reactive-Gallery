import { Request, Response } from "express";
import BasketItem from "../../models/BasketItem";
import Image from "../../models/Image";
import Price from "../../models/Price";

export async function getUserBasket(userId: number) {
  return await BasketItem.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Image,
        as: "image"
      },
      {
        model: Price,
        as: "price"
      }
    ]
  });
}

export const getBasket = async (req: Request, res: Response) => {
  const basket = await getUserBasket((req.user as any).id);
  return res.status(200).json(basket);
};

export const clearBasket = async (req: Request, res: Response) => {
  await BasketItem.destroy({ where: { user_id: (req.user as any).id } });

  return res.status(200).json({ msg: "success" });
};
