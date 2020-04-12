import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCIm6aWe5yb7lEktaAEHRoGD62ezM8tSi4",
  authDomain: "streamy-firebase.firebaseapp.com",
  databaseURL: "https://streamy-firebase.firebaseio.com",
  projectId: "streamy-firebase",
  storageBucket: "streamy-firebase.appspot.com",
  messagingSenderId: "22357601988",
  appId: "1:22357601988:web:fa13afeb84408936fd6391",
  measurementId: "G-STSVJL009V",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return null;
  }
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userRef;
};
export default firebase;
