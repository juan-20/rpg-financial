// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_APIKEY,
  authDomain: import.meta.env.REACT_APP_AUTHDOMAIN,
  databaseURL: import.meta.env.REACT_APP_DATABASEURL,
  projectId: 'money-7846b',
  storageBucket: import.meta.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.REACT_APP_MESSAGINGID,
  appId: import.meta.env.REACT_APP_APPID,
  // measurementId: process.env.NEXT_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };