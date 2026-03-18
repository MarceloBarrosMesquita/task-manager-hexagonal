import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { AppError } from "../../../domain/error/AppError"

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError("Token not provided", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const decoded = jwt.verify(token, "secret")

    ;(req as any).user = decoded

    return next()
  } catch {
    throw new AppError("Invalid token", 401)
  }
}


