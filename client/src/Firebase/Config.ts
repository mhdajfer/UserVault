import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA46WRUWXQ0OfVSc8nTG6aUWgMO_VqK88U",
  authDomain: "olx-clone-687a8.firebaseapp.com",
  projectId: "olx-clone-687a8",
  storageBucket: "olx-clone-687a8.appspot.com",
  messagingSenderId: "875538904793",
  appId: "1:875538904793:web:9e3c0bf88a7a5c692870c8",
  measurementId: "G-TX249XX5M0",
};

const Firebase = initializeApp(firebaseConfig);
export const ImgDb = getStorage(Firebase);