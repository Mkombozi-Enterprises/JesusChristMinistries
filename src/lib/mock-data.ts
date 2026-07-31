import type {
  Branch,
  Leader,
  MinistryEvent,
  Region,
  Sermon,
} from "./types";

/** Confirmed regions — Kilifi spelling normalized from "KIlifi" */
export const REGIONS: Region[] = [
  {
    id: "nairobi",
    name: "Nairobi",
    overseerName: "Overseer [To Confirm]",
    description:
      "Serving the capital and surrounding counties with vibrant Spirit-filled worship.",
  },
  {
    id: "western",
    name: "Western",
    overseerName: "Rev. Hudson Musamusi and Mrs. Everlyne Kisanya",
    overseerPhotoURL: "/images/leadership/rev-hudson-musamusi.jpg",
    overseerSpousePhotoURL:
      "/images/leadership/mrs-hudson-everlyne-kisanya.jpg",
    description:
      "Reaching communities across Western Kenya with the Gospel of Jesus Christ, led by Rev. Hudson Musamusi and Mrs. Everlyne Kisanya.",
  },
  {
    id: "central-rift",
    name: "Central Rift Valley",
    overseerName: "Rev. Charlse Koech and Mrs. Caroline Cheropkoech",
    overseerPhotoURL: "/images/leadership/north-rift-overseers.jpg",
    description:
      "Reaching communities across the Central Rift Valley region, led by Rev. Charlse Koech and Mrs. Caroline Cheropkoech.",
  },
  {
    id: "kilgoris",
    name: "Kilgoris",
    overseerName: "Rev. Thomas Sonkok and Mrs. Sonkok",
    overseerPhotoURL: "/images/leadership/rev-thomas-sonkok.jpg",
    overseerSpousePhotoURL: "/images/leadership/mrs-sonkok.jpg",
    description:
      "Ministry presence in Kilgoris and neighboring communities, led by Rev. Thomas Sonkok and Mrs. Sonkok.",
  },
  {
    id: "meru",
    name: "Meru",
    overseerName: "Rev. Rotich Kamama and Mrs. Stellar Kamama",
    overseerPhotoURL: "/images/leadership/meru-rotich-stellar.jpg",
    description:
      "Bringing hope and the Word of God to Meru and beyond, led by Rev. Rotich Kamama and Mrs. Stellar Kamama.",
  },
  {
    id: "kilifi",
    name: "Kilifi",
    overseerName: "Rev. Chai Festus and Pastor Daisy Bahati",
    overseerPhotoURL: "/images/leadership/rev-chai-festus.jpg",
    overseerSpousePhotoURL: "/images/leadership/rev-chai-spouse.jpg",
    description:
      "Coastal region ministry rooted in Pentecostal faith, led by Regional Overseers Rev. Chai Festus and Pastor Daisy Bahati (who also serve as Assistant Bishop nationally).",
  },
  {
    id: "malindi",
    name: "Malindi",
    overseerName: "Reverend Katana",
    overseerPhotoURL: "/images/leadership/rev-katana.jpg",
    description:
      "Serving Malindi and coastal communities with love and power, led by Rev. Katana.",
  },
];

/** Local assets until uploaded to Firebase Storage */
export const BISHOP_PHOTO =
  "/images/leadership/bishop-edward-edith-musamusi.jpg";
export const REV_CHAI_PHOTO = "/images/leadership/rev-chai-festus.jpg";
export const REV_CHAI_SPOUSE_PHOTO = "/images/leadership/rev-chai-spouse.jpg";
export const REV_HUDSON_PHOTO = "/images/leadership/rev-hudson-musamusi.jpg";
export const MRS_HUDSON_PHOTO =
  "/images/leadership/mrs-hudson-everlyne-kisanya.jpg";
export const REV_SONKOK_PHOTO = "/images/leadership/rev-thomas-sonkok.jpg";
export const MRS_SONKOK_PHOTO = "/images/leadership/mrs-sonkok.jpg";
export const REV_KATANA_PHOTO = "/images/leadership/rev-katana.jpg";
export const CENTRAL_RIFT_PHOTO =
  "/images/leadership/north-rift-overseers.jpg";
export const NORTH_RIFT_PHOTO = CENTRAL_RIFT_PHOTO;
export const RONALD_CHIWAI_PHOTO =
  "/images/leadership/ronald-ngala-chiwai.jpg";
export const RONALD_CHIWAI_SPOUSE_PHOTO =
  "/images/leadership/ronald-ngala-chiwai-spouse.jpg";
export const MERU_OVERSEERS_PHOTO =
  "/images/leadership/meru-rotich-stellar.jpg";

/**
 * Confirmed regional overseers (keyed by regionId).
 * On regional cards, title is always Overseer (role label driven by band).
 * Mr. & Mrs. Rev. Chai also hold the national Assistant Bishop seat separately.
 */
const OVERSEER_BY_REGION: Partial<
  Record<
    string,
    Pick<
      Leader,
      | "name"
      | "displayName"
      | "title"
      | "photoURL"
      | "spousePhotoURL"
      | "spouseName"
      | "bio"
    >
  >
> = {
  meru: {
    name: "Rev. Rotich Kamama",
    displayName: "Rev. Rotich Kamama and Mrs. Stellar Kamama",
    title: "Overseer",
    spouseName: "Mrs. Stellar Kamama",
    // Joint couple photo
    photoURL: MERU_OVERSEERS_PHOTO,
    bio: "Rev. Rotich Kamama and Mrs. Stellar Kamama serve as Regional Overseers for Meru Region, shepherding branch pastors and advancing ministry in Meru and surrounding communities.",
  },
  "central-rift": {
    name: "Rev. Charlse Koech",
    displayName: "Rev. Charlse Koech and Mrs. Caroline Cheropkoech",
    title: "Overseer",
    spouseName: "Mrs. Caroline Cheropkoech",
    // Joint couple photo (single image)
    photoURL: CENTRAL_RIFT_PHOTO,
    bio: "Rev. Charlse Koech and Mrs. Caroline Cheropkoech serve as Regional Overseers for Central Rift Valley Region, shepherding branch pastors and advancing ministry across Central Rift Valley.",
  },
  western: {
    name: "Reverend Hudson Musamusi",
    displayName: "Rev. Hudson Musamusi and Mrs. Everlyne Kisanya",
    title: "Overseer",
    spouseName: "Mrs. Everlyne Kisanya",
    photoURL: REV_HUDSON_PHOTO,
    spousePhotoURL: MRS_HUDSON_PHOTO,
    bio: "Rev. Hudson Musamusi and Mrs. Everlyne Kisanya serve as Regional Overseers for Western Region, overseeing branch pastors and ministry growth across Western Kenya.",
  },
  kilgoris: {
    name: "Reverend Thomas Sonkok",
    displayName: "Rev. Thomas Sonkok and Mrs. Sonkok",
    title: "Overseer",
    spouseName: "Mrs. Sonkok",
    photoURL: REV_SONKOK_PHOTO,
    spousePhotoURL: MRS_SONKOK_PHOTO,
    bio: "Rev. Thomas Sonkok and Mrs. Sonkok serve as Regional Overseers for Kilgoris Region, shepherding branch pastors and advancing ministry in Kilgoris and neighboring communities.",
  },
  kilifi: {
    name: "Rev. Chai Festus",
    displayName: "Rev. Chai Festus and Pastor Daisy Bahati",
    // Regional seat — card label comes from band "regional_overseer"
    title: "Overseer",
    spouseName: "Pastor Daisy Bahati",
    photoURL: REV_CHAI_PHOTO,
    spousePhotoURL: REV_CHAI_SPOUSE_PHOTO,
    bio: "Rev. Chai Festus and Pastor Daisy Bahati serve as Regional Overseers for Kilifi Region and also as Assistant Bishop at national level, shepherding branch pastors and advancing Spirit-filled ministry along the coast.",
  },
  malindi: {
    name: "Reverend Katana",
    title: "Overseer",
    photoURL: REV_KATANA_PHOTO,
    bio: "Reverend Katana serves as Regional Overseer for Malindi Region, overseeing branch pastors and ministry growth along the coast.",
  },
};

/** National apex + cabinet + departments + welfare (CMS: national_admin only) */
export const NATIONAL_LEADERSHIP: Leader[] = [
  {
    id: "bishop-edward",
    name: "Bishop Edward Musamusi",
    displayName: "Bishop Edward and Mrs. Edith Musamusi",
    title: "Bishop",
    roleLabel: "Founder",
    band: "bishop",
    spouseName: "Mrs. Edith Musamusi",
    photoURL: BISHOP_PHOTO,
    level: 1,
    sortOrder: 0,
    bio: "Bishop Edward and Mrs. Edith Musamusi founded and lead Jesus Christ Ministries with a passion for soul-winning, Spirit-filled worship, and raising strong local churches across Kenya.",
  },
  {
    id: "assistant-bishop-national",
    name: "Rev. Chai Festus",
    displayName: "Mr. and Mrs. Rev. Chai Festus",
    title: "Assistant Bishop",
    band: "assistant_bishop",
    spouseName: "Mrs. Chai",
    photoURL: REV_CHAI_PHOTO,
    spousePhotoURL: REV_CHAI_SPOUSE_PHOTO,
    level: 1,
    sortOrder: 1,
    bio: "Mr. and Mrs. Rev. Chai Festus serve as Assistant Bishops of Jesus Christ Ministries, supporting the Founder in national oversight, and as Regional Overseers for Kilifi.",
  },
  {
    id: "secretary-general",
    name: "Secretary General [To Confirm]",
    title: "Secretary General",
    band: "national_cabinet",
    level: 1,
    sortOrder: 0,
    bio: "Secretary General of Jesus Christ Ministries — national administration and records. Placeholder pending appointment details.",
  },
  {
    id: "ministry-coordinator",
    name: "Ev. Ronald Chiwai",
    title: "Ministry Coordinator",
    band: "national_cabinet",
    level: 1,
    sortOrder: 1,
    photoURL: RONALD_CHIWAI_PHOTO,
    spousePhotoURL: RONALD_CHIWAI_SPOUSE_PHOTO,
    spouseName: "Mrs. Emmaculate Chiwai",
    displayName: "Ev. Ronald and Mrs. Emmaculate Chiwai",
    bio: "Ev. Ronald and Mrs. Emmaculate Chiwai serve Jesus Christ Ministries as Ministry Coordinator, aligning national programmes and departments under the Bishop's vision.",
  },
  {
    id: "treasurer-national",
    name: "Pastor Nelson Mneria",
    title: "Treasurer",
    band: "national_cabinet",
    level: 1,
    sortOrder: 2,
    photoURL: "/images/leadership/pastor-nelson-mneria.jpg",
    bio: "Pastor Nelson Mneria serves as National Treasurer for Jesus Christ Ministries, stewarding ministry finances with integrity.",
  },
  {
    id: "national-women",
    name: "National Women's Leader [To Confirm]",
    title: "National Women's Leader",
    band: "national_department",
    level: 1,
    sortOrder: 0,
    bio: "Leads the national women's fellowship across all regions.",
  },
  {
    id: "national-men",
    name: "National Men's Leader [To Confirm]",
    title: "National Men's Leader",
    band: "national_department",
    level: 1,
    sortOrder: 1,
    bio: "Leads the national men's fellowship across all regions.",
  },
  {
    id: "national-youth",
    name: "National Youth Leader [To Confirm]",
    title: "National Youth Leader",
    band: "national_department",
    level: 1,
    sortOrder: 2,
    bio: "Leads national youth ministry, conventions, and discipleship.",
  },
  {
    id: "welfare-chairman",
    name: "Rev. Charlse Koech",
    title: "Chairman",
    band: "pastors_welfare",
    level: 1,
    sortOrder: 0,
    photoURL: "/images/leadership/rev-charlse-koech.jpg",
    bio: "Rev. Charlse Koech serves as Chairman of the Pastors Welfare committee.",
  },
  {
    id: "welfare-secretary",
    name: "Rev. Amon Adiema",
    title: "Secretary",
    band: "pastors_welfare",
    level: 1,
    sortOrder: 1,
    bio: "Rev. Amon Adiema serves as Secretary of the Pastors Welfare committee.",
  },
  {
    id: "welfare-treasurer",
    name: "Rev. Thompson Katana",
    title: "Treasurer",
    band: "pastors_welfare",
    level: 1,
    sortOrder: 2,
    photoURL: "/images/leadership/rev-thompson-katana.jpg",
    bio: "Rev. Thompson Katana serves as Treasurer of the Pastors Welfare committee.",
  },
];

/** Regional overseers (one per region) */
export const REGIONAL_OVERSEERS: Leader[] = REGIONS.map((r, i) => {
  const confirmed = OVERSEER_BY_REGION[r.id];
  return {
    id: `overseer-${r.id}`,
    name: confirmed?.name ?? r.overseerName,
    displayName: confirmed?.displayName,
    title: (confirmed?.title ?? "Overseer") as Leader["title"],
    band: "regional_overseer" as const,
    regionId: r.id,
    level: 2 as const,
    sortOrder: i,
    photoURL: confirmed?.photoURL ?? r.overseerPhotoURL,
    spousePhotoURL: confirmed?.spousePhotoURL ?? r.overseerSpousePhotoURL,
    spouseName: confirmed?.spouseName,
    bio:
      confirmed?.bio ??
      `Regional Overseer for ${r.name} Region, overseeing branch pastors and ministry growth.`,
  };
});

export const LEADERSHIP: Leader[] = [
  ...NATIONAL_LEADERSHIP,
  ...REGIONAL_OVERSEERS,
];

/** Sample branches so the org tree and find-branch UI have real structure */
export const BRANCHES: Branch[] = [
  {
    id: "nairobi-main",
    name: "Nairobi Main Campus",
    regionId: "nairobi",
    address: "Nairobi, Kenya",
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", label: "First Service" },
      { day: "Sunday", time: "11:00 AM", label: "Second Service" },
      { day: "Wednesday", time: "6:00 PM", label: "Midweek" },
    ],
    pastorName: "Pastor [To Confirm]",
    phone: "+254700000000",
    whatsapp: "+254700000000",
    isMainCampus: true,
  },
  {
    id: "nairobi-east",
    name: "Nairobi East Branch",
    regionId: "nairobi",
    address: "Eastlands, Nairobi",
    serviceTimes: [
      { day: "Sunday", time: "10:00 AM", label: "Main Service" },
    ],
    pastorName: "Pastor [To Confirm]",
    isMainCampus: false,
  },
  {
    id: "western-hq",
    name: "Western Headquarters",
    regionId: "western",
    address: "Western Kenya",
    serviceTimes: [
      { day: "Sunday", time: "9:30 AM", label: "Main Service" },
    ],
    pastorName: "Pastor [To Confirm]",
    isMainCampus: false,
  },
  {
    id: "central-rift-nakuru",
    name: "Nakuru Branch",
    regionId: "central-rift",
    address: "Nakuru, Central Rift Valley",
    serviceTimes: [
      { day: "Sunday", time: "10:00 AM", label: "Main Service" },
    ],
    pastorName: "Pastor [To Confirm]",
    isMainCampus: false,
  },
  {
    id: "kilgoris-main",
    name: "Kilgoris Main",
    regionId: "kilgoris",
    address: "Kilgoris, Kenya",
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", label: "Main Service" },
    ],
    pastorName: "Pastor [To Confirm]",
    isMainCampus: false,
  },
  {
    id: "meru-main",
    name: "Meru Main",
    regionId: "meru",
    address: "Meru, Kenya",
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", label: "Main Service" },
    ],
    pastorName: "Pastor [To Confirm]",
    isMainCampus: false,
  },
  {
    id: "kilifi-main",
    name: "Kilifi Main",
    regionId: "kilifi",
    address: "Kilifi, Kenya",
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", label: "Main Service" },
    ],
    pastorName: "Pastor [To Confirm]",
    isMainCampus: false,
  },
  {
    id: "malindi-main",
    name: "Malindi Main",
    regionId: "malindi",
    address: "Malindi, Kenya",
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", label: "Main Service" },
    ],
    pastorName: "Pastor [To Confirm]",
    isMainCampus: false,
  },
];

/** Branch pastors for org tree (level 3) */
export const BRANCH_PASTORS: Leader[] = BRANCHES.map((b) => ({
  id: `pastor-${b.id}`,
  name: b.pastorName,
  title: "Pastor" as const,
  band: "branch_pastor" as const,
  regionId: b.regionId,
  branchId: b.id,
  level: 3 as const,
  bio: `Pastor of ${b.name}, serving under the ${REGIONS.find((r) => r.id === b.regionId)?.name} Region.`,
}));

export const ALL_LEADERS: Leader[] = [...LEADERSHIP, ...BRANCH_PASTORS];

export function getLeadersByBand(band: Leader["band"]): Leader[] {
  return ALL_LEADERS.filter((l) => l.band === band).sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );
}

export function getBishop(): Leader {
  return getLeadersByBand("bishop")[0];
}

export function getAssistantBishop(): Leader {
  return getLeadersByBand("assistant_bishop")[0];
}

export function getNationalCabinet(): Leader[] {
  return getLeadersByBand("national_cabinet");
}

export function getNationalDepartments(): Leader[] {
  return getLeadersByBand("national_department");
}

export function getPastorsWelfare(): Leader[] {
  return getLeadersByBand("pastors_welfare");
}

export const SERMONS: Sermon[] = [
  {
    id: "sermon-1",
    title: "Walking in the Holy Spirit / Trusting God",
    youtubeId: "KA5Ujd5gKh4", // Jim Cymbala — Walking in the Holy Spirit
    speaker: "Bishop Edward Musamusi",
    date: "2026-07-20",
    series: "Spirit-Filled Living",
    tags: ["Holy Spirit", "Power"],
  },
  {
    id: "sermon-2",
    title: "Walking in the Holy Spirit",
    youtubeId: "r-9L2-aVR4I", // Charles Stanley — Walking in the Holy Spirit (In Touch Ministries)
    speaker: "Bishop Edward Musamusi",
    date: "2026-07-13",
    series: "Foundations of Faith",
    tags: ["Faith"],
  },
  {
    id: "sermon-3",
    title: "Christless Pentecost",
    youtubeId: "qgL1feavkwE", // David Wilkerson — Christless Pentecost (prophetic classic)
    speaker: "Bishop Edward Musamusi",
    date: "2026-07-06",
    series: "Spirit-Filled Living",
    tags: ["Pentecost", "Holy Spirit"],
  },
];

export const EVENTS: MinistryEvent[] = [
  {
    id: "event-1",
    title: "National Leadership Summit",
    date: "2026-08-15",
    time: "9:00 AM",
    description:
      "Annual gathering of all regional overseers and branch pastors for prayer, training, and vision casting.",
    scope: "global",
  },
  {
    id: "event-2",
    title: "Nairobi Youth Convention",
    date: "2026-09-05",
    time: "10:00 AM",
    description: "A Spirit-filled weekend for young people across Nairobi Region.",
    scope: "region",
    regionId: "nairobi",
  },
  {
    id: "event-3",
    title: "Coastal Crusade — Kilifi & Malindi",
    date: "2026-10-10",
    time: "4:00 PM",
    description: "Open-air evangelism crusade along the coast.",
    scope: "region",
    regionId: "kilifi",
  },
];

export function getBranchesByRegion(regionId: string): Branch[] {
  return BRANCHES.filter((b) => b.regionId === regionId);
}

export function getPastorsByRegion(regionId: string): Leader[] {
  return BRANCH_PASTORS.filter((l) => l.regionId === regionId);
}

export function getRegionById(id: string): Region | undefined {
  return REGIONS.find((r) => r.id === id);
}

export function getBranchById(id: string): Branch | undefined {
  return BRANCHES.find((b) => b.id === id);
}

export function getLatestSermon(): Sermon {
  return [...SERMONS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];
}

export function getUpcomingEvents(limit = 3): MinistryEvent[] {
  const today = new Date().toISOString().slice(0, 10);
  return EVENTS.filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}
