import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserService } from "../services/userService";
import { EmailService } from "../services/emailService";
import { AuthenticationController } from "../interfaces/controllers/authController";

export class AuthController implements AuthenticationController {
  public router = express.Router();
  private userService: UserService;
  private emailService: EmailService;

  constructor() {
    this.userService = new UserService();
    this.emailService = new EmailService();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post("/register", this.registerUser);
    this.router.get("/verify/:token", this.verifyEmail);
    this.router.post("/login", this.loginUser);
  }

  public registerUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user to database
      const user = await this.userService.createUser(email, hashedPassword);

      // Send verification email
      const verificationToken =
        await this.userService.generateVerificationToken(user.id);
      await this.emailService.sendVerificationEmail(email, verificationToken);

      res.status(201).json({
        message:
          "User registered successfully. Please check your email for verification.",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public verifyEmail = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;

      // Verify token
      await this.userService.verifyEmail(token);

      res.redirect("http://localhost:3000/login"); // Redirect to login page after verification
    } catch (error) {
      console.error("Error during email verification:", error);
      res.status(400).json({ error: "Invalid or expired token" });
    }
  };

  public loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Authenticate user
      const user = await this.userService.authenticateUser(email, password);

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "your_secret_key",
        { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export const AuthRouter = new AuthController().router;
