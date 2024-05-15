import { Client, Pool } from "pg";

export class DB {
  private static dbClient: Client = new Client();
  private static pool: Pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
  });

  public static async connectToDbClient(): Promise<void> {
    await this.dbClient.connect();
  }

  public static async connectToDbPool(): Promise<void> {
    await this.pool.connect();
  }

  public static getPool(): Pool {
    return this.pool;
  }

  public static async runQuery(query: string): Promise<void> {
    await this.dbClient.query(query);
  }
}

export async function setupDb(): Promise<void> {
  try {
    const dropUsersTable = `DROP TABLE IF EXISTS users;`;
    const query = `CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(255) NOT NULL,         
            password VARCHAR(255) NOT NULL,
            verified BOOLEAN DEFAULT false)`;
    await DB.connectToDbClient();
    // await DB.runQuery(dropUsersTable);
    await DB.runQuery(query);
  } catch (error) {
    console.log("Error Occurred!! ", error);
  }
}

// setupDb().catch(console.log);
