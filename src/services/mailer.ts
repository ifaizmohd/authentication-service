import nodemailer from "nodemailer";

export function createTransporter(): nodemailer.Transporter {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email",
      pass: "your_password",
    },
  });
}
