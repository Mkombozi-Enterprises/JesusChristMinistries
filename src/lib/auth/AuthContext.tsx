"use client";

/**
 * Client auth context. When Firebase env is missing, session stays unauthenticated
 * (admin shells render as placeholders). When configured, listens to onAuthStateChanged
 * and reads custom claims from getIdTokenResult().
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "../firebase";
import {
  parseCmsClaims,
  type CmsUserSession,
} from "./roles";

interface AuthContextValue {
  session: CmsUserSession | null;
  user: User | null;
  loading: boolean;
  firebaseReady: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshClaims: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const emptySession = (): CmsUserSession => ({
  uid: "",
  email: null,
  role: null,
  regionId: null,
  authenticated: false,
});

async function sessionFromUser(user: User): Promise<CmsUserSession> {
  const token = await user.getIdTokenResult(true);
  const { role, regionId } = parseCmsClaims(
    token.claims as { role?: string; regionId?: string },
  );
  return {
    uid: user.uid,
    email: user.email,
    role,
    regionId,
    authenticated: true,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<CmsUserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const firebaseReady = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseReady) {
      setSession(emptySession());
      setLoading(false);
      return;
    }
    const auth = getFirebaseAuth();
    if (!auth) {
      setSession(emptySession());
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (next) => {
      setUser(next);
      if (!next) {
        setSession(emptySession());
        setLoading(false);
        return;
      }
      try {
        setSession(await sessionFromUser(next));
      } catch {
        setSession({
          uid: next.uid,
          email: next.email,
          role: null,
          regionId: null,
          authenticated: true,
        });
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [firebaseReady]);

  const signIn = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Firebase Auth is not configured");
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signOut = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await firebaseSignOut(auth);
  }, []);

  const refreshClaims = useCallback(async () => {
    if (!user) return;
    setSession(await sessionFromUser(user));
  }, [user]);

  const value = useMemo(
    () => ({
      session,
      user,
      loading,
      firebaseReady,
      signIn,
      signOut,
      refreshClaims,
    }),
    [session, user, loading, firebaseReady, signIn, signOut, refreshClaims],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
