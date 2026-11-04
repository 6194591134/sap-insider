// Runs before each deploy. On a brand-new database it loads the starting content:
// providers, resources and organizations (seed.ts), then the source-checked regulatory updates.
// On later deploys it does nothing, so it never overwrites live content.
import { execSync } from "node:child_process";
import { db, pool } from "./db";
import { providers } from "@shared/schema";

const existing = await db.select({ id: providers.id }).from(providers).limit(1);
await pool.end();

if (existing.length > 0) {
  console.log("Database already has content. Nothing to load.");
} else {
  console.log("New database: loading starting content...");
  execSync("npx tsx server/seed.ts", { stdio: "inherit" });
  execSync("npx tsx server/update-articles.ts", { stdio: "inherit" });
}
