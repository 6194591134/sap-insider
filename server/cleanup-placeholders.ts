// Removes the sample content the site was first built with. Safe to run on every deploy:
// it only touches the specific placeholder entries and does nothing once they're gone.
import { db, pool } from "./db";
import { providers, reviews, resources, organizations, favorites } from "@shared/schema";
import { eq, inArray, or, like } from "drizzle-orm";

const fakeProviders = ["Compliance Education Network", "SafetyFirst Learning"];
const fakeReviewers = ["Sarah M., SAP", "John D., EAP"];
const fakeResources = [
  "SAP Evaluation Checklist",
  "Return-to-Duty Process Template",
  "Understanding DOT Clearinghouse Requirements",
  "SAP Best Practices Guide 2026",
];

await db.transaction(async (tx) => {
  // Sample reviews, plus any reviews attached to the made-up providers
  const fakeProviderRows = await tx.select({ id: providers.id }).from(providers).where(inArray(providers.name, fakeProviders));
  const fakeIds = fakeProviderRows.map((p) => p.id);
  await tx.delete(reviews).where(
    fakeIds.length ? or(inArray(reviews.reviewerName, fakeReviewers), inArray(reviews.providerId, fakeIds)) : inArray(reviews.reviewerName, fakeReviewers),
  );
  if (fakeIds.length) {
    await tx.delete(favorites).where(inArray(favorites.itemId, fakeIds));
    await tx.delete(providers).where(inArray(providers.id, fakeIds));
  }

  // ReCourse.life: drop the dummy phone number, sample review count and unearned "verified" badge
  await tx.update(providers)
    .set({ contactPhone: null, reviewCount: 0, verified: false })
    .where(eq(providers.name, "ReCourse.life"));

  // Resources pointed at files that don't exist, and one listed a made-up speaker
  await tx.delete(resources).where(inArray(resources.title, fakeResources));

  // Organizations: remove the made-up one, fix ASAP's name, drop unverified member counts and dates
  await tx.delete(organizations).where(eq(organizations.name, "DOT Compliance Alliance"));
  await tx.update(organizations)
    .set({
      name: "American Substance Abuse Professionals (ASAP)",
      description: "Provider of DOT Substance Abuse Professional (SAP) services, including SAP evaluations and referrals, with SAP qualification courses for professionals.",
      stats: null,
    })
    .where(like(organizations.name, "ASAP (Association of SAP Professionals)%"));
  await tx.update(organizations)
    .set({
      stats: null,
      description: "Directory that helps employers and employees find qualified Substance Abuse Professionals for DOT evaluations and the return-to-duty process.",
    })
    .where(eq(organizations.name, "The SAP List"));
});

await pool.end();
console.log("Placeholder content check complete.");
