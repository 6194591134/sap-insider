import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Regulatory Updates
export const regulatoryUpdates = pgTable("regulatory_updates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  agency: text("agency").notNull(), // FMCSA, PHMSA, FAA, FTA, FRA, USCG
  category: text("category").notNull(),
  summary: text("summary").notNull(),
  plainLanguageSummary: text("plain_language_summary"),
  publishedDate: timestamp("published_date").notNull(),
  featured: boolean("featured").default(false),
});

export const insertRegulatoryUpdateSchema = createInsertSchema(regulatoryUpdates).omit({
  id: true,
});

export type RegulatoryUpdate = typeof regulatoryUpdates.$inferSelect;
export type InsertRegulatoryUpdate = z.infer<typeof insertRegulatoryUpdateSchema>;

// Providers
export const providers = pgTable("providers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logo: text("logo"),
  rating: integer("rating").notNull(), // 1-5 stars
  reviewCount: integer("review_count").default(0),
  dotCompliant: boolean("dot_compliant").default(false),
  nonDotCompliant: boolean("non_dot_compliant").default(false),
  features: text("features").array().notNull().default(sql`ARRAY[]::text[]`),
  languages: text("languages").array().notNull().default(sql`ARRAY[]::text[]`),
  description: text("description").notNull(),
  website: text("website"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  verified: boolean("verified").default(false),
});

export const insertProviderSchema = createInsertSchema(providers).omit({
  id: true,
  reviewCount: true,
});

export type Provider = typeof providers.$inferSelect;
export type InsertProvider = z.infer<typeof insertProviderSchema>;

// Reviews
export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  rating: integer("rating").notNull(), // 1-5 overall rating
  courseQuality: integer("course_quality").notNull(), // 1-5
  reportingTools: integer("reporting_tools").notNull(), // 1-5
  communication: integer("communication").notNull(), // 1-5
  sapSupport: integer("sap_support").notNull(), // 1-5
  comment: text("comment"),
  reviewerName: text("reviewer_name"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

// Resources
export const resources = pgTable("resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(), // template, webinar, guide, checklist
  category: text("category").notNull(),
  description: text("description").notNull(),
  downloadUrl: text("download_url"),
  duration: text("duration"), // for webinars
  speaker: text("speaker"), // for webinars
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

// Organizations
export const organizations = pgTable("organizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logo: text("logo"),
  description: text("description").notNull(),
  website: text("website").notNull(),
  stats: jsonb("stats").$type<{
    members?: string;
    established?: string;
    certifications?: string;
  }>(),
  featured: boolean("featured").default(false),
});

export const insertOrganizationSchema = createInsertSchema(organizations).omit({
  id: true,
});

export type Organization = typeof organizations.$inferSelect;
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
