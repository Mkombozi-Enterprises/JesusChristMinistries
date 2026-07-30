"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function AdminSectionPage() {
  const { section } = useParams<{ section: string }>();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
        Admin
      </p>
      <h1 className="mt-1 font-display text-2xl font-semibold capitalize text-ink">
        {section}
      </h1>
      <p className="mt-3 max-w-xl text-sm text-ink-muted">
        CRUD interface for <strong>{section}</strong> will connect to the
        matching Firestore collection once Firebase Auth + security rules are
        configured. Forms submit to mock handlers for now.
      </p>
      <Link
        href="/admin/dashboard"
        className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
      >
        ← Dashboard
      </Link>
    </div>
  );
}
