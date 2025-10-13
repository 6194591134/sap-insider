import { db } from "./db";
import {
  regulatoryUpdates,
  providers,
  reviews,
  resources,
  organizations,
} from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Check if data already exists
  const existingUpdates = await db.select().from(regulatoryUpdates).limit(1);
  if (existingUpdates.length > 0) {
    console.log("Database already seeded. Skipping.");
    return;
  }

  // Sample Regulatory Updates
  const [update1] = await db.insert(regulatoryUpdates).values({
    title: "FMCSA Updates Drug and Alcohol Clearinghouse Query Requirements",
    content: "The Federal Motor Carrier Safety Administration has updated requirements for employers conducting queries in the Drug and Alcohol Clearinghouse...",
    agency: "FMCSA",
    category: "Clearinghouse",
    summary: "New requirements mandate more frequent limited queries and enhanced reporting protocols for safety-sensitive positions.",
    plainLanguageSummary: "Employers must now check the Clearinghouse more often when employees are in safety-sensitive jobs. This helps catch violations faster and keeps roads safer.",
    publishedDate: new Date("2024-01-15"),
    featured: true,
  }).returning();

  await db.insert(regulatoryUpdates).values([
    {
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
      title: "FRA Updates Medical Review Officer Qualification Requirements",
      content: "The Federal Railroad Administration announces updates to MRO qualification standards...",
      agency: "FRA",
      category: "Personnel Standards",
      summary: "Enhanced training and certification requirements for Medical Review Officers ensure accurate test result interpretation.",
      plainLanguageSummary: null,
      publishedDate: new Date("2023-12-15"),
      featured: false,
    },
  ]);

  // Sample Providers
  const [provider1] = await db.insert(providers).values({
    name: "ReCourse.life",
    logo: null,
    rating: 5,
    reviewCount: 2,
    dotCompliant: true,
    nonDotCompliant: true,
    features: ["Online Courses", "SAP Referral Tools", "Automated Reporting", "24/7 Support"],
    languages: ["English", "Spanish"],
    description: "Comprehensive DOT and Non-DOT education courses with seamless SAP integration and real-time reporting capabilities.",
    website: "https://recourse.life",
    contactEmail: "info@recourse.life",
    contactPhone: "(555) 123-4567",
    verified: true,
  }).returning();

  await db.insert(providers).values([
    {
      name: "Compliance Education Network",
      logo: null,
      rating: 4,
      reviewCount: 0,
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
      name: "SafetyFirst Learning",
      logo: null,
      rating: 4,
      reviewCount: 0,
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
  ]);

  // Sample Reviews for ReCourse.life
  await db.insert(reviews).values([
    {
      providerId: provider1.id,
      rating: 5,
      courseQuality: 5,
      reportingTools: 5,
      communication: 4,
      sapSupport: 5,
      comment: "Excellent platform with seamless SAP integration. The automated reporting saves hours of administrative work.",
      reviewerName: "Sarah M., SAP",
    },
    {
      providerId: provider1.id,
      rating: 5,
      courseQuality: 5,
      reportingTools: 5,
      communication: 5,
      sapSupport: 5,
      comment: "Best provider I've worked with. Course quality is outstanding and the referral process is incredibly smooth.",
      reviewerName: "John D., EAP",
    },
  ]);

  // Sample Resources
  await db.insert(resources).values([
    {
      title: "SAP Evaluation Checklist",
      type: "checklist",
      category: "Evaluation",
      description: "Comprehensive checklist for conducting thorough SAP evaluations in compliance with DOT regulations.",
      downloadUrl: "/downloads/sap-evaluation-checklist.pdf",
      duration: null,
      speaker: null,
      tags: ["SAP", "Evaluation", "Compliance"],
    },
    {
      title: "Return-to-Duty Process Template",
      type: "template",
      category: "RTD",
      description: "Step-by-step template for managing the complete return-to-duty process from violation to reinstatement.",
      downloadUrl: "/downloads/rtd-template.docx",
      duration: null,
      speaker: null,
      tags: ["RTD", "Template", "Process"],
    },
    {
      title: "Understanding DOT Clearinghouse Requirements",
      type: "webinar",
      category: "Clearinghouse",
      description: "Expert-led webinar covering all aspects of the Drug and Alcohol Clearinghouse, including query requirements and reporting obligations.",
      downloadUrl: "/webinars/clearinghouse-requirements",
      duration: "45 minutes",
      speaker: "Dr. Jennifer Williams, FMCSA Compliance Expert",
      tags: ["Clearinghouse", "DOT", "Compliance"],
    },
    {
      title: "SAP Best Practices Guide 2024",
      type: "guide",
      category: "Best Practices",
      description: "Comprehensive guide to SAP best practices including evaluation techniques, documentation requirements, and follow-up protocols.",
      downloadUrl: "/downloads/sap-best-practices-2024.pdf",
      duration: null,
      speaker: null,
      tags: ["SAP", "Best Practices", "2024"],
    },
  ]);

  // Sample Organizations
  await db.insert(organizations).values([
    {
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
  ]);

  console.log("Database seeded successfully!");
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
