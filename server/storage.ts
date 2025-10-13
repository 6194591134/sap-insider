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
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
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

export class MemStorage implements IStorage {
  private updates: Map<string, RegulatoryUpdate>;
  private providers: Map<string, Provider>;
  private reviews: Map<string, Review>;
  private resources: Map<string, Resource>;
  private organizations: Map<string, Organization>;

  constructor() {
    this.updates = new Map();
    this.providers = new Map();
    this.reviews = new Map();
    this.resources = new Map();
    this.organizations = new Map();

    // Seed with sample data
    this.seedData();
  }

  private seedData() {
    // Sample Regulatory Updates
    const updates: RegulatoryUpdate[] = [
      {
        id: randomUUID(),
        title: "FMCSA Updates Drug and Alcohol Clearinghouse Query Requirements",
        content: "The Federal Motor Carrier Safety Administration has updated requirements for employers conducting queries in the Drug and Alcohol Clearinghouse...",
        agency: "FMCSA",
        category: "Clearinghouse",
        summary: "New requirements mandate more frequent limited queries and enhanced reporting protocols for safety-sensitive positions.",
        plainLanguageSummary: "Employers must now check the Clearinghouse more often when employees are in safety-sensitive jobs. This helps catch violations faster and keeps roads safer.",
        publishedDate: new Date("2024-01-15"),
        featured: true,
      },
      {
        id: randomUUID(),
        title: "FAA Clarifies SAP Evaluation Standards for Aviation Personnel",
        content: "The Federal Aviation Administration has issued new guidance regarding Substance Abuse Professional evaluation procedures...",
        agency: "FAA",
        category: "SAP Guidelines",
        summary: "Updated SAP evaluation standards ensure consistent application of return-to-duty protocols across all aviation safety-sensitive positions.",
        plainLanguageSummary: "All aviation workers who violate drug/alcohol rules will now go through the same SAP evaluation process, making it fair and consistent.",
        publishedDate: new Date("2024-01-10"),
        featured: false,
      },
      {
        id: randomUUID(),
        title: "PHMSA Extends Comment Period for Pipeline Safety Testing Protocols",
        content: "The Pipeline and Hazardous Materials Safety Administration announces extended comment period...",
        agency: "PHMSA",
        category: "Testing Protocols",
        summary: "Industry stakeholders have additional time to provide feedback on proposed changes to drug and alcohol testing procedures for pipeline workers.",
        plainLanguageSummary: null,
        publishedDate: new Date("2024-01-05"),
        featured: false,
      },
      {
        id: randomUUID(),
        title: "FTA Issues New Compliance Guidance for Transit Agencies",
        content: "The Federal Transit Administration has released comprehensive guidance for transit agencies...",
        agency: "FTA",
        category: "Compliance",
        summary: "New guidance addresses common compliance questions and provides best practices for implementing drug and alcohol testing programs.",
        plainLanguageSummary: "Transit agencies now have clearer instructions on how to run their drug and alcohol testing programs correctly.",
        publishedDate: new Date("2023-12-20"),
        featured: false,
      },
      {
        id: randomUUID(),
        title: "FRA Updates Medical Review Officer Qualification Requirements",
        content: "The Federal Railroad Administration announces updates to MRO qualification standards...",
        agency: "FRA",
        category: "Personnel Standards",
        summary: "Enhanced training and certification requirements for Medical Review Officers ensure accurate test result interpretation.",
        plainLanguageSummary: null,
        publishedDate: new Date("2023-12-15"),
        featured: false,
      },
    ];

    updates.forEach((update) => this.updates.set(update.id, update));

    // Sample Providers
    const providers: Provider[] = [
      {
        id: randomUUID(),
        name: "ReCourse.life",
        logo: null,
        rating: 5,
        reviewCount: 12,
        dotCompliant: true,
        nonDotCompliant: true,
        features: ["Online Courses", "SAP Referral Tools", "Automated Reporting", "24/7 Support"],
        languages: ["English", "Spanish"],
        description: "Comprehensive DOT and Non-DOT education courses with seamless SAP integration and real-time reporting capabilities.",
        website: "https://recourse.life",
        contactEmail: "info@recourse.life",
        contactPhone: "(555) 123-4567",
        verified: true,
      },
      {
        id: randomUUID(),
        name: "Compliance Education Network",
        logo: null,
        rating: 4,
        reviewCount: 8,
        dotCompliant: true,
        nonDotCompliant: false,
        features: ["DOT Courses", "Certificate Tracking", "Mobile Access"],
        languages: ["English"],
        description: "Focused DOT compliance education with industry-leading course content and easy certificate management.",
        website: "https://compliance-edu.example.com",
        contactEmail: "contact@compliance-edu.example.com",
        contactPhone: "(555) 234-5678",
        verified: true,
      },
      {
        id: randomUUID(),
        name: "SafetyFirst Learning",
        logo: null,
        rating: 4,
        reviewCount: 15,
        dotCompliant: true,
        nonDotCompliant: true,
        features: ["Interactive Courses", "Progress Tracking", "Multi-Language Support"],
        languages: ["English", "Spanish", "French"],
        description: "Engaging interactive courses designed for maximum retention and compliance effectiveness.",
        website: "https://safetyfirst-learning.example.com",
        contactEmail: "support@safetyfirst.example.com",
        contactPhone: null,
        verified: false,
      },
    ];

    providers.forEach((provider) => this.providers.set(provider.id, provider));

    // Sample Reviews
    const providerId1 = providers[0].id;
    const reviews: Review[] = [
      {
        id: randomUUID(),
        providerId: providerId1,
        rating: 5,
        courseQuality: 5,
        reportingTools: 5,
        communication: 4,
        sapSupport: 5,
        comment: "Excellent platform with seamless SAP integration. The automated reporting saves hours of administrative work.",
        reviewerName: "Sarah M., SAP",
        createdAt: new Date("2024-01-10"),
      },
      {
        id: randomUUID(),
        providerId: providerId1,
        rating: 5,
        courseQuality: 5,
        reportingTools: 5,
        communication: 5,
        sapSupport: 5,
        comment: "Best provider I've worked with. Course quality is outstanding and the referral process is incredibly smooth.",
        reviewerName: "John D., EAP",
        createdAt: new Date("2024-01-05"),
      },
    ];

    reviews.forEach((review) => this.reviews.set(review.id, review));

    // Sample Resources
    const resources: Resource[] = [
      {
        id: randomUUID(),
        title: "SAP Evaluation Checklist",
        type: "checklist",
        category: "Evaluation",
        description: "Comprehensive checklist for conducting thorough SAP evaluations in compliance with DOT regulations.",
        downloadUrl: "/downloads/sap-evaluation-checklist.pdf",
        duration: null,
        speaker: null,
        tags: ["SAP", "Evaluation", "Compliance"],
        createdAt: new Date("2024-01-01"),
      },
      {
        id: randomUUID(),
        title: "Return-to-Duty Process Template",
        type: "template",
        category: "RTD",
        description: "Step-by-step template for managing the complete return-to-duty process from violation to reinstatement.",
        downloadUrl: "/downloads/rtd-template.docx",
        duration: null,
        speaker: null,
        tags: ["RTD", "Template", "Process"],
        createdAt: new Date("2023-12-15"),
      },
      {
        id: randomUUID(),
        title: "Understanding DOT Clearinghouse Requirements",
        type: "webinar",
        category: "Clearinghouse",
        description: "Expert-led webinar covering all aspects of the Drug and Alcohol Clearinghouse, including query requirements and reporting obligations.",
        downloadUrl: "/webinars/clearinghouse-requirements",
        duration: "45 minutes",
        speaker: "Dr. Jennifer Williams, FMCSA Compliance Expert",
        tags: ["Clearinghouse", "DOT", "Compliance"],
        createdAt: new Date("2023-12-01"),
      },
      {
        id: randomUUID(),
        title: "SAP Best Practices Guide 2024",
        type: "guide",
        category: "Best Practices",
        description: "Comprehensive guide to SAP best practices including evaluation techniques, documentation requirements, and follow-up protocols.",
        downloadUrl: "/downloads/sap-best-practices-2024.pdf",
        duration: null,
        speaker: null,
        tags: ["SAP", "Best Practices", "2024"],
        createdAt: new Date("2023-11-20"),
      },
    ];

    resources.forEach((resource) => this.resources.set(resource.id, resource));

    // Sample Organizations
    const organizations: Organization[] = [
      {
        id: randomUUID(),
        name: "ASAP (Association of SAP Professionals)",
        logo: null,
        description: "Leading professional organization dedicated to advancing the field of substance abuse prevention and promoting excellence among SAPs. ASAP provides certification, continuing education, and networking opportunities for professionals.",
        website: "https://asap.org",
        stats: {
          members: "5,000+",
          established: "1992",
          certifications: "SAP Certification Program",
        },
        featured: true,
      },
      {
        id: randomUUID(),
        name: "The SAP List",
        logo: null,
        description: "Comprehensive directory of qualified Substance Abuse Professionals across the United States. The SAP List helps employers and employees locate certified SAPs for DOT evaluations and return-to-duty processes.",
        website: "https://thesaplist.com",
        stats: {
          members: "3,500+ SAPs",
          established: "2015",
        },
        featured: true,
      },
      {
        id: randomUUID(),
        name: "DOT Compliance Alliance",
        logo: null,
        description: "Coalition of compliance professionals, educators, and industry experts working together to improve DOT safety standards and provide resources for employers and safety professionals.",
        website: "https://dotcompliance.example.org",
        stats: {
          members: "2,000+",
          established: "2010",
        },
        featured: false,
      },
    ];

    organizations.forEach((org) => this.organizations.set(org.id, org));
  }

  // Regulatory Updates
  async getAllUpdates(): Promise<RegulatoryUpdate[]> {
    return Array.from(this.updates.values()).sort(
      (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
    );
  }

  async getUpdateById(id: string): Promise<RegulatoryUpdate | undefined> {
    return this.updates.get(id);
  }

  async getFeaturedUpdate(): Promise<RegulatoryUpdate | undefined> {
    return Array.from(this.updates.values()).find((update) => update.featured);
  }

  async createUpdate(insertUpdate: InsertRegulatoryUpdate): Promise<RegulatoryUpdate> {
    const id = randomUUID();
    const update: RegulatoryUpdate = {
      id,
      ...insertUpdate,
      featured: false,
    };
    this.updates.set(id, update);
    return update;
  }

  // Providers
  async getAllProviders(): Promise<Provider[]> {
    return Array.from(this.providers.values()).sort((a, b) => b.rating - a.rating);
  }

  async getProviderById(id: string): Promise<Provider | undefined> {
    return this.providers.get(id);
  }

  async getTopProviders(limit: number): Promise<Provider[]> {
    return Array.from(this.providers.values())
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  async createProvider(insertProvider: InsertProvider): Promise<Provider> {
    const id = randomUUID();
    const provider: Provider = {
      id,
      ...insertProvider,
      reviewCount: 0,
    };
    this.providers.set(id, provider);
    return provider;
  }

  async updateProvider(id: string, updates: Partial<Provider>): Promise<Provider | undefined> {
    const provider = this.providers.get(id);
    if (!provider) return undefined;

    const updated = { ...provider, ...updates };
    this.providers.set(id, updated);
    return updated;
  }

  // Reviews
  async getReviewsByProviderId(providerId: string): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter((review) => review.providerId === providerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      id,
      ...insertReview,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);

    // Update provider rating and review count
    const provider = this.providers.get(insertReview.providerId);
    if (provider) {
      const providerReviews = await this.getReviewsByProviderId(insertReview.providerId);
      const avgRating = Math.round(
        providerReviews.reduce((sum, r) => sum + r.rating, 0) / providerReviews.length
      );
      await this.updateProvider(insertReview.providerId, {
        rating: avgRating,
        reviewCount: providerReviews.length,
      });
    }

    return review;
  }

  // Resources
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getResourceById(id: string): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = randomUUID();
    const resource: Resource = {
      id,
      ...insertResource,
      createdAt: new Date(),
    };
    this.resources.set(id, resource);
    return resource;
  }

  // Organizations
  async getAllOrganizations(): Promise<Organization[]> {
    return Array.from(this.organizations.values()).sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }

  async getOrganizationById(id: string): Promise<Organization | undefined> {
    return this.organizations.get(id);
  }

  async createOrganization(insertOrganization: InsertOrganization): Promise<Organization> {
    const id = randomUUID();
    const organization: Organization = {
      id,
      ...insertOrganization,
      featured: false,
    };
    this.organizations.set(id, organization);
    return organization;
  }
}

export const storage = new MemStorage();
