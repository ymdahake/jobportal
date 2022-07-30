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
  //Below is the app registration configuration of Yogesh firebase
  // apiKey: "AIzaSyABThgZ2I22K4-J69-l0rhshyFynXxgTEI",
  // authDomain: "jobportal-8b13d.firebaseapp.com",
  // projectId: "jobportal-8b13d",
  // storageBucket: "jobportal-8b13d.appspot.com",
  // messagingSenderId: "87085176023",
  // appId: "1:87085176023:web:1c4e513184b4b479228c92",

  //Below is the app registraction congfigruation of Amit
  apiKey: "AIzaSyCpP0HVu_tEbtdGx19BckAliZzVSar9JLE",
  authDomain: "jobportal-2a30b.firebaseapp.com",
  projectId: "jobportal-2a30b",
  storageBucket: "jobportal-2a30b.appspot.com",
  messagingSenderId: "797108216179",
  appId: "1:797108216179:web:042dc18b4ce844224ae506"
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