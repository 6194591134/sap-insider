import { db, pool } from "./db";
import { regulatoryUpdates } from "@shared/schema";

const officialSources = (content: string, urls: string[]) =>
  `${content}\n\nOfficial sources: ${urls.join(" | ")}`;

const updates = [
  {
    title: "FDA Finalizes 510(k) Exemptions for Certain Toxicology Test Systems",
    content: officialSources(
      "On October 6, 2026, FDA issued a final order exempting certain Class II clinical toxicology test systems from premarket notification (510(k)) requirements, subject to the limitations in the order. The action followed a May 2026 public-comment period and is effective immediately. It changes FDA device requirements for the identified test systems; it does not itself amend DOT 49 CFR Part 40 or approve every device or testing workflow.",
      ["https://www.govinfo.gov/content/pkg/FR-2026-10-06/pdf/2026-20448.pdf"],
    ),
    agency: "DOT",
    category: "Laboratory Standards",
    summary:
      "FDA's October 6 final order exempts certain clinical toxicology test systems from 510(k) requirements, subject to limitations. It does not amend DOT Part 40.",
    plainLanguageSummary:
      "Some specified drug-testing devices no longer need a 510(k) submission. The FDA order has limits and does not automatically change DOT testing rules.",
    publishedDate: new Date("2026-10-06T00:00:00Z"),
    featured: true,
  },
  {
    title: "DOT Seeks Comment on Petition About Invalid Specimen Determinations",
    content: officialSources(
      "DOT's October 2, 2026 notice asks for comments on a petition to change 49 CFR Part 40 procedures for certain abnormal specimen-validity findings, including abnormal pH. The petition proposes documentation windows and written MRO determinations, among other changes. DOT is asking whether to grant the petition; this notice is not a final rule and does not create the proposed requirements. The comment deadline was November 2, 2026, and has passed.",
      ["https://www.govinfo.gov/content/pkg/FR-2026-10-01/pdf/2026-20169.pdf"],
    ),
    agency: "DOT",
    category: "Rulemaking",
    summary:
      "DOT requested comment on a petition proposing changes to medical review of abnormal specimen-validity results. The November 2 deadline has passed; the petition is not a final rule.",
    plainLanguageSummary:
      "DOT asked for feedback on a proposed change, but has not made it a rule. The public-comment period ended November 2.",
    publishedDate: new Date("2026-10-02T00:00:00Z"),
    featured: false,
  },
  {
    title: "HHS Publishes Its September List of Certified Drug-Testing Facilities",
    content: officialSources(
      "HHS published an updated list of certified laboratories and instrumented initial testing facilities on September 30, 2026. The notice lists facilities approved for urine and oral-fluid testing under the applicable HHS guidelines. Certification is specimen- and facility-specific, so employers and service agents should check the current HHS list rather than rely on older summaries when selecting a laboratory.",
      ["https://www.govinfo.gov/content/pkg/FR-2026-09-30/pdf/2026-20004.pdf"],
    ),
    agency: "DOT",
    category: "Laboratory Standards",
    summary:
      "HHS's September 30 notice updates the certified-facility lists for urine and oral-fluid testing. Confirm a laboratory's current certification and specimen type directly.",
    plainLanguageSummary:
      "HHS updates its approved lab list. Check the latest list to make sure a lab is certified for the kind of test being ordered.",
    publishedDate: new Date("2026-09-30T00:00:00Z"),
    featured: false,
  },
  {
    title: "FMCSA Seeks Renewal of the Clearinghouse Information Collection",
    content: officialSources(
      "FMCSA's August 4, 2026 notice sought comments on renewing its information-collection request for the Drug and Alcohol Clearinghouse. The notice describes existing query and reporting duties; it is a Paperwork Reduction Act review, not a new Clearinghouse rule. The comment deadline was September 3, 2026, and has passed. The notice summarizes existing timelines, including employer reporting generally within three business days, MRO reporting within two business days, and SAP entry of required return-to-duty information by the close of the next business day.",
      ["https://www.govinfo.gov/content/pkg/FR-2026-08-04/pdf/2026-15760.pdf"],
    ),
    agency: "FMCSA",
    category: "Clearinghouse",
    summary:
      "FMCSA's notice concerned renewal of the Clearinghouse information collection, not a new rule. Its September 3 comment deadline has passed; existing reporting timelines remain important.",
    plainLanguageSummary:
      "FMCSA asked whether to renew the paperwork review for its database. The notice did not create new reporting duties.",
    publishedDate: new Date("2026-08-04T00:00:00Z"),
    featured: false,
  },
  {
    title: "Revised Federal Drug Testing Custody and Control Form Now Available",
    content: officialSources(
      "HHS and DOT announced the revised 2026 Federal Custody and Control Form (CCF). Its effective date is April 27, 2026, and it may be used in paper or electronic form. DOT permits use of the 2023 CCF through May 30, 2027. If the 2023 form is used on or after May 31, 2027, the collector must complete a memorandum for the record under 49 CFR 40.205(b)(2). DOT also says collectors do not need to enter the drug panel in Step 1F because the laboratory uses the account number.",
      ["https://www.transportation.gov/odapc/Revised_CCF_2026_Notice"],
    ),
    agency: "DOT",
    category: "Testing Forms",
    summary:
      "The revised 2026 CCF is effective and may be used now. The 2023 form remains allowed through May 30, 2027; a memorandum is required if it is used after that.",
    plainLanguageSummary:
      "You can use the new form now. The old form has a transition period, but using it starting May 31, 2027 requires an extra memo.",
    publishedDate: new Date("2026-07-02T00:00:00Z"),
    featured: false,
  },
  {
    title: "DOT Updates Urine Collection Procedures Guidance",
    content: officialSources(
      "ODAPC posted a complete revision of its Urine Specimen Collection Procedures Guidelines in June 2026. DOT says this version replaces previous versions of the guidance. The document explains collection procedures and common problems, but expressly says it does not add to or change the legal requirements in 49 CFR Part 40. Collectors and service agents should use the current version and consult Part 40 for binding requirements.",
      ["https://www.transportation.gov/odapc/collectors"],
    ),
    agency: "DOT",
    category: "Collector Guidance",
    summary:
      "ODAPC's June 2026 urine-collection guide replaces earlier guidance, while clarifying that it does not add to or modify Part 40's legal requirements.",
    plainLanguageSummary:
      "Collectors should use the new guide, but the regulation itself remains the source for binding requirements.",
    publishedDate: new Date("2026-06-30T00:00:00Z"),
    featured: false,
  },
  {
    title: "ODAPC Clarifies MRO Review of State Medical-Marijuana Claims",
    content: officialSources(
      "In a May 15, 2026 Part 40 Q&A, DOT said an MRO may not verify a laboratory-confirmed marijuana positive as negative because an employee says the marijuana came from a state-licensed medical program. A state medical-marijuana card, recommendation, or dispensary record does not by itself meet Part 40's standard for a legitimate medical explanation. The Q&A is official DOT guidance and interpretation; it does not create a new rule.",
      ["https://www.transportation.gov/odapc/part40QA/40-141"],
    ),
    agency: "DOT",
    category: "MRO Guidance",
    summary:
      "DOT's May 15 Q&A says state medical-marijuana documentation does not let an MRO verify a confirmed marijuana positive as negative under Part 40.",
    plainLanguageSummary:
      "A state medical-marijuana card does not change how a DOT MRO must handle a confirmed positive result.",
    publishedDate: new Date("2026-05-15T00:00:00Z"),
    featured: false,
  },
  {
    title: "DOT Finalizes Interim Procedure for Unavailable Oral-Fluid Testing",
    content: officialSources(
      "DOT published a final rule on May 11, 2026, effective June 10, 2026. It requires a directly observed urine collection in situations where an oral-fluid test is required but oral-fluid testing is not available. The rule also updates terminology in Part 40. This is a limited fallback procedure; it is not a general announcement that oral-fluid testing is available at every collection site.",
      ["https://www.govinfo.gov/content/pkg/FR-2026-05-11/pdf/2026-09290.pdf"],
    ),
    agency: "DOT",
    category: "Testing Procedures",
    summary:
      "Effective June 10, DOT's final rule requires directly observed urine collection when an oral-fluid test is required but unavailable.",
    plainLanguageSummary:
      "If a required saliva test cannot be done, the rule provides a directly observed urine-collection procedure instead.",
    publishedDate: new Date("2026-05-11T00:00:00Z"),
    featured: false,
  },
  {
    title: "DOT Reminds SAPs and Employers About Return-to-Duty Duties",
    content: officialSources(
      "A March 4, 2026 Federal Register notification reminds DOT-qualified Substance Abuse Professionals to follow the return-to-duty procedures in 49 CFR Part 40 and reminds employers of SAP responsibilities and the return-to-duty process. DOT describes it as a response to issues it had recently identified. The notice is a procedural reminder, not a change to SAP qualification or continuing-education requirements.",
      ["https://www.govinfo.gov/content/pkg/FR-2026-03-04/pdf/2026-04337.pdf"],
    ),
    agency: "DOT",
    category: "SAP Guidelines",
    summary:
      "DOT's March notification reinforces existing SAP and employer responsibilities in the return-to-duty process; it does not announce new qualification rules.",
    plainLanguageSummary:
      "DOT is reminding SAPs and employers to follow the return-to-duty steps already in Part 40.",
    publishedDate: new Date("2026-03-04T00:00:00Z"),
    featured: false,
  },
  {
    title: "DOT Publishes 2026 Random Testing Rates by Agency",
    content: officialSources(
      "DOT's 2026 rate table lists these annual minimum random testing rates: FMCSA, 50% drugs and 10% alcohol; FAA, 25% drugs and 10% alcohol; FRA, 25% drugs and 10% alcohol for covered service and maintenance-of-way employees, and 50% drugs and 10% alcohol for mechanical employees; FTA, 50% drugs and 10% alcohol; PHMSA, 50% drugs, with alcohol listed as not applicable. The DOT page says FMCSA's rates did not change for 2026. USCG-covered employees may be combined with DOT-covered employees in drug-testing pools, subject to applicable rules. Confirm the rate for the specific operating administration and employee group.",
      ["https://www.transportation.gov/odapc/random-testing-rates"],
    ),
    agency: "DOT",
    category: "Testing Rates",
    summary:
      "The official 2026 table shows different minimum random rates by DOT agency and, for FRA, by employee group. Verify the rate that applies to your program.",
    plainLanguageSummary:
      "There is no single random-testing rate for every transportation worker. The required rate depends on the agency and sometimes the job group.",
    publishedDate: new Date("2026-01-15T00:00:00Z"),
    featured: false,
  },
  {
    title: "FRA Sets 2026 Random Testing Rates by Railroad Employee Group",
    content: officialSources(
      "FRA's 2026 determination sets a 25% minimum annual random drug-testing rate and 10% alcohol-testing rate for covered service employees, and the same rates for maintenance-of-way employees. For covered mechanical employees, the minimum is 50% for drugs and 10% for alcohol. Rail employers should apply the rate for the employee group covered by the applicable FRA rule rather than using one rate for all railroad positions.",
      ["https://www.govinfo.gov/content/pkg/FR-2026-01-08/pdf/2026-00167.pdf"],
    ),
    agency: "FRA",
    category: "Testing Rates",
    summary:
      "FRA's 2026 rates vary by group: 25% drug and 10% alcohol for covered service and maintenance-of-way employees; 50% drug and 10% alcohol for mechanical employees.",
    plainLanguageSummary:
      "Railroads need to check the employee group: the drug-testing minimum is 50% for mechanical employees and 25% for the other listed groups.",
    publishedDate: new Date("2026-01-08T00:00:00Z"),
    featured: false,
  },
  {
    title: "DOT's Fentanyl Panel Change Remains a Proposal, Not a Final Rule",
    content: officialSources(
      "Correction to earlier coverage: DOT's September 2, 2025 Federal Register notice proposed adding fentanyl and norfentanyl to DOT drug-testing panels. The comment period ended October 17, 2025. As of November 4, 2026, DOT's Part 40 Federal Register index still lists this action as a notice of proposed rulemaking, not a final rule. The earlier claim that a final DOT fentanyl-panel rule took effect August 14, 2026 was unsupported and should not be relied on. Employers should check for a later final rule before changing their testing panels.",
      [
        "https://www.transportation.gov/odapc/frpubs",
        "https://www.govinfo.gov/content/pkg/FR-2025-09-02/pdf/2025-16720.pdf",
      ],
    ),
    agency: "DOT",
    category: "Rulemaking Status",
    summary:
      "DOT's fentanyl-panel action is listed as a 2025 proposal, not a final rule. The previously shown August 14, 2026 effective date was unsupported.",
    plainLanguageSummary:
      "The earlier story saying DOT fentanyl testing became mandatory in August was wrong. DOT's official index lists a proposal, not a final rule.",
    publishedDate: new Date("2025-09-02T00:00:00Z"),
    featured: false,
  },
];

async function updateArticles() {
  console.log(`Replacing regulatory updates with ${updates.length} source-checked items...`);

  await db.transaction(async (tx) => {
    await tx.delete(regulatoryUpdates);
    await tx.insert(regulatoryUpdates).values(updates);
  });

  console.log("Regulatory updates replaced successfully.");
}

updateArticles()
  .catch((error) => {
    console.error("Error updating regulatory updates:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
