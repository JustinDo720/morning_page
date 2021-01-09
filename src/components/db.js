import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_authDomain,
  databaseURL: process.env.VUE_APP_FB_databaseURL,
  projectId: process.env.VUE_APP_FB_projectId,
  storageBucket: process.env.VUE_APP_FB_storageBucket,
  messagingSenderId: process.env.VUE_APP_FB_messagingSenderId,
  appId: process.env.VUE_APP_FB_appId,
  measurementId: process.env.VUE_APP_FB_measurementId
};

// Initalize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
