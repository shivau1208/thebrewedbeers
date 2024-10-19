import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDg59gIqJJFkkQv6BmXOikdYhoDT14TBgs",
  authDomain: "web-auth-f9855.firebaseapp.com",
  projectId: "web-auth-f9855",
  storageBucket: "web-auth-f9855.appspot.com",
  messagingSenderId: "522074340808",
  appId: "1:522074340808:web:de545b02cd3fd3da5154fd",
  measurementId: "G-XJHKLGMQP5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
provider.setCustomParameters({
  'login_hint':'user@example.com'
})
auth.languageCode = 'en'