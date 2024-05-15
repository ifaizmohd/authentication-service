import nodemailer from "nodemailer";
import { createTransporter } from "./mailer";
import { Email } from "../interfaces/services/emailService";

export class EmailService implements Email {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize Nodemailer transporter
    this.transporter = createTransporter();
  }

  public async sendVerificationEmail(
    email: string,
    verificationToken: string
  ): Promise<void> {
    try {
      const verificationLink = `http://localhost:3000/verify/${verificationToken}`; // Change this URL to your frontend app
      await this.transporter.sendMail({
        to: email,
        subject: "Verify your email address",
        html: `Click <a href="${verificationLink}">here</a> to verify your email address.`,
      });
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error; // Rethrow the error for handling in the caller
    }
  }
}
