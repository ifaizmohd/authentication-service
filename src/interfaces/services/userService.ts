export interface UserAuthentication {
  createUser(name: string, email: string, password: string): Promise<any>;
  generateVerificationToken(userId: number): Promise<string>;
  verifyEmail(token: string): Promise<void>;
  authenticateUser(email: string, password: string): Promise<any>;
}
