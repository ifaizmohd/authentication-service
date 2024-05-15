import { Router, Request, Response } from "express";

export interface AuthenticationController {
  router: Router;
  initializeRoutes(): void;
  registerUser(req: Request, res: Response): Promise<void>;
  verifyEmail(req: Request, res: Response): Promise<void>;
  loginUser(req: Request, res: Response): Promise<void>;
}
