/*
*
*   Kelsey Rook & Caleb Whitman
*   Circus Project
*   Software Engineering
*   Andrews University
*   12/12/2018
*
*   form.js
*
*/

//Initialize primary firebase consts
auth = firebase.auth();
db = firebase.database();

//Link to fields in html files
const txtUsername = document.getElementById('welcomeText');

//Link to buttons in html files
const linkLogout = document.getElementById('linkLogout');
const btnPayroll = document.getElementById('btnPayroll');
const btnEditShows = document.getElementById('btnEditShows');

//Confirm that user is logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("user logged in");
        // Display user's name
        uid = user.uid;

        const refObject = db.ref().child('users').child(uid);

        var userType;

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
})

//Logout button
linkLogout.addEventListener('click', e=> {
    console.log("logout triggered");
    const promise = auth.signOut()
        promise.catch(e => console.log(e.message));
    if (!firebase.auth().currentUser) {
        console.log("no user, kicking to index page");
    }
});

//Link to more buttons in html files
const btnHome = document.getElementById('btnHome');
const btnShows = document.getElementById('btnShows');
const btnFeedback = document.getElementById('btnFeedback');

//Button Listeners
btnShows.addEventListener('click', e=> {
    document.location.href = 'shows.html';
})
btnFeedback.addEventListener('click', e=> {
    document.location.href = 'feedback.html';
})
btnHome.addEventListener('click', e=> {
    document.location.href = 'home.html';
})
btnPayroll.addEventListener('click', e=> {
    document.location.href = 'payroll.html';
})
btnEditShows.addEventListener('click', e=> {
    document.location.href = 'showsmaker.html';
})

//Link to more fields in html files
const txtCity = document.getElementById('txtCity');
const dateDate = document.getElementById('txtDate');
const txtFeedbackEmail = document.getElementById('txtFeedbackEmail');
const txtFeedbackName = document.getElementById('txtFeedbackName');
const txtComments = document.getElementById('txtComments');

//Link to yet some more buttons in html files
const btnFeedbackSubmit = document.getElementById('btnFeedbackSubmit');

//Button listener to retrieve information from feedback for un click (submission)
btnFeedbackSubmit.addEventListener('click', e => {
    var feedbackAct = document.querySelector('input[name="radioAct"]:checked').value;
    var feedbackExperience = document.querySelector('input[name="radioExperience"]:checked').value;
    var feedbackCity = txtCity.value;
    var feedbackEmail = txtFeedbackEmail.value;
    var feedbackName = txtFeedbackName.value;
    var feedbackDate = dateDate.value;
    var feedbackComments = txtComments.value;

    console.log(feedbackAct);
    console.log(feedbackExperience);
    console.log(feedbackCity);
    console.log(feedbackComments);
    console.log(feedbackDate);

    //Email Template
    var template_params = {
        name: feedbackName,
        email: feedbackEmail,
        show_city: feedbackCity,
        show_date: feedbackDate,
        show_act: feedbackAct,
        show_experience: feedbackExperience,
        show_comments: feedbackComments
    }
    
    //Send to feedback email using EmailJS
    emailjs.send('default_service', 'feedback', template_params);
    window.alert("Thank you for your feedback!");
})
