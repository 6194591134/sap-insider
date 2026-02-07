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

  const existingUpdates = await db.select().from(regulatoryUpdates).limit(1);
  if (existingUpdates.length > 0) {
    console.log("Database already seeded. Skipping.");
    return;
  }

  const [update1] = await db.insert(regulatoryUpdates).values({
    title: "PHMSA Doubles Random Drug Testing Rate to 50% for Pipeline Workers in 2026",
    content: "The Pipeline and Hazardous Materials Safety Administration has increased the minimum random drug testing rate for pipeline operators and hazardous materials carriers from 25% to 50% for calendar year 2026. The rate increase was published in the Federal Register under docket DOT-2025-22326. This significant jump reflects rising positivity rates in the pipeline industry and brings PHMSA testing rates in line with FMCSA and FTA requirements. Pipeline operators must update their random testing programs immediately to comply with the higher rate. The alcohol testing rate remains at 10%. Employers should budget for increased testing costs associated with the higher random rate and ensure their testing consortiums are prepared for the increased volume.",
    agency: "PHMSA",
    category: "Testing Rates",
    summary: "PHMSA doubles the random drug testing rate from 25% to 50% for pipeline workers in 2026, aligning with FMCSA and FTA requirements after rising industry positivity rates.",
    plainLanguageSummary: "Pipeline workers will now be randomly tested for drugs twice as often as before, because more workers in the industry have been testing positive.",
    publishedDate: new Date("2025-12-01"),
    featured: true,
  }).returning();

  await db.insert(regulatoryUpdates).values([
    {
      title: "DOT Proposes Adding Fentanyl to Federal Drug Testing Panel",
      content: "The Department of Transportation published a Notice of Proposed Rulemaking (NPRM) on September 2, 2025 in the Federal Register (docket 2025-16720) to add fentanyl and norfentanyl to DOT drug testing panels for both urine and oral fluid specimens. The proposed rule also increases the morphine cutoff from 2,000 ng/ml to 4,000 ng/ml, and removes the requirement for MROs to find clinical evidence of illegal opioid use for codeine and morphine positives. The comment period closed October 17, 2025. Once finalized, the rule would apply across all DOT operating administrations: FMCSA, FAA, FTA, FRA, PHMSA, and USCG under 49 CFR Part 40. Testing costs are expected to increase 10-15% once implemented. SAPs should prepare for an increase in fentanyl-related violations and be ready to evaluate synthetic opioid use patterns.",
      agency: "DOT",
      category: "Testing Protocols",
      summary: "DOT proposes adding fentanyl and norfentanyl to all federal drug testing panels under 49 CFR Part 40, with implementation expected in 2026. Testing costs may rise 10-15%.",
      plainLanguageSummary: "The government wants to start testing all transportation workers for fentanyl. This change would affect every DOT agency and could make drug tests cost a bit more.",
      publishedDate: new Date("2025-09-02"),
      featured: false,
    },
    {
      title: "CDL Downgrades Now Mandatory for Prohibited Clearinghouse Status",
      content: "Effective November 18, 2024, the FMCSA Clearinghouse II final rule requires states to downgrade Commercial Driver's License (CDL) or commercial learner's permit (CLP) privileges for drivers with a 'prohibited' status. States must verify each driver's Clearinghouse status before issuing or renewing a CDL. Drivers who test positive or refuse a test lose commercial driving privileges until a Substance Abuse Professional confirms completion of all return-to-duty requirements. The RTD process requires SAP evaluation, prescribed treatment or education, a negative return-to-duty test, and at least six unannounced follow-up tests in the first 12 months. This change transforms the Clearinghouse from a reporting tool into a real-time enforcement mechanism tied directly to licensing.",
      agency: "FMCSA",
      category: "Clearinghouse",
      summary: "States must now downgrade CDL privileges for drivers in prohibited Clearinghouse status under the Clearinghouse II final rule. No driver can hold or renew a CDL until the full return-to-duty process is completed.",
      plainLanguageSummary: "If a driver fails a drug or alcohol test, their state will now automatically take away their CDL until they finish the entire return-to-duty process with a SAP.",
      publishedDate: new Date("2025-11-18"),
      featured: false,
    },
    {
      title: "DOT Authorizes Oral Fluid Testing as Alternative to Urine",
      content: "The Department of Transportation has authorized oral fluid (saliva) testing as an alternative to urine-based drug testing under updated 49 CFR Part 40 regulations. The authorization applies across all DOT operating administrations. Widespread implementation is expected throughout 2025-2026 as the Department of Health and Human Services (HHS) certifies additional laboratories for oral fluid analysis. At least two HHS-certified labs must be operational before employers can broadly adopt oral fluid testing. The method offers advantages including observed collection without privacy concerns, resistance to adulteration, and a shorter detection window that better captures recent substance use. The pending fentanyl NPRM may also affect oral fluid testing rollout timelines.",
      agency: "DOT",
      category: "Testing Protocols",
      summary: "Oral fluid testing is now DOT-authorized across all agencies as an alternative to urine testing. Widespread rollout awaits HHS lab certifications expected in late 2025 to 2026.",
      plainLanguageSummary: "Transportation workers may soon be able to take a saliva test instead of a urine test for drug screening. Labs are still getting set up, so it will roll out gradually.",
      publishedDate: new Date("2025-06-15"),
      featured: false,
    },
    {
      title: "FAA Publishes 2026 Random Drug and Alcohol Testing Rates",
      content: "The Federal Aviation Administration published the 2026 random drug and alcohol testing rates in the Federal Register on December 5, 2025 (docket 2025-22036). The minimum random drug testing rate remains at 25%, and the minimum random alcohol testing rate stays at 10% for covered aviation employees. The 2024 industry-wide violation rates were 0.816% for drugs and 0.131% for alcohol, both well below the thresholds that would trigger an increase. These rates apply to all covered aviation employees in safety-sensitive positions under 14 CFR Part 120. The FAA also released updated Advisory Circular AC 120-126A in April 2025 with revised guidelines for implementing aviation drug and alcohol testing programs.",
      agency: "FAA",
      category: "Testing Rates",
      summary: "FAA 2026 random testing rates hold steady at 25% for drugs and 10% for alcohol, published in the Federal Register December 5, 2025.",
      plainLanguageSummary: "Aviation workers' random drug and alcohol testing rates stay the same for 2026 because the industry's violation rates are low.",
      publishedDate: new Date("2025-12-05"),
      featured: false,
    },
    {
      title: "FAA Requires Drug and Alcohol Testing at Foreign Repair Stations",
      content: "A new FAA rule effective January 17, 2025 requires foreign-certificated repair stations under 14 CFR Part 145 that service U.S. Part 121 air carriers to establish drug and alcohol testing programs. This affects approximately 977 repair stations across 65+ countries. The compliance deadline is December 20, 2027, giving repair stations nearly three years to implement testing programs. Industry groups have filed petitions requesting simplification of the requirements under FAA docket FAA-2025-2498. The rule aligns foreign repair station requirements with domestic standards, ensuring consistent safety oversight across the global aviation maintenance supply chain.",
      agency: "FAA",
      category: "Compliance",
      summary: "Foreign repair stations servicing U.S. airlines must implement drug and alcohol testing programs by December 2027, affecting nearly 1,000 facilities in 65+ countries.",
      plainLanguageSummary: "Foreign aircraft repair shops that work on U.S. airlines now have to start drug and alcohol testing their workers, just like shops in the United States do.",
      publishedDate: new Date("2025-01-17"),
      featured: false,
    },
    {
      title: "FTA Maintains 50% Random Drug Testing Rate Through 2026",
      content: "The Federal Transit Administration confirms that the minimum random drug testing rate for transit employees remains at 50% through 2026. The rate has been at this level since FTA increased it from 25% in 2019 after the 2017 industry positivity rate exceeded the 1.06% threshold. Under 49 CFR Part 655, the rate can only be reduced back to 25% if two consecutive calendar years show industry positivity rates below 1%. The alcohol testing rate remains at 10%. All FTA-funded transit systems must comply, covering pre-employment, random, post-accident, reasonable suspicion, return-to-duty, and follow-up testing. Safety-sensitive functions include bus and rail operators, dispatchers, mechanics, and controllers.",
      agency: "FTA",
      category: "Testing Rates",
      summary: "FTA keeps the random drug testing rate at 50% for transit workers through 2026 under 49 CFR Part 655. Industry positivity rates must drop below 1% for two consecutive years before a reduction.",
      plainLanguageSummary: "Transit workers like bus and rail operators will continue to face a 50% chance of being randomly drug tested each year.",
      publishedDate: new Date("2025-12-10"),
      featured: false,
    },
    {
      title: "FRA Reminds Railroads of Part 219 Drug and Alcohol Testing Obligations",
      content: "The Federal Railroad Administration issued a compliance advisory reinforcing railroad employers' obligations under 49 CFR Part 219 for drug and alcohol testing programs. The advisory emphasizes proper implementation of random testing pools, post-accident testing criteria, and reasonable cause/suspicion testing procedures for covered railroad employees. FRA highlighted that railroads must maintain accurate records of testing results and submit annual reports. The agency also reminded employers that the upcoming fentanyl testing panel addition under Part 40 will apply to all FRA-regulated testing once the final rule is published. Railroad safety-sensitive employees include locomotive engineers, conductors, dispatchers, signal maintainers, and bridge tenders.",
      agency: "FRA",
      category: "Compliance",
      summary: "FRA issues compliance advisory reinforcing Part 219 drug and alcohol testing obligations for railroads, with reminders about upcoming fentanyl panel changes.",
      plainLanguageSummary: "The railroad safety agency reminded train companies to follow drug testing rules carefully and prepare for upcoming fentanyl testing requirements.",
      publishedDate: new Date("2025-10-15"),
      featured: false,
    },
    {
      title: "USCG Updates Drug Testing Guidance for Maritime Personnel",
      content: "The United States Coast Guard has issued updated guidance for marine employers regarding drug and alcohol testing requirements under 46 CFR Parts 4 and 16 and 33 CFR Part 95. The guidance clarifies post-marine-casualty testing procedures, random testing pool management for credentialed mariners, and coordination with DOT Part 40 testing protocols. USCG emphasized that maritime employers operating FTA-funded ferryboat services who comply with Coast Guard testing regulations under 46 CFR Parts 4 and 16 are considered concurrently compliant with FTA requirements under certain conditions. The Coast Guard also noted that upcoming DOT-wide changes, including fentanyl panel additions and oral fluid testing authorization, will apply to maritime testing programs once finalized.",
      agency: "USCG",
      category: "Testing Protocols",
      summary: "USCG updates drug testing guidance for maritime personnel, clarifying post-casualty testing, random pool management, and coordination with DOT Part 40 protocols.",
      plainLanguageSummary: "The Coast Guard updated its drug testing rules for maritime workers, making it clearer when and how tests should happen on ships and boats.",
      publishedDate: new Date("2025-08-20"),
      featured: false,
    },
    {
      title: "DOT SAP Documentation Standards Face Stricter Enforcement in 2026",
      content: "Substance Abuse Professional documentation and reporting standards are under heightened scrutiny in 2026, though the core SAP program requirements under 49 CFR Part 40, Subpart O remain unchanged. ODAPC (Office of Drug and Alcohol Policy and Compliance) has emphasized that SAP reports must meet content and formatting standards, and employers are increasingly being audited for incomplete SAP processes during compliance reviews. SAPs must maintain documentation for five years and provide records on request to DOT representatives, employers, or third-party administrators per Section 40.287(e). Continuing education requirements remain at 12 professional development hours every three years, but must specifically cover current DOT regulatory changes. The fundamental SAP process—initial evaluation, treatment/education, follow-up evaluation, return-to-duty testing, and minimum six unannounced follow-up tests—remains intact.",
      agency: "DOT",
      category: "SAP Guidelines",
      summary: "DOT's ODAPC emphasizes stricter enforcement of SAP documentation standards in 2026, with increased employer audits and mandatory continuing education on current rules.",
      plainLanguageSummary: "SAPs need to keep better records and stay up-to-date on the latest rules. The government is checking more closely to make sure everything is done right.",
      publishedDate: new Date("2026-01-08"),
      featured: false,
    },
    {
      title: "Telehealth SAP Evaluations Remain Fully DOT-Compliant",
      content: "Remote and telehealth SAP evaluations continue to be fully DOT-compliant under 49 CFR Part 40 as confirmed by ODAPC guidance. SAPs may conduct both initial and follow-up evaluations via telehealth platforms. However, SAPs must abide by geographic limitations of their professional license or credential when performing remote evaluations, as specified in Section 40.287(f). A SAP licensed only in one state cannot evaluate employees located in another state unless their license permits cross-state practice. The telehealth option has improved access to SAP services especially in rural areas where qualified SAPs may be scarce, reducing wait times for employees needing to begin the return-to-duty process.",
      agency: "DOT",
      category: "SAP Guidelines",
      summary: "ODAPC confirms telehealth SAP evaluations remain DOT-compliant under Part 40, but SAPs must respect geographic licensing limitations.",
      plainLanguageSummary: "SAPs can still do evaluations by video call, which helps people in rural areas. But the SAP must be licensed in the state where the employee is located.",
      publishedDate: new Date("2025-11-01"),
      featured: false,
    },
    {
      title: "FMCSA Medical Certification Integration System Fully Operational",
      content: "The FMCSA National Registry of Certified Medical Examiners integration system, launched June 23, 2025, requires certified medical examiners to electronically submit exam results to FMCSA by midnight the day after the examination. The system enables real-time verification of driver medical fitness alongside Clearinghouse status checks. States now have automated access to both medical certification and drug testing violation data, streamlining the CDL issuance and renewal process. The temporary waiver that had allowed paper Medical Examiner's Certificates for up to 60 days ended January 10, 2026. This integration represents a significant step in FMCSA's broader effort to digitize commercial driver oversight and improve highway safety.",
      agency: "FMCSA",
      category: "Medical Certification",
      summary: "FMCSA's medical certification integration is fully operational as of June 2025, requiring electronic submission of exam results and ending paper certificate waivers.",
      plainLanguageSummary: "Doctors who do CDL physicals must now submit results electronically by the next day. Paper certificates are no longer accepted.",
      publishedDate: new Date("2026-01-10"),
      featured: false,
    },
    {
      title: "19th Annual FTA Drug and Alcohol Program Conference: April 2026 in Portland",
      content: "The Federal Transit Administration has announced the 19th Annual Drug and Alcohol Program National Conference, scheduled for April 14-16, 2026 in Portland, Oregon. The conference provides transit agencies with comprehensive training on drug and alcohol program management, regulatory updates, and compliance best practices. Expected topics include the fentanyl testing panel implementation timeline, oral fluid testing rollout status, FMCSA Clearinghouse enforcement updates, and SAP process improvements. Registration is free and opens in March 2026. The conference is a key annual gathering for compliance officers, program managers, and safety professionals from transit agencies nationwide.",
      agency: "FTA",
      category: "Industry Event",
      summary: "FTA's 19th annual drug and alcohol conference takes place April 14-16, 2026 in Portland, OR. Free registration covering fentanyl testing, oral fluid rollout, and compliance updates.",
      plainLanguageSummary: "There's a free conference in Portland this April where transit professionals can learn about new drug testing rules and best practices.",
      publishedDate: new Date("2026-01-25"),
      featured: false,
    },
  ]);

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
      title: "SAP Best Practices Guide 2026",
      type: "guide",
      category: "Best Practices",
      description: "Comprehensive guide to SAP best practices including evaluation techniques, documentation requirements, and follow-up protocols.",
      downloadUrl: "/downloads/sap-best-practices-2026.pdf",
      duration: null,
      speaker: null,
      tags: ["SAP", "Best Practices", "2026"],
    },
  ]);

  await db.insert(organizations).values([
    {
      name: "ASAP (Association of SAP Professionals)",
      logo: null,
      description: "Leading professional organization dedicated to advancing the field of substance abuse prevention and promoting excellence among SAPs. ASAP provides certification, continuing education, and networking opportunities for professionals.",
      website: "https://go2asap.com",
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
      website: "https://www.saplist.com",
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
