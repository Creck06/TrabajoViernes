import firebase from "firebase/app";
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBXvdGq2eOhwaAG1x7fYUacG_38NHsDMcE",
    authDomain: "viernes-fe4de.firebaseapp.com",
    projectId: "viernes-fe4de",
    storageBucket: "viernes-fe4de.appspot.com",
    messagingSenderId: "640268765377",
    appId: "1:640268765377:web:32ffa2234a1990f9002c40"
};


firebase.initializeApp(firebaseConfig);
export{firebase}