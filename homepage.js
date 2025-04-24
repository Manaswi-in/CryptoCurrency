import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_F4AVY4dsa6oddhK0AevABWRrE6Y0QHc",
  authDomain: "user-login-a5722.firebaseapp.com",
  projectId: "user-login-a5722",
  storageBucket: "user-login-a5722.appspot.com",
  messagingSenderId: "1044536662833",
  appId: "1:1044536662833:web:d60680358384ae4ce0ae10",
  measurementId: "G-8GHXNG5ZB6"
};

{/* Initialize Firebase */}
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById('loggedUserFName').innerText = userData.firstName;
        document.getElementById('loggedUserLName').innerText = userData.lastName;
        document.getElementById('loggedUserEmail').innerText = userData.email;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  } else {
    console.log("User not signed in");
    window.location.href = "index.html"; // Redirect to login
  }
});

document.getElementById("logout").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});