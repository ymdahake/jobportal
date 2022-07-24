import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABThgZ2I22K4-J69-l0rhshyFynXxgTEI",
  authDomain: "jobportal-8b13d.firebaseapp.com",
  projectId: "jobportal-8b13d",
  storageBucket: "jobportal-8b13d.appspot.com",
  messagingSenderId: "87085176023",
  appId: "1:87085176023:web:1c4e513184b4b479228c92",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: User,mobileNumber:string) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log("userSnapShot", userSnapshot);
  console.log('is user exists : ', userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email,mobileNumber, createdAt });
    } catch (error) {
      console.log("error creating user ", error);
    }
  }
  return  userDocRef;
};


export const signOutUser =async ()=>signOut(auth)

export const onAuthStateChagnedListener=(callback: NextOrObserver<User>)=>
onAuthStateChanged(auth,callback);