
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

    const btnSignup = document.getElementById("btn-signup");
    const btnSignin = document.getElementById("btn-signin");

    btnSignup?.addEventListener("click",(event)=>{
      event.preventDefault()
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
    //sign up user
        auth.createUserWithEmailAndPassword(email,password)
        .then(userCredential=>{ 
      
        console.log("User signed up:", userCredential.user)
        
        let userName = document.getElementById("name").value;
        let userDob = document.getElementById("dob").value;
        let userRef = firebase.database().ref('users/');
        userRef.set({
          name: userName,
          dateOfBirth: userDob

        }).then(()=>{
          console.log('User data stored successfully');
          window.location.href = 'response.html';
        }).catch(error => {
          console.error("Error storing user data:", error.message);
      })
        .catch(error=>{
        console.error("Error signing up:", error.message);
        });
        document.getElementById("name").value ="";
        document.getElementById("dob").value = null;
        document.getElementById("email").value ="";
        document.getElementById("password").value = null;
        
        
       
       });
    
      

    });

     
   
    btnSignin?.addEventListener("click", (e)=>{
        e.preventDefault()
        const email =document.getElementById("email_login").value;
        const password =document.getElementById("password_login").value;
        // signin user
        auth.signInWithEmailAndPassword(email, password).then((userCredential)=>{
            console.log("User logged in:",userCredential)
            
            window.location.href ='nav.html';
            

        }).catch((error)=>{
            console.error("Login error:",error)
        })

      });


    
  



    
     


  








// });


