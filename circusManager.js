/*
*
*   Kelsey Rook & Caleb Whitman
*   Circus Project
*   Software Engineering
*   Andrews University
*   12/12/2018
*
*   circusManager.js
*
*/

//initialize firebase primary consts

const auth = firebase.auth();
const db = firebase.database();

//import * as cors from 'cors';
//const corsHandler = cors({origin:true});

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnSignin = document.getElementById("btnSignin");
const linkSignup = document.getElementById("linkSignup");
const linkLogin = document.getElementById("login");
const loginBox = document.getElementById("loginBox");
const btnLoginExit = document.getElementById('btnLoginExit');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const btnSignupSubmit = document.getElementById('btnSignupSubmit');
const txtFirstName = document.getElementById('txtFirstName');
const txtLastName = document.getElementById('txtLastName');
const txtPasswordConfirm = document.getElementById('txtPasswordConfirm');
const txtEmailSignup = document.getElementById("txtEmailSignup");
const txtPasswordSignup = document.getElementById("txtPasswordSignup");
const txtUsername = document.getElementById('welcomeText');

//================================================Login scripts================================================

//Confirm login state
user = auth.currentUser;
console.log("user: ", user);
if (user) {
    console.log("user: ", user);
    document.location.href = 'home.html';
}

//Button to open sign in window
linkLogin.addEventListener('click', e => {
    console.log('clicked');
    loginBox.style.display = 'block';
})

//Button to sign in (confirms email & pass)
btnSignin.addEventListener('click', e => {
    console.log("login triggered");
    const email = txtEmail.value;
    console.log(email);
    const pass = txtPassword.value;
    // Sign in
    //const promise = auth.signInWithEmailAndPassword(email, pass);
    //promise.catch(e => console.log(e.message));
    
    auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert("Error : " + errorMessage);
    }).then(function() {
        document.location.href = 'home.html';
    });
});

//Exit the sign in form
btnLoginExit.addEventListener('click', e => {
    signupForm.style.display= 'none';
    loginForm.style.display = 'block';
    loginBox.style.display = 'none';
    loginBox.style.height = '420px';
});

//Redirect users that have logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user logged in");
        //document.location.href = 'home.html';
        console.log("directed to home");
    } else {
      //document.location.href = 'index.html';
    }
  });

//===================================================Sign up scripts============================================

//Button to open sign up form
linkSignup.addEventListener('click', e => {
    console.log('signup page');
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    loginBox.style.height = '540px';
});

//Button to submit signup information
btnSignupSubmit.addEventListener('click', e => {
    var firstName_ = txtFirstName.value;
    var lastName_ = txtLastName.value;
    var email_ = txtEmailSignup.value;
    var password = txtPasswordSignup.value;
    var passwordConfirm = txtPasswordConfirm.value;
    if (password != passwordConfirm) {
        //password and confirm password from sign up form are not the same.
        alert("Passwords do not match.");
    }
    else {
        //creating new user account
        //unique ID
        var uid;
       
        auth.createUserWithEmailAndPassword(email_, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        }).then(function(user) {
            user = auth.currentUser;
            uid = user.uid;
            //Putting user information in database under a unique id under "users"
            db.ref('users/' + uid).set({
                firstName: firstName_,
                lastName: lastName_,
                email: email_,
                //user type
                role: 'customer' 
            }).then(function() {
                //returns user to login
                alert("Please log in with your new account credentials.");
                
                //closes the signup and login forms
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
                loginBox.style.height='420px';

            }).catch(function(error) {
                //couldnt add user to database
                console.error("Error adding document: ", error);
            });
        });

    }
});

