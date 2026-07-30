"use client";

/**
 * Audit logs shell — national admin only (when Auth is wired).
 * Empty table until Firestore `auditLogs` is populated via Admin SDK / Cloud Functions.
 */

import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  canViewAllAuditLogs,
  ROLE_LABELS,
} from "@/lib/auth/roles";
import type { AuditLogEntry } from "@/lib/types";

/** Placeholder rows so the UI can be reviewed without Firebase */
const PLACEHOLDER_LOGS: AuditLogEntry[] = [];

export default function AdminAuditLogsPage() {
  const { session, loading, firebaseReady, signOut } = useAuth();
  const allowed = canViewAllAuditLogs(session);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
            CMS · National Admin
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink">
            Audit Logs
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">
            Immutable record of CMS actions (create, update, delete, role
            changes, logins). Written server-side only — clients cannot forge
            entries. Full history is visible to national admins.
          </p>
        </div>
        {session?.authenticated && (
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-ink-muted hover:bg-white"
          >
            Sign out
          </button>
        )}
      </div>

      {/* Status banner */}
      <div className="mt-6 rounded-xl border border-border bg-white p-4 text-sm">
        {loading ? (
          <p className="text-ink-muted">Checking session…</p>
        ) : !firebaseReady ? (
          <div className="space-y-1">
            <p className="font-semibold text-brand">
              Firebase not configured yet
            </p>
            <p className="text-ink-muted">
              Add the web app config to{" "}
              <code className="rounded bg-off-white px-1 text-xs">
                .env.local
              </code>
              . See{" "}
              <code className="rounded bg-off-white px-1 text-xs">
                docs/FIREBASE_SETUP.md
              </code>
              . This page is a UI shell until Auth +{" "}
              <code className="rounded bg-off-white px-1 text-xs">
                auditLogs
              </code>{" "}
              collection are live.
            </p>
          </div>
        ) : !session?.authenticated ? (
          <div className="space-y-2">
            <p className="font-semibold text-brand">Not signed in</p>
            <p className="text-ink-muted">
              Sign in with a national admin account to view audit logs.
            </p>
            <Link
              href="/admin/login"
              className="inline-block text-sm font-semibold text-brand hover:underline"
            >
              Go to admin login →
            </Link>
          </div>
        ) : !allowed ? (
          <div className="space-y-1">
            <p className="font-semibold text-brand">Access restricted</p>
            <p className="text-ink-muted">
              Signed in as {session.email ?? session.uid}
              {session.role
                ? ` (${ROLE_LABELS[session.role] ?? session.role})`
                : " (no CMS role on token)"}
              . Only{" "}
              <strong>national_admin</strong> can view the full audit log.
            </p>
          </div>
        ) : (
          <p className="text-ink-muted">
            Signed in as <strong>{session.email}</strong> ·{" "}
            {ROLE_LABELS.national_admin}
          </p>
        )}
      </div>

      {/* Filters (shell) */}
      <div className="mt-6 flex flex-wrap gap-2">
        <input
          type="search"
          placeholder="Search actor, collection, summary…"
          disabled
          className="min-w-[14rem] flex-1 rounded-xl border border-border bg-white px-3 py-2 text-sm text-ink-muted"
        />
        <select
          disabled
          className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-ink-muted"
        >
          <option>All actions</option>
          <option>create</option>
          <option>update</option>
          <option>delete</option>
          <option>role_change</option>
          <option>login</option>
        </select>
        <select
          disabled
          className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-ink-muted"
        >
          <option>All regions</option>
        </select>
      </div>

      {/* Table shell */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-border bg-off-white text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">When</th>
              <th className="px-4 py-3 font-semibold">Actor</th>
              <th className="px-4 py-3 font-semibold">Action</th>
              <th className="px-4 py-3 font-semibold">Collection</th>
              <th className="px-4 py-3 font-semibold">Summary</th>
              <th className="px-4 py-3 font-semibold">Region</th>
            </tr>
          </thead>
          <tbody>
            {PLACEHOLDER_LOGS.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-ink-muted"
                >
                  <p className="font-medium text-ink">No audit entries yet</p>
                  <p className="mt-1 text-xs">
                    Logs will appear here once the write pipeline appends to{" "}
                    <code className="rounded bg-off-white px-1">auditLogs</code>
                    .
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-ink-muted">
        Schema:{" "}
        <code className="rounded bg-off-white px-1">AuditLogEntry</code> in{" "}
        <code className="rounded bg-off-white px-1">src/lib/types.ts</code> ·
        Permissions:{" "}
        <code className="rounded bg-off-white px-1">docs/CMS_DIRECTION.md</code>
      </p>
    </div>
  );
}
