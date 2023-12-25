import { Request } from "express";

export const LoggerMiddleware = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  console.log("ip:",req.ip);
  next();
};