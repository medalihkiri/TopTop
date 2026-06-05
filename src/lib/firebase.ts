import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  ...(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && {
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }),
};

function assertFirebaseConfig() {
  const required = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ] as const;

  const missing = required.filter((key) => !firebaseConfig[key]);
  if (missing.length > 0) {
    throw new Error(
      `Firebase is not configured (missing: ${missing.join(", ")}). ` +
        `Locally: .env.local + restart dev. On Vercel: Project Settings → Environment Variables, then redeploy.`
    );
  }
}

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

function getFirebaseApp(): FirebaseApp {
  assertFirebaseConfig();
  if (!app) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

/** Firestore client — browser only (avoids Next.js SSR hangs). */
export function getDb(): Firestore {
  if (typeof window === "undefined") {
    throw new Error("Firestore is only available in the browser.");
  }

  if (!db) {
    const firebaseApp = getFirebaseApp();
    try {
      db = initializeFirestore(firebaseApp, {
        localCache: memoryLocalCache(),
      });
    } catch {
      db = getFirestore(firebaseApp);
    }
  }

  return db;
}
