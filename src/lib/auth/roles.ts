/**
 * CMS role model for Jesus Christ Ministries.
 *
 * Claims are expected on the Firebase Auth ID token (custom claims):
 *   { role: "national_admin" }
 *   { role: "regional_manager", regionId: "kilifi" }
 *
 * Set claims with the Admin SDK (never from the client). See docs/FIREBASE_SETUP.md.
 */

import type { CmsRole } from "../types";

export type { CmsRole };

export interface CmsClaims {
  role?: CmsRole | string;
  regionId?: string;
}

export interface CmsUserSession {
  uid: string;
  email: string | null;
  role: CmsRole | null;
  regionId: string | null;
  /** True when Firebase env is configured and a session is present */
  authenticated: boolean;
}

export function parseCmsClaims(
  claims: CmsClaims | null | undefined,
): Pick<CmsUserSession, "role" | "regionId"> {
  if (!claims?.role) return { role: null, regionId: null };
  if (claims.role === "national_admin") {
    return { role: "national_admin", regionId: null };
  }
  if (claims.role === "regional_manager") {
    return {
      role: "regional_manager",
      regionId: claims.regionId ?? null,
    };
  }
  return { role: null, regionId: null };
}

export function isNationalAdmin(session: CmsUserSession | null): boolean {
  return session?.authenticated === true && session.role === "national_admin";
}

export function isRegionalManager(session: CmsUserSession | null): boolean {
  return (
    session?.authenticated === true && session.role === "regional_manager"
  );
}

/** Can edit a region document / region-scoped content */
export function canEditRegion(
  session: CmsUserSession | null,
  regionId: string,
): boolean {
  if (!session?.authenticated || !session.role) return false;
  if (session.role === "national_admin") return true;
  return (
    session.role === "regional_manager" && session.regionId === regionId
  );
}

/**
 * National-only surfaces: founder/cabinet tree, departments, welfare,
 * CMS user admin, full audit log, global blog, etc.
 */
export function canEditNationalLeadership(
  session: CmsUserSession | null,
): boolean {
  return isNationalAdmin(session);
}

export function canManageCmsUsers(session: CmsUserSession | null): boolean {
  return isNationalAdmin(session);
}

/** Full audit log; regional managers may later see only their own actions */
export function canViewAllAuditLogs(session: CmsUserSession | null): boolean {
  return isNationalAdmin(session);
}

export const ROLE_LABELS: Record<CmsRole, string> = {
  national_admin: "National Admin",
  regional_manager: "Regional Manager",
};
