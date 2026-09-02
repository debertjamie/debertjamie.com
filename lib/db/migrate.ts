import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { dbUrl } from "../env";

const database = drizzle({ client: neon(dbUrl!) });

async function main() {
  try {
    await migrate(database, { migrationsFolder: "migrations" });
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
}

main();
