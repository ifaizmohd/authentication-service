import bcrypt from "bcryptjs";
import { Pool } from "pg";
import createPool from "../db";
import { UserAuthentication } from "../interfaces/services/userService";

export class UserService implements UserAuthentication {
  private pool: Pool;

  constructor() {
    this.pool = createPool();
  }

  public async createUser(email: string, password: string): Promise<any> {
    const client = await this.pool.connect();
    try {
      const queryText =
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";
      const result = await client.query(queryText, [email, password]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  public async generateVerificationToken(userId: number): Promise<string> {
    // Implement token generation logic here
    return "dummy_verification_token";
  }

  public async verifyEmail(token: string): Promise<void> {
    // Implement email verification logic here
    // You may need to decode the token and update the user's verification status in the database
  }

  public async authenticateUser(email: string, password: string): Promise<any> {
    const client = await this.pool.connect();
    try {
      const queryText = "SELECT * FROM users WHERE email = $1";
      const result = await client.query(queryText, [email]);
      const user = result.rows[0];
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid password");
      }
      return user;
    } finally {
      client.release();
    }
  }
}
