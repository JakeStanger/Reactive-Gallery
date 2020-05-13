import { Request, Response } from "express";
import BasketItem from "../../models/BasketItem";

export const postBasketItem = async (req: Request, res: Response) => {
  const data = req.body;

  const [item, isNew] = await BasketItem.findOrCreate({where: {
    framed: data.framed,
    user_id: (req.user as any).id,
    image_id: data.image.id,
    price_id: data.price.id
    }});

  if(data.quantity) {
    if(isNew) item.quantity = data.quantity;
    else item.quantity += data.quantity;

    await item.save();
  }

  return res.status(201).json({msg: "success"});
};

export const deleteBasketItem = async (req: Request, res: Response) => {
  await BasketItem.destroy({where: {id: req.params.basketItemId}});
  return res.status(201).json({msg: "success"});

}
