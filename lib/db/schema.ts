import { pgTableCreator, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `website_${name}`);

export const shortcut = createTable("shortcut", {
    url: varchar("url", { length: 256 }).notNull(),
    shortcut: varchar("shortcut", { length: 50 }).primaryKey(),
});

export type SelectShortcut = typeof shortcut.$inferSelect;