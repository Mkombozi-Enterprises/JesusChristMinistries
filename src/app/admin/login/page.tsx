"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";

export default function AdminLoginPage() {
  const { signIn, firebaseReady, session, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signIn(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Sign-in failed. Check credentials.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Admin sign in
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        National admins and regional managers use email/password Auth. Custom
        claims on the token decide what you can edit.
      </p>

      {!firebaseReady && (
        <div className="mt-4 rounded-xl border border-gold/40 bg-gold-soft/40 p-4 text-sm text-ink">
          Firebase is not configured. Add keys to{" "}
          <code className="text-xs">.env.local</code> before signing in works.
          You can still browse admin UI shells.
        </div>
      )}

      {session?.authenticated && !loading && (
        <p className="mt-4 text-sm text-brand">
          Already signed in as {session.email}.{" "}
          <Link href="/admin/dashboard" className="font-semibold underline">
            Dashboard
          </Link>
        </p>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            className="w-full rounded-xl border border-border px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded-xl border border-border px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        {error && (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !firebaseReady}
          className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
