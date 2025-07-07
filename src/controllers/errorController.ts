import { Request, Response, NextFunction } from "express";

// global error
interface CustomError extends Error {
  statusCode?: number;
  status?: number;
}

export function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);

  const statusCode = err.statusCode ?? err.status ?? 500;
  const message = err.message ? err.message : "Internal Server Error";
  const title = statusCode === 500 ? "Server Error" : "Error";

  res.status(statusCode).render("error", {
    title,
    message,
    statusCode,
  });
}
