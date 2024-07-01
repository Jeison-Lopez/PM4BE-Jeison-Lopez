import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] {${req.url}, ${req.method}}`,
  );
  next();
}
