// services/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase }   from "firebase/database";

// .env.local に書いたキーを読み込みます
const firebaseConfig = {
  apiKey:             import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:         import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL:        import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId:          import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId:              import.meta.env.VITE_FIREBASE_APP_ID,
};

// ① Firebase を一度だけ初期化
const app = initializeApp(firebaseConfig);

// ② Realtime Database への “入口” を作成して外部に公開
export const db = getDatabase(app);
