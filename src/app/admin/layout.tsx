import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/login", label: "Login" },
  { href: "/admin/regions", label: "Regions" },
  { href: "/admin/branches", label: "Branches" },
  { href: "/admin/leadership", label: "Leadership" },
  { href: "/admin/sermons", label: "Sermons" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/visitors", label: "Visitors" },
  { href: "/admin/membership", label: "Membership" },
  { href: "/admin/audit-logs", label: "Audit logs" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[60vh] bg-off-white">
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 sm:px-6">
          <span className="mr-4 text-sm font-bold text-brand">JCM Admin</span>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1 text-xs font-medium text-ink-muted hover:bg-brand-muted hover:text-brand"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
