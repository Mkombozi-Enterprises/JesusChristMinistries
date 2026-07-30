/** Firestore collection shapes for Jesus Christ Ministries */

/**
 * Public org chart placement (national structure is CMS national-admin only).
 * regional_overseer + branch_pastor may be edited by regional managers in scope.
 */
export type LeadershipBand =
  | "bishop"
  | "assistant_bishop"
  | "national_cabinet"
  | "regional_overseer"
  | "branch_pastor"
  | "national_department"
  | "pastors_welfare";

export type LeadershipLevel = 1 | 2 | 3; // 1=Bishop, 2=Overseer tier, 3=Pastor
export type LeadershipTitle =
  | "Bishop"
  | "Assistant Bishop"
  | "Secretary General"
  | "Ministry Coordinator"
  | "Treasurer"
  | "Overseer"
  | "Pastor"
  | "Assistant Pastor"
  | "Elder"
  | "Reverend"
  | "National Women's Leader"
  | "National Men's Leader"
  | "National Youth Leader"
  | "Chairman"
  | "Secretary";

export type EventScope = "global" | "region" | "branch";
export type BlogCategory = "devotional" | "news" | "testimony";
export type MembershipStatus = "pending" | "approved" | "rejected";
export type Locale = "en" | "sw";

/** CMS roles — see docs/CMS_DIRECTION.md */
export type CmsRole = "national_admin" | "regional_manager";

export interface Region {
  id: string;
  name: string;
  overseerName: string;
  overseerPhotoURL?: string;
  overseerSpousePhotoURL?: string;
  description: string;
  coverImage?: string;
}

export interface Branch {
  id: string;
  name: string;
  regionId: string;
  address: string;
  mapEmbedURL?: string;
  serviceTimes: ServiceTime[];
  pastorName: string;
  pastorPhotoURL?: string;
  phone?: string;
  whatsapp?: string;
  isMainCampus: boolean;
}

export interface ServiceTime {
  day: string;
  time: string;
  label?: string;
}

export interface Leader {
  id: string;
  name: string;
  /**
   * Card headline when spouses serve at the same level
   * e.g. "Bishop Edward and Mrs. Edith Musamusi"
   */
  displayName?: string;
  title: LeadershipTitle;
  /**
   * Override gold role label on the org card
   * e.g. Bishop seat shows "Founder" instead of "Bishop"
   */
  roleLabel?: string;
  /** Where this person sits in the public org chart / page sections */
  band: LeadershipBand;
  photoURL?: string;
  spousePhotoURL?: string;
  regionId?: string;
  branchId?: string;
  bio: string;
  /** Legacy tree depth helper: 1 bishop, 2 overseer-tier, 3 pastor */
  level: LeadershipLevel;
  spouseName?: string;
  /** Sort order within the same band */
  sortOrder?: number;
}

export interface Sermon {
  id: string;
  title: string;
  youtubeId: string;
  speaker: string;
  date: string;
  series?: string;
  branchId?: string;
  tags: string[];
  isLive?: boolean;
}

export interface MinistryEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  scope: EventScope;
  regionId?: string;
  branchId?: string;
  flyerImageURL?: string;
}

export interface Ministry {
  id: string;
  name: string;
  branchId?: string;
  leaderName?: string;
  description: string;
  meetingSchedule?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  authorName: string;
  coverImage?: string;
  publishDate: string;
  category: BlogCategory;
  titleSw?: string;
  bodySw?: string;
}

export interface VisitorConnect {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  branchId: string;
  howHeard?: string;
  message?: string;
  timestamp?: string;
}

export interface MembershipApplication {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  branchId: string;
  dob?: string;
  previousChurch?: string;
  status: MembershipStatus;
  timestamp?: string;
}

/**
 * Immutable CMS audit trail — every create/update/delete by admin users.
 * National admin can read all; regional managers may only see their own actions (optional).
 */
export interface AuditLogEntry {
  id?: string;
  actorUid: string;
  actorEmail: string;
  actorRole: CmsRole;
  action: "create" | "update" | "delete" | "login" | "role_change";
  collection: string;
  documentId: string;
  regionId?: string;
  summary: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  timestamp: string;
}
