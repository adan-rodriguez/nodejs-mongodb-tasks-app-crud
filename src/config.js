import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/test";

export const ENVIRONMENT = process.env.ENVIRONMENT;
