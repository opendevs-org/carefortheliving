import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import firebase from "firebase";

const provider = new firebase.auth.GoogleAuthProvider();

////////////////////////
// Update the Firebase Credentials below
const config = {
  apiKey: "AIzaSyAD4x1JRK-yzlTnFlZBP8QkYb-gh7lZp_s",
  authDomain: "care4living-f25bd.firebaseapp.com",
  databaseURL: "https://care4living-f25bd-default-rtdb.firebaseio.com/",
  projectId: "care4living-f25bd",
  storageBucket: "care4living-f25bd.appspot.com",
  messagingSenderId: 735333476786,
  appId: "1:735333476786:web:f16111d742874ca7679cab",
};
//////////////////////////

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  logout() {
    return this.auth.signOut();
  }

  userProfile(firstname, lastname) {
    let name = firstname.concat(" ", lastname);
    if (!this.auth.currentUser) {
      return alert("User Not Authorised!");
    }
    return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
      name: name,
      email: this.auth.currentUser.email,
      id: this.auth.currentUser.uid,
      currency: "₹",
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getAuthStatus() {
    if (this.auth.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  setCurrency(currency) {
    if (!this.getAuthStatus()) {
      return alert("User Not Authorised");
    }
    return this.db.doc(`users/${this.auth.currentUser.uid}`).update({
      currency: currency,
    });
  }

  signInWithGoogle = async () => {
    return await this.auth.signInWithPopup(provider);
  };
}

export default new Firebase();
