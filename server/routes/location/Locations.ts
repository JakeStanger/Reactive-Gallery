import { Request, Response } from "express";
import Location from "../../database/models/Location";

export const getLocations = async (req: Request, res: Response) => {
  const locations = await Location.findAll();
  return res.json(locations);
};
