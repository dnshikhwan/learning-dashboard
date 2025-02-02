import { logger } from "./log.helper";
import pg from "pg";
const { Client } = pg;

export const client = new Client({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "learning_dashboard",
});

export const dbInit = async () => {
  try {
    await client.connect();
    logger.info("Connected to db");
  } catch (err) {
    logger.error("Error connecting to DB: ", err);
  }
};
