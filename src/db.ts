import { Pool } from "pg";

export default function createPool(): Pool {
  return new Pool({
    user: "your_username",
    host: "localhost",
    database: "your_database",
    password: "your_password",
    port: 5432,
  });
}
