import { API_KEY } from "../utils/config";
import { logError } from "../utils/logger";
import type { Request, Response, NextFunction } from "express";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const auth = req.header("authorization");

  if (!auth || auth !== `Bearer ${API_KEY}`) {
    logError("Unauthorized request");
    return res.status(401).send("Unauthorized");
  }

  next();
}
