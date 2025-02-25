import { Request, Response } from "express";
import LinkModel from "../models/Link.model";
import { random } from "../utils/randomHash";
import ContentModel from "../models/content.model";
import UserModel from "../models/user.model";

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

export const shareLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const hash = req.params.shareLink;
    if (!hash) {
      res.status(400).json({
        success: false,
        message: "Hash is required.",
      });
    }

    const link = await LinkModel.findOne({ hash });
    if (!link) {
      res.status(404).json({
        success: false,
        message: "Link not found.",
      });
      return;
    }

    const content = await ContentModel.findOne({ userId: link.userId });
    if (!content) {
      res.status(404).json({
        success: false,
        message: "Content not found.",
      });
      return;
    }

    const user = await UserModel.findOne({ _id: link.userId });

    res.status(200).json({
      success: true,
      message: "Successfully shared the link.",
      username: user?.username,
      content: content,
    });
  } catch (error) {
    console.log("Error in shareLink controller:", (error as Error).message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sharing the link.",
    });
  }
};
