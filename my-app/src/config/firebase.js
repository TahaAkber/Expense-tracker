// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPl4BpIpxIzKRPm3G4Kb3TArN9bpXWGEI",
  authDomain: "expense-tracker-4bdc3.firebaseapp.com",
  projectId: "expense-tracker-4bdc3",
  storageBucket: "expense-tracker-4bdc3.appspot.com",
  messagingSenderId: "842763186124",
  appId: "1:842763186124:web:86e22629a720c1f156f769",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
