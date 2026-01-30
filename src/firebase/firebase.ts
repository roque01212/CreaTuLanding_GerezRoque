import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN3pZNnFjMkI3lnWI6wweUsWQeoKtjCuQ",
  authDomain: "coder-react-7c096.firebaseapp.com",
  projectId: "coder-react-7c096",
  storageBucket: "coder-react-7c096.firebasestorage.app",
  messagingSenderId: "1094863087411",
  appId: "1:1094863087411:web:da640aae9b2264d0460046",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
