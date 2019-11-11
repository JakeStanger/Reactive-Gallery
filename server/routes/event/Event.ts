import { Request, Response } from "express";
import Event from "../../models/Event";
import User from "../../models/User";
import Image from "../../models/Image";

export const postEvent = async (req: Request, res: Response) => {
  if (!req.body || !req.body.name)
    return res.status(400).json({ message: "Missing body" });

  const user = await User.findOne({ where: { id: (req.user as any).id } });
  if (!user.canUpload) {
    res.status(401).json({ message: "Missing upload permissions" });
  }

  const event = await Event.getFromObject(req.body);
  return res.status(201).json(event);
};

export const patchEvent = async (req: Request, res: Response) => {
  if (!req.body || !Object.keys(req.body).length)
    return res.status(400).json({ message: "Missing body" });

  const user = await User.findOne({ where: { id: (req.user as any).id } });
  if (!user.canEdit) {
    res.status(401).json({ message: "Missing edit permissions" });
  }

  // Update name/description
  await Event.update(req.body, {
    where: { id: req.params.name }
  });
};

export const deleteEvent = async(req: Request, res: Response) => {

};