import { Request, NextFunction } from 'express';

export function LoggerMiddleware(req: Request, next: NextFunction) {
  console.log(
    `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] {${req.url}, ${req.method}}`,
  );
  next();
}
