import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized.",
    });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    if (!decodedToken) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    req.userId = decodedToken.id;

    return next();
  } catch (error) {
    console.error("Error occurs while decoded the token:", error);
    return res.status(500).json({ message: "Invalid token" });
  }
};
