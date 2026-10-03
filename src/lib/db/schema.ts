import {
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `website_${name}`);

export const shortcut = createTable("shortcut", {
  url: varchar("url", { length: 256 }).notNull(),
  shortcut: varchar("shortcut", { length: 50 }).primaryKey(),
});

export const board = createTable("board", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  username: text("user_name").notNull(),
  userAvatar: text("user_avatar").notNull(),
  content: text("content").notNull(),
  colorChoice: integer("color_choice").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const gallery = createTable("gallery", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SelectShortcut = typeof shortcut.$inferSelect;
export type InsertBoard = typeof board.$inferInsert;
export type SelectBoard = typeof board.$inferSelect;
export type SelectGallery = typeof gallery.$inferSelect;
