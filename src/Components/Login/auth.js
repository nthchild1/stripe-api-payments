import firebase from "firebase";

// Sjukdom config
const fireDevConfig = {
  apiKey: "AIzaSyARbgG1PjboPjd2riK-EUP3Gj6TXGPo-3Q",
  authDomain: "fsstripe.firebaseapp.com",
  projectId: "fsstripe",
  storageBucket: "fsstripe.appspot.com",
  messagingSenderId: "262833652821",
  appId: "1:262833652821:web:77869630b1e4f38ca300dc"
};

let app = firebase.initializeApp(fireDevConfig);

export const auth = app.auth();
