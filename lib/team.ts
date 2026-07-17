import { sanitizeReviewSlug } from "./reviewFlow";
import { siteConfig } from "./site";

export type TeamMember = {
  name: string;
  title: string;
  shortBio: string;
  longBio?: string;
  specialties?: string[];
  image?: string;
  phone?: string;
  email?: string;
  scheduleUrl?: string;
  /** Optional number of years helping Central Oregon Medicare clients. */
  yearsHelping?: number;
  retired?: boolean;
  reviewable?: boolean;
  active: boolean;
  sortOrder: number;
};

// The Bend site's agent of record is Scott Lewis, a licensed insurance agent
// local to Bend. Do not add fabricated bios — extend this list only with
// verified team information.
export const teamMembers: TeamMember[] = [
  {
    name: "Scott Lewis",
    title: "Licensed Insurance Agent",
    shortBio:
      "Scott Lewis is a licensed insurance agent local to Bend, helping Central Oregon residents understand and compare their Medicare options with no-cost, no-pressure guidance.",
    specialties: [
      "Medicare Advantage",
      "Medicare Supplement (Medigap)",
      "Medicare Part D",
      "Turning 65",
      "Plan Reviews",
    ],
    phone: siteConfig.phone,
    email: siteConfig.email,
    image: "/team/scott-lewis.jpg",
    active: true,
    reviewable: true,
    sortOrder: 1,
  },
];

/** Returns only active members sorted by sortOrder. */
export function getActiveTeamMembers(): TeamMember[] {
  return teamMembers
    .filter((m) => m.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Returns all public team members, including retired members, sorted by sortOrder. */
export function getPublicTeamMembers(): TeamMember[] {
  return [...teamMembers].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getTeamMemberSlug(member: Pick<TeamMember, "name"> | string): string {
  return sanitizeReviewSlug(typeof member === "string" ? member : member.name) ?? "";
}

export function isReviewableTeamMember(member: TeamMember): boolean {
  return member.active && !member.retired && member.reviewable === true;
}

export function getActiveReviewableTeamMembers(): TeamMember[] {
  return getActiveTeamMembers().filter(isReviewableTeamMember);
}

export function isLicensedTeamMember(member: TeamMember): boolean {
  return member.active && !member.retired && member.title.includes("Licensed Insurance Agent");
}

export function getTeamMemberLastName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const suffixes = new Set(["jr", "jr.", "sr", "sr.", "ii", "iii", "iv", "v"]);

  if (parts.length === 0) {
    return name;
  }

  for (let index = parts.length - 1; index >= 0; index -= 1) {
    const part = parts[index];

    if (!suffixes.has(part.toLowerCase())) {
      return part;
    }
  }

  return parts.at(-1) ?? name;
}

export function getTeamMemberInitials(name: string): string {
  return name
    .trim()
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function getActiveLicensedTeamMembers(): TeamMember[] {
  return teamMembers
    .filter(isLicensedTeamMember)
    .sort((a, b) => {
      const lastNameComparison = getTeamMemberLastName(a.name).localeCompare(
        getTeamMemberLastName(b.name),
      );
      return lastNameComparison !== 0 ? lastNameComparison : a.name.localeCompare(b.name);
    });
}

const homepageTeamPreviewEndNames = ["Scott Lewis"] as const;
const homepageTeamPreviewEndNameSet = new Set<string>(homepageTeamPreviewEndNames);

export function getHomepageTeamPreviewMembers(): TeamMember[] {
  const members = getActiveLicensedTeamMembers();

  return [
    ...members.filter((member) => !homepageTeamPreviewEndNameSet.has(member.name)),
    ...homepageTeamPreviewEndNames
      .map((name) => members.find((member) => member.name === name))
      .filter((member): member is TeamMember => member !== undefined),
  ];
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  const normalizedSlug = sanitizeReviewSlug(slug) ?? "";
  return teamMembers.find((member) => getTeamMemberSlug(member) === normalizedSlug);
}
