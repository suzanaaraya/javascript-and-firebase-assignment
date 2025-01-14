
// document.addEventListener('DOMContentLoaded', function() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDgj16hfWE9OgqGxEsHFiQUBe4w_kL4Jz0",
    authDomain: "signup-and-sign-in-page-b46f3.firebaseapp.com",
    databaseURL: "https://signup-and-sign-in-page-b46f3-default-rtdb.firebaseio.com",
    projectId: "signup-and-sign-in-page-b46f3",
    storageBucket: "signup-and-sign-in-page-b46f3.firebasestorage.app",
    messagingSenderId: "620767793114",
    appId: "1:620767793114:web:16721580b3caede2747ae3"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
     
    const auth = firebase.auth();
    const database = firebase.database();

    const btn_signup = document.getElementById("btn-signup");
    const btn_signin = document.getElementById("btn-signin");
    btn_signup.addEventListener("submit",(event)=>{
      event.preventDefault
        let email = document.getElementById("email").value();
        let password = document.getElementById("password").value();
    //sign up user
        auth.createUserWithEmailAndPassword(email,password)
        .then(userCredential=>{ 
      
        console.log("User signed up:", userCredential.user)
        })
        .catch(error=>{
        console.error("Error signing up:", error.message);
        })
    })
    

  








// });


