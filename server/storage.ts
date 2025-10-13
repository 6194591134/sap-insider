// Referenced from blueprint:javascript_database integration
// Referenced from blueprint:javascript_log_in_with_replit integration
import {
  type RegulatoryUpdate,
  type InsertRegulatoryUpdate,
  type Provider,
  type InsertProvider,
  type Review,
  type InsertReview,
  type Resource,
  type InsertResource,
  type Organization,
  type InsertOrganization,
  type User,
  type UpsertUser,
  regulatoryUpdates,
  providers,
  reviews,
  resources,
  organizations,
  users,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations - Required for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Regulatory Updates
  getAllUpdates(): Promise<RegulatoryUpdate[]>;
  getUpdateById(id: string): Promise<RegulatoryUpdate | undefined>;
  getFeaturedUpdate(): Promise<RegulatoryUpdate | undefined>;
  createUpdate(update: InsertRegulatoryUpdate): Promise<RegulatoryUpdate>;

  // Providers
  getAllProviders(): Promise<Provider[]>;
  getProviderById(id: string): Promise<Provider | undefined>;
  getTopProviders(limit: number): Promise<Provider[]>;
  createProvider(provider: InsertProvider): Promise<Provider>;
  updateProvider(id: string, provider: Partial<Provider>): Promise<Provider | undefined>;

  // Reviews
  getReviewsByProviderId(providerId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Resources
  getAllResources(): Promise<Resource[]>;
  getResourceById(id: string): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;

  // Organizations
  getAllOrganizations(): Promise<Organization[]>;
  getOrganizationById(id: string): Promise<Organization | undefined>;
  createOrganization(organization: InsertOrganization): Promise<Organization>;
}

export class DatabaseStorage implements IStorage {
  // User operations - Required for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Regulatory Updates
  async getAllUpdates(): Promise<RegulatoryUpdate[]> {
    return await db.select().from(regulatoryUpdates).orderBy(desc(regulatoryUpdates.publishedDate));
  }

  async getUpdateById(id: string): Promise<RegulatoryUpdate | undefined> {
    const [update] = await db.select().from(regulatoryUpdates).where(eq(regulatoryUpdates.id, id));
    return update || undefined;
  }

  async getFeaturedUpdate(): Promise<RegulatoryUpdate | undefined> {
    const [update] = await db.select().from(regulatoryUpdates).where(eq(regulatoryUpdates.featured, true));
    return update || undefined;
  }

  async createUpdate(insertUpdate: InsertRegulatoryUpdate): Promise<RegulatoryUpdate> {
    const [update] = await db
      .insert(regulatoryUpdates)
      .values(insertUpdate)
      .returning();
    return update;
  }

  // Providers
  async getAllProviders(): Promise<Provider[]> {
    return await db.select().from(providers).orderBy(desc(providers.rating));
  }

  async getProviderById(id: string): Promise<Provider | undefined> {
    const [provider] = await db.select().from(providers).where(eq(providers.id, id));
    return provider || undefined;
  }

  async getTopProviders(limit: number): Promise<Provider[]> {
    return await db.select().from(providers).orderBy(desc(providers.rating)).limit(limit);
  }

  async createProvider(insertProvider: InsertProvider): Promise<Provider> {
    const [provider] = await db
      .insert(providers)
      .values(insertProvider)
      .returning();
    return provider;
  }

  async updateProvider(id: string, updates: Partial<Provider>): Promise<Provider | undefined> {
    const [provider] = await db
      .update(providers)
      .set(updates)
      .where(eq(providers.id, id))
      .returning();
    return provider || undefined;
  }

  // Reviews
  async getReviewsByProviderId(providerId: string): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.providerId, providerId)).orderBy(desc(reviews.createdAt));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db
      .insert(reviews)
      .values(insertReview)
      .returning();

    // Update provider rating and review count
    const providerReviews = await this.getReviewsByProviderId(insertReview.providerId);
    const avgRating = Math.round(
      providerReviews.reduce((sum, r) => sum + r.rating, 0) / providerReviews.length
    );
    await this.updateProvider(insertReview.providerId, {
      rating: avgRating,
      reviewCount: providerReviews.length,
    });

    return review;
  }

  // Resources
  async getAllResources(): Promise<Resource[]> {
    return await db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async getResourceById(id: string): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource || undefined;
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db
      .insert(resources)
      .values(insertResource)
      .returning();
    return resource;
  }

  // Organizations
  async getAllOrganizations(): Promise<Organization[]> {
    return await db.select().from(organizations).orderBy(desc(organizations.featured));
  }

  async getOrganizationById(id: string): Promise<Organization | undefined> {
    const [organization] = await db.select().from(organizations).where(eq(organizations.id, id));
    return organization || undefined;
  }

  async createOrganization(insertOrganization: InsertOrganization): Promise<Organization> {
    const [organization] = await db
      .insert(organizations)
      .values(insertOrganization)
      .returning();
    return organization;
  }
}

export const storage = new DatabaseStorage();
