const auth = firebase.auth();

//import * as cors from 'cors';
//const corsHandler = cors({origin:true});
//

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnSignin = document.getElementById("btnSignin");
const linkSignup = document.getElementById("linkSignup");
const linkLogin = document.getElementById("login");
const loginBox = document.getElementById("loginBox");
const btnLoginExit = document.getElementById('btnLoginExit');

linkLogin.addEventListener('click', e => {
    console.log('clicked');
    loginBox.style.display = 'block';
})

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
    });
});


btnLoginExit.addEventListener('click', e => {
    loginBox.style.display = 'none';
});

linkSignup.addEventListener('click', e => {
    hideByClass(hideOnSignup);
    
    // selectUserType.style.display = 'block';
    btnSubmit.style.display = 'block';
});



firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user logged in");
        document.location.href = 'home.html';
        console.log("directed to home");
    } else {
      //document.location.href = 'index.html';
    }
  });