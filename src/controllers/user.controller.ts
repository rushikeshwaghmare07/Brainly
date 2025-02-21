import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user.model";

export const userSignup = async ( req: Request, res: Response ): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
    return;
  }

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists.",
      });
      return;
    }

    const newUser: IUser = await UserModel.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User register successfully.",
      data: newUser,
    });
  } catch (error) {
    console.log(`Error in user signup controller: ${(error as Error).message}`);
    res.status(500).json({
      success: false,
      message:
        (error as Error).message ||
        "Something went wrong while register the user",
    });
  }
};
