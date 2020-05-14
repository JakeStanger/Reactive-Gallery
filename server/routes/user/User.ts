import { Request, Response } from "express";
import User from "../../database/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

function signJwt(user: User) {
  return jwt.sign({ id: user.id }, process.env.SESSION_SECRET, {
    expiresIn: process.env.TOKEN_LIFE
  });
}

export const login = async (req: Request, res: Response) => {
  if (!req.body.username)
    return res.status(400).json({ msg: "Missing username" });
  if (!req.body.password)
    return res.status(400).json({ msg: "Missing password" });

  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(401).json({ msg: "Incorrect username" });

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid)
    return res.status(401).json({ msg: "Incorrect password" });

  const accessToken = signJwt(user);

  return res.status(200).send({ accessToken });
};

export const signup = async (req: Request, res: Response) => {
  if (!req.body.username)
    return res.status(400).json({ msg: "Missing username" });
  if (!req.body.password)
    return res.status(400).json({ msg: "Missing password" });

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  });

  const accessToken = signJwt(user);

  return res.status(201).send({ accessToken });
};

export const getUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user && user.id) {
    const dbUser = await User.findOne({ where: { id: user.id } });

    if (dbUser)
      return res.json({
        username: dbUser.username,
        email: dbUser.email,
        permissions: {
          edit: dbUser.canEdit,
          upload: dbUser.canUpload
        }
      });
  }

  return res.status(400).json({ msg: "User not found" });
};
