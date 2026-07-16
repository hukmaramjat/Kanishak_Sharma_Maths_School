import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqTBd4z7RdanmIrB1YGIpIlVuMBXzUfSA",
  authDomain: "kanishak-sharma-maths.firebaseapp.com",
  projectId: "kanishak-sharma-maths",
  storageBucket: "kanishak-sharma-maths.firebasestorage.app",
  messagingSenderId: "312315005870",
  appId: "1:312315005870:web:8e13d3622e3b0baf83563f",
  measurementId: "G-9YNTE1XR7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
