import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">
        Admin Dashboard
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Auth-protected CRUD will be wired to Firestore. Role helpers and audit
        log shell are in place — configure Firebase to unlock sign-in.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "regions",
          "branches",
          "leadership",
          "sermons",
          "events",
          "blog",
          "visitors",
          "membership",
        ].map((s) => (
          <li key={s}>
            <Link
              href={`/admin/${s}`}
              className="block rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium capitalize text-brand shadow-sm hover:border-brand"
            >
              Manage {s}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/admin/audit-logs"
            className="block rounded-xl border border-gold/40 bg-gold-soft/30 px-4 py-3 text-sm font-medium text-brand shadow-sm hover:border-brand"
          >
            Audit logs
          </Link>
        </li>
        <li>
          <Link
            href="/admin/login"
            className="block rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-brand shadow-sm hover:border-brand"
          >
            Admin login
          </Link>
        </li>
      </ul>
    </div>
  );
}
