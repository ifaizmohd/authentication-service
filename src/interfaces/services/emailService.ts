export interface Email {
  sendVerificationEmail(
    email: string,
    verificationToken: string
  ): Promise<void>;
}
