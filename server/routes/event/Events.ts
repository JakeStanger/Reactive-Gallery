import { Request, Response } from "express";
import Event from "../../models/Event";
import { Op } from "sequelize";

export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.findAll({
    where: { endTime: { [Op.gt]: new Date() } },
    order: ["startTime"]
  });
  return res.json(events);
};
