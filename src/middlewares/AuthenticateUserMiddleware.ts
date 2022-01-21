import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import AppError from "../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing authorization headers", 401);
  }

  const [_, token] = authHeader.split(" ");

  const secret = process.env.SECRET_JWT;

  const decoded = verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      throw new AppError("Invalid Token.", 401);
    }

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };
    return next();
  });
}
