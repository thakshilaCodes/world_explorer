// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAltRite6vgtNnSh7uciI1vKOsUIzJziRg",
  authDomain: "country-explorer-b490e.firebaseapp.com",
  projectId: "country-explorer-b490e",
  storageBucket: "country-explorer-b490e.firebasestorage.app",
  messagingSenderId: "67945919307",
  appId: "1:67945919307:web:c709d191cc18edea656ece",
  measurementId: "G-1F04VKY38N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);