import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBh74EbvnPOkndga00m7hXcUirKx-btfXA",
  authDomain: "hotel-a186d.firebaseapp.com",
  databaseURL: "https://hotel-a186d.firebaseio.com",
  projectId: "hotel-a186d",
  storageBucket: "hotel-a186d.appspot.com",
  messagingSenderId: "262799760853",
  appId: "1:262799760853:web:00ea957570b205c2fa715c",
  measurementId: "G-WZMMESW304",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = "en_EN";
firebase.storage().ref();
const firebaseAppAuth = firebaseApp.auth();
const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope("public_profile");
provider.setCustomParameters({
  display: "popup",
});

export { provider, firebaseAppAuth, firebase };
