import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function changePasswordAuth(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;
  const {email} = request.body
  
  if (!authHeader) {
    throw new AppError("JWT is missing", 401);
  }

  try {
    
    const token = authHeader.split(" ")[1];

    const decoded = verify(token, process.env.CHANGE_PASSWORD_VALIDATION_KEY);
    
    const { sub } = decoded as TokenPayload;
    
    request.validation = {
        password: sub,
    };
    
    return next();
  } catch (err) {
    throw new AppError("JWT Expired or sended in a wrong way");
  }
}
