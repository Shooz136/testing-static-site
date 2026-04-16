import { getCollection } from "astro:content";

export const sponsorTypeOrder = [
  "sponsors_donors",
  "rescue_and_shelter_partners",
  "veterinary_partners",
] as const;

export const sponsorTypeLabels = {
  sponsors_donors: "Sponsors & Donors",
  rescue_and_shelter_partners: "Rescue And Shelter Partners",
  veterinary_partners: "Veterinary Partners",
} as const;

export type SponsorType = keyof typeof sponsorTypeLabels;

export const sortSponsors = (a, b) => {
  const typeDiff =
    sponsorTypeOrder.indexOf(a.data.type) - sponsorTypeOrder.indexOf(b.data.type);

  if (typeDiff !== 0) {
    return typeDiff;
  }

  if (a.data.sortOrder !== b.data.sortOrder) {
    return a.data.sortOrder - b.data.sortOrder;
  }

  return a.data.name.localeCompare(b.data.name);
};

export const getPublishedSponsors = async () => {
  const sponsors = await getCollection("sponsors", ({ data }) => !data.draft);
  return sponsors.sort(sortSponsors);
};

export const groupSponsorsByType = (sponsors) =>
  sponsorTypeOrder
    .map((type) => ({
      type,
      label: sponsorTypeLabels[type],
      sponsors: sponsors.filter((sponsor) => sponsor.data.type === type),
    }))
    .filter((group) => group.sponsors.length > 0);
