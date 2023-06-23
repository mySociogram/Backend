import { Request, Response } from "express";
import User from "../models/userModel";
import { v4 as uuidv4 } from "uuid";

export const userSignUp = async (req: Request, res: Response) => {
  const { walletId } = req.body;
  try {
    const existingUser = await User.findOne({ where: { walletId } });
    if (existingUser) {
      return res.status(409).json({ message: "Wallet address already exists" });
    }

    const id = uuidv4();

    const newUser = await User.create({ id, walletId });
    return res.status(201).json({ message: "Wallet connected successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.findAll();
    //console.log(allUsers, "allusers");

    if (!allUsers) {
      return res.status(404).json({ Error: 'No Users found' });
    }
    return res.status(200).json({ allUsers });
  } catch (error) {
    return res.status(500).json({ error });
  }
};