import { Request, Response } from "express";
import ContentModel, { IContent } from "../models/content.model";

export const addContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { link, title } = req.body;

  if (!link || !title) {
    res.status(400).json({
      success: false,
      message: "Both 'link' and 'title' are required.",
    });
    return;
  }

  try {
    const newContent: IContent = await ContentModel.create({
      link,
      title,
      userId: req.userId,
      tags: [],
    });

    res.status(201).json({
      success: true,
      message: "Content successfully added.",
      data: newContent,
    });
  } catch (error) {
    console.error(
      `Error in addContent controller: ${(error as Error).message}`
    );
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getContent = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.userId;
    
    const content = await ContentModel.find({ userId }).populate({
      path: "userId",
      select: "username",
    });
    if (!content) {
      res.status(400).json({
        success: false,
        message: "No Content Available."
      })
    }

    res.status(200).json({
      success: false,
      message: "Content retrieved successfully.",
      content: content
    })
  } catch (error) {
    console.error(
      `Error in getContent controller: ${(error as Error).message}`
    );
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}
