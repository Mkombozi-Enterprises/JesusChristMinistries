# Firebase setup — Jesus Christ Ministries

The site runs **without Firebase** today (mock data in `src/lib/mock-data.ts`).  
When you are ready for live CMS / forms / admin, complete the steps below.

---

## After you create the project — what to send back here

Paste **only** these (safe for client apps; they are public web keys):

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Plus:

1. Confirmation that **Email/Password** Auth is enabled  
2. Confirmation that **Firestore** is created (region name, e.g. `europe-west1`)  
3. Confirmation that **Storage** is created (optional for first pass)  
4. The **email** of the first national admin user you created in Authentication → Users  

**Do not paste** private keys, service-account JSON, or passwords into chat.  
If we need Admin SDK later for custom claims / audit writes, you can add a service account in the console and store the JSON only in your machine/Vercel secrets — never commit it.

---

## What you need to do (checklist)

### 1. Create a Firebase project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. **Add project** → name it e.g. `jesus-christ-ministries`
3. Disable Google Analytics if you do not need it (optional either way)
4. Create the project

### 2. Register a Web app

1. Project Overview → **Add app** → **Web** (`</>`)
2. Nickname: `jcm-web`
3. **Do not** enable Firebase Hosting (we use **Vercel**)
4. Copy the `firebaseConfig` values

### 3. Enable the products we use

| Product | Why | How |
|---------|-----|-----|
| **Firestore** | Regions, branches, leadership, sermons, events, forms, `auditLogs` | Build → Firestore Database → Create database → **Start in production mode** → pick a region (e.g. `europe-west` or nearest to Kenya users if available) |
| **Authentication** | Admin login | Build → Authentication → Get started → **Email/Password** (enable) |
| **Storage** | Photos (overseers, pastors, flyers) | Build → Storage → Get started → use same region as Firestore |

You do **not** need Firebase Hosting or Realtime Database. Cloud Functions come later for audit writes / WhatsApp.

### 4. Create your first national admin user

1. Authentication → Users → **Add user**  
2. Ministry email + strong password  
3. Tell the developer that email so we can set custom claim:

```json
{ "role": "national_admin" }
```

(Custom claims are set with Admin SDK / a one-off script — not from the public website.)

### 5. Add config to the app (local + Vercel)

Create `.env.local` in the project root (never commit this file):

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Values come from Project settings → Your apps → Web app config.

On **Vercel**: Project → Settings → Environment Variables → paste the same six keys for Production + Preview.

### 6. Security rules (important)

Until admin UI is finished, keep write access locked to signed-in admins.

**Firestore rules** (start here — tighten later):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for site content
    match /regions/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /branches/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /leadership/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /sermons/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /events/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /ministries/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /blogPosts/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Forms: anyone can create; only admin can read/update
    match /visitorConnects/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /membershipApplications/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

**Storage rules** (photos public-read, admin-write):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /leadership/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /regions/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /events/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 7. Seed the 7 regions

After Firestore is created:

**Option A — Console (manual, fine for 7 docs)**  
Firestore → Start collection `regions` → add documents with IDs below.

**Option B — Seed script** (when `.env.local` is set):

```bash
# Requires firebase-admin + service account later; for now use Console or the JSON in docs/seed/
```

Document IDs and fields are listed in `docs/seed/regions.json`.

### 8. Upload photos later

When you have overseer/pastor photos:

1. Storage → `leadership/` folder  
2. Upload files (e.g. `overseer-nairobi.jpg`)  
3. Copy download URL into the matching Firestore `leadership` doc field `photoURL`  
   (or we wire this in admin UI)

Bishop couple photo is already in the repo at:

`public/images/leadership/bishop-edward-edith-musamusi.jpg`

We can re-upload that to Storage later for a single CDN source of truth.

---

## What you do **not** need to do yet

- Custom domain on Firebase (use Vercel domains)
- Cloud Functions / WhatsApp notifications (phase 2)
- Paybill fields
- Full branch list (sample branches are enough for visual QA)

---

## When to tell me you’re ready

Send:

1. Confirmation that the Firebase project exists  
2. That `.env.local` (or Vercel env) is filled  
3. That Firestore is created  

Then I can wire the site to live reads and add a one-click seed for regions + leadership.
