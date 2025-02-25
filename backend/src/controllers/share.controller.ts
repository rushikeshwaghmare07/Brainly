import { Request, Response } from "express";
import LinkModel from "../models/Link.model";
import { random } from "../utils/randomHash";

export const share = async (req: Request, res: Response): Promise<void> => {
  try {
    const { share } = req.body;

    if (share === true) {
      const existingLink = await LinkModel.findOne({ userId: req.userId });
      if (existingLink) {
        res.json({
          hash: existingLink.hash
        })
      }
      const hash = random(10);
      await LinkModel.create({
        userId: req.userId,
        hash: hash,
      });

      res.status(200).json({
        success: true,
        message: "Successfully created the sharable link.",
        hash: hash,
      })
    } else {
      await LinkModel.deleteOne({
        userId: req.userId,
      });

      res.status(200).json({
        success: true,  
        message: "Successfully removed the sharable link.",
      })
    }
  } catch (error) {
    console.error(`Error in share controller: ${(error as Error).message}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the sharable link.",
    });
  }
};


