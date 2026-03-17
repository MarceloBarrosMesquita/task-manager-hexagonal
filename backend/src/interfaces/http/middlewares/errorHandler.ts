import { Request, Response, NextFunction } from "express"
import { AppError } from "../../../domain/error/AppError"

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message
    })
  }

  return res.status(500).json({
    error: "Internal server error"
  })
}