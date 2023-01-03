import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import * as firebase from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getDatabase, update, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, Timestamp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp7jA3DrW9RCi5YFMj_fiJ-N8t-IF5M2E",
  authDomain: "wd29-a8133.firebaseapp.com",
  databaseURL: "https://wd29-a8133-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wd29-a8133",
  storageBucket: "wd29-a8133.appspot.com",
  messagingSenderId: "600682734449",
  appId: "1:600682734449:web:9a25f7ae7ae1688a5accd0",
  measurementId: "G-SB9ZFSFS82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


/*---------------------------------------------------------------- */

const signupForm = document.getElementById("signupForm");
// const onClickUserFirstName = document.getElementById("userfirstname")
const db = getDatabase();
// sign-up codes


signupForm.addEventListener("click", () => {
  console.log("register")
  const firstName = document.getElementById("userfirstName").value;
  const lastName = document.getElementById("userlastName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Maximum of 30 firstname length must not be 1 character 
  if (firstName.length >= 30 || firstName.length <= 1) {
    $("#errorName").text("First Name and Last Name must be at least 2 characters");

  }
  if (lastName.length >= 30 || lastName.length <= 1) {
    $("#errorName").text("First Name and Last Name must be at least 2 characters");

  }

  //Regular expression format para hindi makalusot mga blank at special characters sa email
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    $("#userEmail").css("border-bottom", "solid red 2px");
    $("#errorEmail").text("Invalid email address format");

  }


  if (password === confirmPassword) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const date = Timestamp.now();
        // Adding the info of the user into the database
        const user = userCredential.user;
        push(ref(db, 'Users/'), {
          firstname: firstName,
          lastName: lastName,
          email: email,
          dateCreated: date
        })
        setDoc(doc(dbFirestore, "signin", email,'InAndOut',"in"), {
          
        })
          .then(() => {

          })
          .catch((error) => {

          })
          setDoc(doc(dbFirestore, "signin", email,'InAndOut',"out"), {
          
          })
            .then(() => {
  
            })
            .catch((error) => {
  
            })
        console.log('success')

        document.getElementById("userfirstName").value = "";
        document.getElementById("userlastName").value = "";
        document.getElementById("userEmail").value = "";
        document.getElementById("userPassword").value = "";
        document.getElementById("confirmPassword").value = "";

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // ..
      });
  } else if (password.length <= 6 || password.length == 1) {
    $("#errorPassword").text("Password must at least be 6 characters");
  }
  else {
    $("#errorConfirmPassword").text("Passwords do not match");
  }


});

// log in code
const loginBtn = document.querySelector('#loginBtn');
const dbFirestore = getFirestore();

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const auth = getAuth();
  const date = new Date;



  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      updateDoc(doc(dbFirestore, "signin", email,'InAndOut',"in"), {
        [date]: 'in',
        
        // signIn: firebase.firestore.FieldValue.arrayUnion(Timestamp.now())
      })
      .then(console.log('sign in date succes'))
      .catch((error) => {
        const err = error.message;
        console.log(err + " sign in date failed")
      })
    
      
      // -------------------
      document.getElementById("loginEmail").value = "";
      document.getElementById("loginPassword").value = "";
      // document.querySelector(".hideFormBtn").style.display = "none";

      window.open('index_user.html', '_self');

      console.log('login')
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage + " di naka log in")
    });

})


