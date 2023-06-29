import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAcRn511BO_qyTT1EjNgOsemBCYDnIDkQo",
  authDomain: "fir-reto-react.firebaseapp.com",
  projectId: "fir-reto-react",
  storageBucket: "fir-reto-react.appspot.com",
  messagingSenderId: "470326326433",
  appId: "1:470326326433:web:88025454b67cb9396fece0",
  measurementId: "G-71J37WWB1R"
};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
