import { Request, Response } from "express";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../../config.json";

export const login = async (req: Request, res: Response) => {
  if (!req.body.username)
    return res.status(400).json({ message: "Missing username" });
  if (!req.body.password)
    return res.status(400).json({ message: "Missing password" });

  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(401).json({ message: "Incorrect username" });

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid)
    return res.status(401).json({ message: "Incorrect password" });

  const accessToken = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: config.tokenLife
  });

  return res.status(200).send({ accessToken });
};

export const signup = async (req: Request, res: Response) => {
  if (!req.body.username)
    return res.status(400).json({ message: "Missing username" });
  if (!req.body.password)
    return res.status(400).json({ message: "Missing password" });

  const user = await User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password)
  });

  const accessToken = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: config.tokenLife
  });

  return res.status(201).send({ accessToken });
};

export const getUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user && user.id) {
    const dbUser = await User.findOne({ where: { id: user.id } });

    if (dbUser)
      return res.json({
        username: dbUser.username,
        permissions: {
          edit: dbUser.canEdit,
          upload: dbUser.canUpload
        }
      });
  }

  return res.status(400).json({ message: "User not found" });
};
