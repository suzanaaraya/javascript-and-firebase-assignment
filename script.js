
document.addEventListener('DOMContentLoaded', function() {
 
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
    const btnSignout = document.getElementById("btn-signout");
   
    
    btnSignup?.addEventListener("click",(event)=>{
      event.preventDefault()
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let userName = document.getElementById("name").value;
        let userDob = document.getElementById("dob").value;
    //sign up user
        auth.createUserWithEmailAndPassword(email,password)
        .then(userCredential=>{ 
        return database.ref('users/' +  userCredential.user.uid ).set({
             name: userName,
             dob: userDob

        });
      })
        .then(()=>{
          console.log('User signed up data stored successfully');
          document.getElementById("name").value ="";
          document.getElementById("dob").value = "";
          document.getElementById("email").value ="";
          document.getElementById("password").value = "";
          
          window.location.href = 'response.html';
          
        
        })
        .catch(error => {
          console.error("Error signing up and storing data:", error.message);
        });
        
      }); 
        
    btnSignin?.addEventListener("click", (e)=>{
        e.preventDefault()
        const email =document.getElementById("email-login").value;
        const password =document.getElementById("password-login").value;
        // signin user
        auth.signInWithEmailAndPassword(email, password).then((userCredential)=>{
              window.location.href = 'response.html';
              document.getElementById("name").value ="";
              document.getElementById("dob").value = "";
              document.getElementById("email").value ="";
              document.getElementById("password").value = "";

            })
            .catch((error)=>{
            console.error("Login error:",error)
        });

      });

      auth.onAuthStateChanged(user => {
        
        if (user) {
            
            database.ref('users/' + user.uid).once('value').then(snapshot => {
            const userInfo = snapshot.val();
                
            if(userInfo){
              
              displayBirthdayMessage(userInfo.dob, userInfo.name);
            } 
            });
        } else {
            console.log('User is signed out.');
            
            if (window.location.pathname !== '/index.html') {
              window.location.href = 'index.html';
          }
        }
    });
    
    

    function displayBirthdayMessage(dob, name) {
      const element = document.getElementById('birthday-message');
    
      const today = new Date();
      today.setHours(0, 0, 0, 0);
    
      const birthDate = new Date(dob);
      
      console.log(dob);
      birthDate.setHours(0, 0, 0, 0);
      console.log(birthDate)
      
      const todayDateOnly = new Date(today.getFullYear(), today.getMonth() , today.getDate());
      const currentYearBirthday = new Date(today.getFullYear(), birthDate.getMonth() , birthDate.getDate());
  
      if (todayDateOnly.getTime() === currentYearBirthday.getTime()) {
          
          fetch('https://api.adviceslip.com/advice')
              .then(response => response.json())
              .then(data => {
                
                  const advice = data.slip.advice; 
                  element.innerHTML = `Happy Birthday, ${name}!<br>"${advice}"`; 
              })
              .catch(error => {
                  console.error('Error fetching quotes:', error);
                  element.innerText = `Happy Birthday, ${name}!`;
              });
      } else {
          if (currentYearBirthday < todayDateOnly) {
              currentYearBirthday.setFullYear(currentYearBirthday.getFullYear() + 1);
          }
          const daysUntilBirthday = Math.ceil((currentYearBirthday - todayDateOnly) / (1000 * 60 * 60 * 24));
          element.innerText = `${daysUntilBirthday} days until your birthday, ${name.toUpperCase()}!`;
      }
  }
  
  
    btnSignout?.addEventListener("click",()=>{
      auth.signOut().then(()=>{
          console.log('user signed out')
          window.location.href ="index.html"
          alert('You are loging out!')
      }).catch((error)=>{
          console.log("signing out error:", error)
      })
     
    })
    
  



    
     


  








});


