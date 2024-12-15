// dbconfig.jsx
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://finance_owner:8yOdgbNZAV5k@ep-bold-glade-a1erq4fz.ap-southeast-1.aws.neon.tech/finance?sslmode=require"
);
export const db = drizzle(sql, { schema });