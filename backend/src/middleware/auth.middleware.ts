import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized.",
    });
    return;
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    if (!decodedToken) {
      res.status(401).json({
        message: "Unauthorized.",
      });
      return;
    }

    req.userId = decodedToken.id;

    return next();
  } catch (error) {
    console.error("Error occurs while decoded the token:", error);
    res.status(500).json({ message: "Invalid token" });
  }
};
