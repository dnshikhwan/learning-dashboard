import { logger } from "./log.helper";
import pg from "pg";
const { Client } = pg;

export const client = new Client({
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASS || "root",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DATABASE || "learning_dashboard",
});

export const dbInit = async () => {
  try {
    await client.connect();
    logger.info("Connected to db");
  } catch (err) {
    logger.error("Error connecting to DB: ", err);
  }
};
