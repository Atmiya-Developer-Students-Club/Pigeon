import dotenv from "dotenv";

dotenv.config();

export const API_KEY = process.env.MAILER_API_KEY || "changeme";

export const SMTP_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || "user@example.com",
    pass: process.env.SMTP_PASS || "password",
  },
};

export const BATCH_SIZE = 50;
export const BATCH_DELAY_MS = 2000;

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
