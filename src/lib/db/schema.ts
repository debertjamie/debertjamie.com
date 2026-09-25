import { integer, pgTableCreator, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `website_${name}`);

export const shortcut = createTable("shortcut", {
    url: varchar("url", { length: 256 }).notNull(),
    shortcut: varchar("shortcut", { length: 50 }).primaryKey(),
});

export const board = createTable("board", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    username: text("user_name").notNull(),
    userAvatar: text("user_avatar").notNull(),
    content: text("content").notNull(),
    svgTheme: text("svg_theme").default("scribble").notNull(),
    xPos: integer("x_pos").notNull(),
    yPos: integer("y_pos").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SelectShortcut = typeof shortcut.$inferSelect;
export type InsertBoard = typeof board.$inferInsert;
export type SelectBoard = typeof board.$inferSelect;
