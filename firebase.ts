import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChxuxYyVoFaWteG_zAs1yE_ZUga-7nmA4",
  authDomain: "dropbox-3b295.firebaseapp.com",
  projectId: "dropbox-3b295",
  storageBucket: "dropbox-3b295.appspot.com",
  messagingSenderId: "1034064140648",
  appId: "1:1034064140648:web:af2ecc2ffd5f93e1c85edd",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    db,
    storage
}