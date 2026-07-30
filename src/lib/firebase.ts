/**
 * Firebase client — project: jesus-christ-ministries
 *
 * Env (see .env.local / .env.example):
 *   NEXT_PUBLIC_FIREBASE_API_KEY
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 *   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   NEXT_PUBLIC_FIREBASE_APP_ID
 *   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID (optional Analytics)
 *
 * Public content still reads from mock-data until collections are seeded.
 * Analytics is browser-only and only loads when measurementId is set.
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;
let storage: FirebaseStorage | undefined;

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured()) return null;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore | null {
  const a = getFirebaseApp();
  if (!a) return null;
  if (!db) db = getFirestore(a);
  return db;
}

export function getFirebaseAuth(): Auth | null {
  const a = getFirebaseApp();
  if (!a) return null;
  if (!auth) auth = getAuth(a);
  return auth;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  const a = getFirebaseApp();
  if (!a) return null;
  if (!storage) storage = getStorage(a);
  return storage;
}

/** Call only in the browser after app init if you want Analytics. */
export async function initAnalytics() {
  if (typeof window === "undefined") return null;
  if (!firebaseConfig.measurementId) return null;
  const a = getFirebaseApp();
  if (!a) return null;
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  if (!(await isSupported())) return null;
  return getAnalytics(a);
}
