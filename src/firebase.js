import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDq9M7aQmo0wwtw-KiXRMys5tpY4o7kHSE",
    authDomain: "svelte-realtime-chatapp.firebaseapp.com",
    projectId: "svelte-realtime-chatapp",
    storageBucket: "svelte-realtime-chatapp.appspot.com",
    messagingSenderId: "128871405600",
    appId: "1:128871405600:web:9dd6df1ee76d9526674445"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig)

if (!firebase.getApps.length){
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();

