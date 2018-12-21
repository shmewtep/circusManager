/*
*
*   Kelsey Rook & Caleb Whitman
*   Circus Project
*   Software Engineering
*   Andrews University
*   12/12/2018
*
*   circusManagerHome.js
*
*/

//initializing firebase primary consts
const auth = firebase.auth();
const db = firebase.database();

//connecting to fields in html files
const txtUsername = document.getElementById('welcomeText');

//connecting to buttons in html files
const linkLogout = document.getElementById('linkLogout');
const btnShows = document.getElementById('btnShows');
const btnFeedback = document.getElementById('btnFeedback');
const btnPayroll = document.getElementById('btnPayroll');
const btnEditShows = document.getElementById('btnEditShows');

//confirm user is logged in and has appropriate user type
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user logged in");
        // Display user's name by logout button
        user = auth.currentUser;
        uid = user.uid;
        
        db.ref('users/' + uid)

        const refObject = db.ref().child('users').child(uid);

        var userType;

        //display welcome message by user type
        refObject.on('value', function(snapshot) {
            console.log(snapshot.val());
            userType = snapshot.val().role;
            console.log(userType);
            console.log(snapshot.val().firstName);
            if (userType == 'employee') {
                btnPayroll.style.display = 'block';
                txtUsername.innerHTML = 'Welcome, employee ' + snapshot.val().firstName; 
            } else if (userType == 'admin') {
                btnPayroll.style.display = 'block';
                btnEditShows.style.display = 'block';
                txtUsername.innerHTML = 'Welcome, administrator ' + snapshot.val().firstName;
            } else {
                txtUsername.innerHTML = 'Welcome, ' + snapshot.val().firstName;
            }
        }, function (error) {
            console.log("The read failed: ", error.code);
        });

        
    } else {
      document.location.href = 'index.html';
    }
  });

linkLogout.addEventListener('click', e=> {
    console.log("logout triggered");
    const promise = auth.signOut()
        promise.catch(e => console.log(e.message));
    if (!firebase.auth().currentUser) {
        console.log("no user, kicking to index page");
    }
});

btnShows.addEventListener('click', e=> {
    document.location.href = 'shows.html';
})

btnFeedback.addEventListener('click', e=> {
    document.location.href = 'feedback.html';
})


btnPayroll.addEventListener('click', e=> {
    document.location.href = 'payroll.html';
})

btnEditShows.addEventListener('click', e=> {
    document.location.href = 'showsmaker.html';
})