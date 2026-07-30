# CMS direction — roles, scope & audit logs

> Planning + contract for implementation. Public site still reads
> `src/lib/mock-data.ts` until Firebase is wired.

---

## Roles

| Role | Who | Powers |
|------|-----|--------|
| **`national_admin`** | Bishop’s office / HQ | Full CMS: all regions, national leadership tree, departments, welfare, sermons, blog, membership, **create/revoke regional managers**, edit any region’s content |
| **`regional_manager`** | Regional overseer office | **Only** their `regionId`: branches, local events, local ministries, region page, branch pastors under that region. **Cannot** edit national leadership, other regions, or manage CMS users |

Auth claims (Firebase custom claims):

```json
// National
{ "role": "national_admin" }

// Regional
{ "role": "regional_manager", "regionId": "kilifi" }
```

---

## What each role can edit

### National admin only (not regional managers)

- Bishop, national Assistant Bishop  
- Secretary General, Ministry Coordinator, Treasurer  
- National Women’s / Men’s / Youth leaders  
- Pastors Welfare (Chairman, Secretary, Treasurer)  
- Create / disable regional_manager accounts  
- Global events, national sermons, blog, membership approvals  
- Any region’s content (override)

### Regional manager (scoped)

- Own region profile (description, cover)  
- Branches in `regionId`  
- Branch pastors & local leadership under that region  
- Local / regional events & ministries with matching `regionId`  
- View visitor connects / membership for their branches (optional phase 2)

### Nobody (system)

- Audit log documents — **append-only** via trusted Admin SDK / Cloud Function; no client write

---

## Collections (content)

| Collection | National write | Regional write |
|------------|----------------|----------------|
| `leadership` (band: bishop, assistant_bishop, national_cabinet, national_department, pastors_welfare) | ✓ | ✗ |
| `leadership` (band: regional_overseer, branch_pastor) | ✓ all | ✓ if `regionId` matches claim |
| `regions` | ✓ all | ✓ own `regionId` only |
| `branches` | ✓ all | ✓ if `regionId` matches |
| `events` / `ministries` / `sermons` | ✓ | ✓ if scoped to their region |
| `blogPosts` | ✓ | ✗ (national only by default) |
| `visitorConnects` / `membershipApplications` | ✓ | read own branches |
| `cmsUsers` | ✓ | ✗ |
| `auditLogs` | read ✓ | read own actions (optional) |

Leader documents use `band` (see `src/lib/types.ts`) so rules and admin UI can filter national vs regional rows.

---

## Audit logs (required)

Every CMS mutation must write an **`auditLogs`** entry:

```ts
interface AuditLogEntry {
  actorUid: string;
  actorEmail: string;
  actorRole: "national_admin" | "regional_manager";
  action: "create" | "update" | "delete" | "login" | "role_change";
  collection: string;
  documentId: string;
  regionId?: string;
  summary: string;          // human-readable, e.g. "Updated Kilifi overseer name"
  before?: object;          // optional snapshot
  after?: object;
  timestamp: string;        // ISO
}
```

### Implementation notes

1. Prefer **Cloud Function / Admin SDK** on write paths so clients cannot forge logs.  
2. Logs are **immutable** (rules: `allow create: if false; allow update, delete: if false` for clients; server-only create).  
3. National admin UI: filterable table (actor, region, collection, date).  
4. Log **role_change** when national admin adds/removes a regional manager.  
5. Log **login** optionally for security review.

---

## Admin UI map (future)

```
/admin/dashboard
/admin/leadership          → national_admin only (full org + departments + welfare)
/admin/regions             → national: all · regional: own
/admin/branches
/admin/events | sermons | blog
/admin/users               → national_admin only (regional managers)
/admin/audit-logs          → national_admin (full); regional optional self
/admin/visitors | membership
```

---

## Public leadership page (current)

Renders from mock data in this order:

1. Org tree — Bishop → Assistant Bishop → Cabinet (3) → Regional Overseers (7, expand → pastors)  
2. National Women’s / Men’s / Youth leaders  
3. Pastors Welfare — Chairman, Secretary, Treasurer  

Placeholders use `[To Confirm]` until names/photos are provided.
