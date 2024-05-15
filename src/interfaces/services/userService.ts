export interface UserAuthentication {
  createUser(email: string, password: string): Promise<any>;
  generateVerificationToken(userId: number): Promise<string>;
  verifyEmail(token: string): Promise<void>;
  authenticateUser(email: string, password: string): Promise<any>;
}
