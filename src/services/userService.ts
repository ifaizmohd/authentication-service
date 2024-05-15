import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { DB } from "../db";
import { UserAuthentication } from "../interfaces/services/userService";

export class UserService implements UserAuthentication {
  private pool: Pool;

  constructor() {
    this.pool = DB.getPool();
  }

  public async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    const client = await this.pool.connect();
    try {
      const queryText =
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";
      const result = await client.query(queryText, [name, email, password]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // TODO:
  public async generateVerificationToken(userId: number): Promise<string> {
    // Implement token generation logic here
    return "dummy_verification_token";
  }

  // TODO:
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
