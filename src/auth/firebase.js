
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aqi-ai.firebaseapp.com",
  projectId: "aqi-ai",


};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
