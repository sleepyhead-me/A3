// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtCSFfTvu1peSJvU2mt2di29C4dlCRmLA",
    authDomain: "notebook-021.firebaseapp.com",
    projectId: "notebook-021",
    storageBucket: "notebook-021.appspot.com",
    messagingSenderId: "698880291664",
    appId: "1:698880291664:web:2df8500cc801fb856c3255",
    measurementId: "G-TSYHPTNMME"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
