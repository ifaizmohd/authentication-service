import { NextFunction, Request, Response } from "express";
import { CustomError } from "./customError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("An error occurred:", err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: err.message,
      fileName: err.fileName,
      methodName: err.methodName,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (err.name === "DatabaseConnectionError") {
    return res.status(500).json({ error: "Database connection error" });
  }

  res.status(500).json({
    error: "Internal server error",
    fileName: "Unknown",
    methodName: "Unknown",
  });
};
