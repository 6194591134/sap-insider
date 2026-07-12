import { db } from "./db";
import { regulatoryUpdates } from "@shared/schema";

async function updateArticles() {
  console.log("Replacing regulatory updates with current 2026 content...");

  await db.delete(regulatoryUpdates);

  await db.insert(regulatoryUpdates).values([
    {
      title: "DOT Fentanyl Testing Final Rule Published: Effective August 2026",
      content: "The Department of Transportation published the final rule adding fentanyl and norfentanyl to federal workplace drug testing panels on March 4, 2026 in the Federal Register (Docket DOT-OST-2025-0013). The rule amends 49 CFR Part 40 and applies to all DOT operating administrations: FMCSA, FAA, FTA, FRA, PHMSA, and USCG. The compliance date is August 14, 2026, giving employers, collectors, MROs, and laboratories approximately five months to update their programs. The final rule also raises the morphine cutoff threshold from 2,000 ng/mL to 4,000 ng/mL to reduce false positives from legitimate poppy seed consumption, and removes the requirement for Medical Review Officers to seek clinical evidence of illegal opioid use when verifying codeine and morphine positives. Testing costs are expected to rise 10–15% per specimen. SAPs should prepare for an uptick in fentanyl-related violations in the second half of 2026 and ensure they are familiar with treatment resources specific to synthetic opioid use disorder.",
      agency: "DOT",
      category: "Testing Protocols",
      summary: "DOT's final rule adding fentanyl and norfentanyl to all federal drug testing panels takes effect August 14, 2026. All six DOT agencies are covered. Testing costs will rise roughly 10–15%.",
      plainLanguageSummary: "Starting August 2026, drug tests for all transportation workers will include fentanyl screening. This change covers truck drivers, pilots, transit workers, railroad workers, pipeline workers, and maritime personnel.",
      publishedDate: new Date("2026-03-04"),
      featured: true,
    },
    {
      title: "FMCSA Announces 50% Random Drug Testing Rate for 2026",
      content: "The Federal Motor Carrier Safety Administration published the 2026 random drug testing rate in the Federal Register on December 19, 2025, increasing the minimum rate from 25% to 50% for commercial motor vehicle drivers subject to 49 CFR Part 382. The increase was triggered after the 2024 FMCSA industry-wide positive rate reached 1.62%, surpassing the 1% threshold that mandates a higher random rate. This is the first time FMCSA has required a 50% drug testing rate since 2019. The alcohol testing minimum rate remains at 10%. Employers must ensure their drug and alcohol testing consortia have adjusted random selection pools to reflect the higher rate, and should budget for the additional testing volume. The rate will remain at 50% until two consecutive calendar years of data show industry positivity below 1%.",
      agency: "FMCSA",
      category: "Testing Rates",
      summary: "FMCSA raises the random drug testing rate to 50% for CMV drivers in 2026 after the 2024 positive rate exceeded the 1% trigger threshold — the first 50% rate requirement since 2019.",
      plainLanguageSummary: "Truck drivers now have a 50% chance of being randomly drug tested each year. The higher rate was triggered because too many drivers were testing positive in 2024.",
      publishedDate: new Date("2025-12-19"),
      featured: false,
    },
    {
      title: "Oral Fluid Drug Testing Now Available: Two HHS-Certified Labs Operational",
      content: "The Department of Health and Human Services formally certified a second laboratory for oral fluid (saliva) specimen analysis in May 2026, clearing the path for widespread employer adoption of oral fluid drug testing under DOT regulations. 49 CFR Part 40 requires at least two HHS-certified labs before employers may routinely use oral fluid collection as an alternative to urine testing. Employers wishing to adopt oral fluid testing must update their written drug and alcohol testing policies, ensure collectors are trained in the oral fluid collection procedure using an Alere/Abbott or equivalent approved device, and coordinate with their MRO on laboratory routing. Oral fluid collection is fully observed, eliminating privacy concerns and reducing substitution attempts. The detection window is shorter than urine — typically 24–48 hours for most substances — which may influence which specimen type employers prefer for different testing categories such as post-accident versus pre-employment.",
      agency: "DOT",
      category: "Testing Protocols",
      summary: "With a second HHS-certified oral fluid lab now operational as of May 2026, employers may begin adopting saliva-based drug testing as a DOT-compliant alternative to urine testing.",
      plainLanguageSummary: "Employers can now offer saliva drug tests instead of urine tests for DOT compliance. The saliva test is observed, which prevents cheating, but only detects recent drug use.",
      publishedDate: new Date("2026-05-12"),
      featured: false,
    },
    {
      title: "FMCSA Clearinghouse: Over 200,000 Drug and Alcohol Violations Recorded",
      content: "The FMCSA Drug and Alcohol Clearinghouse surpassed 200,000 total violation records in June 2026, reflecting the database's expanding role as the central enforcement tool for commercial driver drug and alcohol compliance. Since the Clearinghouse II rule took effect in November 2024 requiring automatic CDL downgrade for drivers in prohibited status, states have processed more than 38,000 CDL downgrade actions. FMCSA reports that approximately 74% of drivers who enter prohibited status ultimately complete the full return-to-duty process with a Substance Abuse Professional. The remaining 26% either leave the industry or are not accounted for. FMCSA has also noted an increase in SAP-related complaints from drivers claiming difficulty locating qualified SAPs in rural states, prompting ODAPC to issue guidance encouraging SAPs to confirm their telehealth availability in the FMCSA SAP registry.",
      agency: "FMCSA",
      category: "Clearinghouse",
      summary: "FMCSA Clearinghouse has surpassed 200,000 violation records and 38,000 CDL downgrade actions. ODAPC urges SAPs to confirm telehealth availability in the SAP registry to address rural access gaps.",
      plainLanguageSummary: "The FMCSA database now tracks over 200,000 driver drug violations. States have taken away CDL privileges from 38,000 drivers in prohibited status. SAPs should update their telehealth availability to help drivers in rural areas.",
      publishedDate: new Date("2026-06-15"),
      featured: false,
    },
    {
      title: "ODAPC Issues SAP Qualification and Continuing Education Reminder for 2026",
      content: "The Office of Drug and Alcohol Policy and Compliance (ODAPC) issued a compliance reminder in April 2026 emphasizing that SAPs must complete 12 hours of continuing education every three years under 49 CFR 40.281(b), and that at least a portion of those hours must address current DOT regulatory changes. ODAPC specifically called out three areas SAPs must understand heading into the second half of 2026: the fentanyl testing panel addition effective August 14, 2026; the availability of oral fluid testing as a DOT-authorized collection method; and updated documentation expectations under heightened employer audit activity. ODAPC also reminded SAPs that their SAP reports must be written to communicate findings to a layperson employer and must comply with the content requirements in 49 CFR 40.311. SAPs who perform evaluations outside the scope of their professional license or in states where they are not credentialed may face referral to the applicable licensing board.",
      agency: "DOT",
      category: "SAP Guidelines",
      summary: "ODAPC's April 2026 reminder highlights three areas SAPs must be current on: the fentanyl panel, oral fluid testing, and documentation standards. 12-hour continuing education requirement every three years remains in effect.",
      plainLanguageSummary: "SAPs are being reminded to stay current on three big rule changes this year — fentanyl testing, saliva testing, and stricter paperwork requirements — and to make sure their continuing education is up to date.",
      publishedDate: new Date("2026-04-22"),
      featured: false,
    },
    {
      title: "FAA 2026 Random Testing Rates Unchanged; Advisory Circular Updated",
      content: "The Federal Aviation Administration published the 2026 random drug and alcohol testing rates in the Federal Register on December 5, 2025. The minimum random drug testing rate remains at 25% and the minimum random alcohol testing rate remains at 10% for covered aviation employees in safety-sensitive positions under 14 CFR Part 120. The 2024 aviation industry positivity rate was 0.81% for drugs and 0.13% for alcohol — well below the thresholds that would trigger a rate increase. Separately, the FAA released updated Advisory Circular AC 120-126B in March 2026, which incorporates guidance on oral fluid testing, fentanyl panel preparation, and revised procedures for testing at remote maintenance facilities and foreign repair stations. The foreign repair station drug and alcohol testing rule, which took effect in January 2025, has a compliance deadline of December 2027 for the approximately 977 affected facilities in 65+ countries.",
      agency: "FAA",
      category: "Testing Rates",
      summary: "FAA holds 2026 random testing rates at 25% drugs and 10% alcohol. Updated Advisory Circular AC 120-126B issued March 2026 covers oral fluid testing and fentanyl panel preparation.",
      plainLanguageSummary: "Aviation workers' drug test rates stay the same for 2026. The FAA also updated its guidance booklet to cover new testing methods like saliva tests and fentanyl screening.",
      publishedDate: new Date("2026-03-18"),
      featured: false,
    },
    {
      title: "FTA Drug and Alcohol Conference Recap: Key Takeaways from Portland",
      content: "The Federal Transit Administration's 19th Annual Drug and Alcohol Program National Conference was held April 14–16, 2026, in Portland, Oregon, drawing over 1,200 compliance officers, program managers, and transit agency staff. Key themes from the three-day conference included implementation timelines for the DOT fentanyl testing final rule, strategies for transitioning to oral fluid specimen collection, FMCSA Clearinghouse enforcement trends, and best practices for managing SAP referrals across multi-state transit systems. FTA officials confirmed that the random drug testing rate for transit workers remains at 50% through at least 2027 under 49 CFR Part 655, as 2024 and 2025 industry positivity data have not dropped below the 1% threshold required to trigger a reduction. FTA also previewed upcoming online training modules available through the FTA Drug and Alcohol Program website for transit employee supervisors.",
      agency: "FTA",
      category: "Industry Event",
      summary: "FTA's Portland conference drew 1,200+ attendees. Key topics: fentanyl rule rollout, oral fluid transition, and Clearinghouse enforcement. Transit random testing rate remains 50% through at least 2027.",
      plainLanguageSummary: "The big transit drug testing conference was held in April. Transit workers' 50% random testing rate won't drop anytime soon, and agencies were walked through the upcoming fentanyl and saliva testing changes.",
      publishedDate: new Date("2026-04-17"),
      featured: false,
    },
    {
      title: "FRA Part 219 Revised: New Post-Accident Toxicological Testing Thresholds",
      content: "The Federal Railroad Administration published a final rule amending 49 CFR Part 219 in February 2026, revising post-accident toxicological testing thresholds and clarifying reasonable suspicion procedures for railroad employers. The rule updates the accident severity criteria that trigger mandatory post-accident testing, aligning them with updated National Transportation Safety Board recommendations. Under the revised thresholds, FRA-regulated railroads must conduct toxicological testing after any reportable accident involving a fatality, an injury requiring medical treatment beyond first aid, or equipment damage exceeding $25,000 (increased from $10,000). The rule also adds explicit supervisor training requirements for reasonable suspicion determinations, requiring a minimum of 120 minutes of training covering signs and symptoms of drug and alcohol impairment. The fentanyl testing panel addition effective August 2026 will automatically apply to all FRA Part 219 testing.",
      agency: "FRA",
      category: "Testing Protocols",
      summary: "FRA's Part 219 final rule revises post-accident testing thresholds, raises the equipment damage trigger to $25,000, and adds 120-minute supervisor reasonable suspicion training requirements.",
      plainLanguageSummary: "The railroad safety rules were updated this year. Railroads now must drug test after accidents with more serious damage, and supervisors need more training to recognize drug and alcohol impairment.",
      publishedDate: new Date("2026-02-10"),
      featured: false,
    },
    {
      title: "PHMSA 50% Random Drug Testing Rate Confirmed for Second Consecutive Year",
      content: "The Pipeline and Hazardous Materials Safety Administration confirmed that the minimum random drug testing rate for pipeline operators remains at 50% for 2026, marking the second consecutive year at the elevated rate. PHMSA raised the rate from 25% to 50% for 2025 after the 2023 positivity rate in the pipeline sector exceeded the 1.0% statutory trigger. For 2026, the 2024 pipeline industry positivity rate was reported at 1.23% — still above the threshold — keeping the elevated rate in effect. The alcohol random testing minimum remains at 10%. Pipeline operators covered under 49 CFR Part 199 should continue to maintain their expanded testing pools and budgets. PHMSA noted that fentanyl panel additions under the DOT final rule will apply to all Part 199-regulated testing effective August 14, 2026.",
      agency: "PHMSA",
      category: "Testing Rates",
      summary: "PHMSA confirms 50% random drug testing rate continues for pipeline workers in 2026 after the 2024 positivity rate held above 1%. Fentanyl panel addition applies in August.",
      plainLanguageSummary: "Pipeline workers will be randomly drug tested at the same high 50% rate for a second year in a row, because too many were still testing positive. Fentanyl testing starts in August.",
      publishedDate: new Date("2026-01-06"),
      featured: false,
    },
    {
      title: "USCG Circular Addresses Fentanyl Testing and Oral Fluid for Maritime Employers",
      content: "The United States Coast Guard issued Marine Safety Information Circular MSIC 2026-04 in June 2026, providing maritime employers with guidance on upcoming changes to drug testing under DOT Part 40 and the Coast Guard's own regulations at 46 CFR Parts 4 and 16. The circular confirms that the August 14, 2026 fentanyl testing effective date applies to USCG-regulated marine employers and credentialed mariners. Maritime employers operating ferryboats under FTA funding who rely on the concurrent compliance provision must verify that their testing service agent is prepared for fentanyl panel collection. On oral fluid testing, the circular notes that maritime employers may adopt oral fluid collection in settings where urine collection is logistically difficult, such as vessels at sea, provided a trained collector and an HHS-approved collection device are available. USCG also reminded employers of the upcoming biennial renewal cycle for marine employer drug testing plans.",
      agency: "USCG",
      category: "Testing Protocols",
      summary: "USCG Marine Safety Circular MSIC 2026-04 confirms August fentanyl testing applies to maritime employers and provides guidance on oral fluid adoption for vessels at sea.",
      plainLanguageSummary: "The Coast Guard told shipping companies to prepare for fentanyl drug testing starting August 2026, and said saliva testing can be used on ships where urine collection is difficult.",
      publishedDate: new Date("2026-06-03"),
      featured: false,
    },
    {
      title: "Telehealth SAP Evaluations: ODAPC Clarifies Cross-State Licensing Rules",
      content: "ODAPC published updated frequently asked questions in March 2026 clarifying when a Substance Abuse Professional may conduct telehealth evaluations across state lines. Under 49 CFR 40.281 and Section 40.287(f), a SAP must comply with all applicable licensure requirements of the jurisdiction in which the employee is physically located at the time of the evaluation — not merely where the SAP holds a license. ODAPC clarified that if a SAP is licensed as a Licensed Professional Counselor (LPC) in Texas but the employee is located in New Mexico at the time of the telehealth session, the SAP must confirm they are credentialed or authorized to practice in New Mexico. ODAPC encouraged SAPs who wish to expand their telehealth practice into additional states to consult with their professional licensing boards about reciprocity, temporary practice permits, or counseling compact membership. SAPs should document the licensure verification step in their case files.",
      agency: "DOT",
      category: "SAP Guidelines",
      summary: "ODAPC's March 2026 FAQ clarifies that SAPs conducting telehealth evaluations must be licensed in the state where the employee is physically located, not just where the SAP holds a primary license.",
      plainLanguageSummary: "If a SAP does a video call evaluation, they must be licensed in whatever state the employee is sitting in — not just their home state. SAPs who want to work in more states should check with their licensing board.",
      publishedDate: new Date("2026-03-27"),
      featured: false,
    },
    {
      title: "DOT Seeks Comment on SAP Continuing Education Modernization Proposal",
      content: "The Department of Transportation published an Advance Notice of Proposed Rulemaking (ANPRM) on May 28, 2026, seeking public comment on potential changes to SAP qualification and continuing education requirements under 49 CFR Part 40, Subpart O. DOT is considering whether to increase the required continuing education hours from 12 to 16 per three-year cycle, require at least 4 of those hours to specifically cover DOT regulatory updates, and establish a centralized DOT SAP registry independent of employer-maintained lists. The agency is also exploring whether to require SAPs to demonstrate competency in oral fluid testing evaluation standards and synthetic opioid (fentanyl) use disorder assessment as a prerequisite for renewal. Comments are due August 15, 2026. SAPs, employer associations, and SAP training providers are encouraged to submit comments through the federal rulemaking portal at regulations.gov.",
      agency: "DOT",
      category: "SAP Guidelines",
      summary: "DOT's May 2026 ANPRM proposes raising SAP continuing education hours to 16 per cycle, adding mandatory DOT regulatory content, and creating a centralized SAP registry. Comments due August 15.",
      plainLanguageSummary: "The DOT is thinking about requiring SAPs to do more continuing education — 16 hours instead of 12 — and wants SAPs to specifically study new fentanyl and saliva testing rules. Public comments are due August 15.",
      publishedDate: new Date("2026-05-28"),
      featured: false,
    },
  ]);

  console.log("Regulatory updates replaced successfully!");
}

updateArticles()
  .catch((error) => {
    console.error("Error updating articles:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
