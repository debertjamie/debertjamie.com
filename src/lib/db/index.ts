import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { dbUrl } from "../env";

export const db = drizzle({ client: neon(dbUrl!) });