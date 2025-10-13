import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertRegulatoryUpdateSchema,
  insertProviderSchema,
  insertReviewSchema,
  insertResourceSchema,
  insertOrganizationSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Regulatory Updates
  app.get("/api/updates", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      let updates = await storage.getAllUpdates();
      if (limit) {
        updates = updates.slice(0, limit);
      }
      res.json(updates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch updates" });
    }
  });

  app.get("/api/updates/featured", async (req, res) => {
    try {
      const update = await storage.getFeaturedUpdate();
      if (!update) {
        return res.status(404).json({ error: "No featured update found" });
      }
      res.json(update);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured update" });
    }
  });

  app.get("/api/updates/:id", async (req, res) => {
    try {
      const update = await storage.getUpdateById(req.params.id);
      if (!update) {
        return res.status(404).json({ error: "Update not found" });
      }
      res.json(update);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch update" });
    }
  });

  app.post("/api/updates", async (req, res) => {
    try {
      const data = insertRegulatoryUpdateSchema.parse(req.body);
      const update = await storage.createUpdate(data);
      res.status(201).json(update);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  // Providers
  app.get("/api/providers", async (req, res) => {
    try {
      const providers = await storage.getAllProviders();
      res.json(providers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch providers" });
    }
  });

  app.get("/api/providers/top", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const providers = await storage.getTopProviders(limit);
      res.json(providers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch top providers" });
    }
  });

  app.get("/api/providers/:id", async (req, res) => {
    try {
      const provider = await storage.getProviderById(req.params.id);
      if (!provider) {
        return res.status(404).json({ error: "Provider not found" });
      }
      res.json(provider);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch provider" });
    }
  });

  app.post("/api/providers", async (req, res) => {
    try {
      const data = insertProviderSchema.parse(req.body);
      const provider = await storage.createProvider(data);
      res.status(201).json(provider);
    } catch (error) {
      res.status(400).json({ error: "Invalid provider data" });
    }
  });

  // Reviews
  app.get("/api/reviews/:providerId", async (req, res) => {
    try {
      const reviews = await storage.getReviewsByProviderId(req.params.providerId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const data = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(data);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  // Resources
  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getAllResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const resource = await storage.getResourceById(req.params.id);
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resource" });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const data = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(data);
      res.status(201).json(resource);
    } catch (error) {
      res.status(400).json({ error: "Invalid resource data" });
    }
  });

  // Organizations
  app.get("/api/organizations", async (req, res) => {
    try {
      const organizations = await storage.getAllOrganizations();
      res.json(organizations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch organizations" });
    }
  });

  app.get("/api/organizations/:id", async (req, res) => {
    try {
      const organization = await storage.getOrganizationById(req.params.id);
      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }
      res.json(organization);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch organization" });
    }
  });

  app.post("/api/organizations", async (req, res) => {
    try {
      const data = insertOrganizationSchema.parse(req.body);
      const organization = await storage.createOrganization(data);
      res.status(201).json(organization);
    } catch (error) {
      res.status(400).json({ error: "Invalid organization data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
