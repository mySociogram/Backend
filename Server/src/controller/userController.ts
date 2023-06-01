import { Request, Response } from "express";
import User from "../model/userModel";

export const userSignUp = async (req: Request, res: Response) => {
  const { walletId } = req.body;
  try {
    const existingUser = await User.findOne({ where: { walletId } });
    if (existingUser) {
      return res.status(409).json({ message: "Wallet address already exists" });
    }
    const newUser = await User.create(walletId);
    await newUser.save();
    return res.status(201).json({ message: "Wallet connected successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
