import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

export const userSignup = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const userSignin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
    return;
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found!.",
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
      return;
    }

    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Login successful.",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(`Error in user signin controller: ${(error as Error).message}`);
    res.status(500).json({
      success: false,
      message:
        (error as Error).message || "Something went wrong while login the user",
    });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 01e79961173018d990a764152be9613cd7a7945b
