/*
*
*   Kelsey Rook & Caleb Whitman
*   Circus Project
*   Software Engineering
*   Andrews University
*   12/12/2018
*
*   payroll.js
*
*/

//====================================================Initialize the Database====================================================
const db = firebase.database();
const auth = firebase.auth();

//====================================================Initialize the Button and Box document references==========================
const clownsBox = document.getElementById('clownsBox');
const clowns = document.getElementById('clowns');

const contortionistsBox = document.getElementById('contortionistsBox');
const contortionists = document.getElementById('contortionists');

const cyrWheelBox = document.getElementById('cyrWheelBox');
const cyrWheel = document.getElementById('cyrWheel');

const elephantsBox = document.getElementById('elephantsBox');
const elephants = document.getElementById('elephants');

const fireJugglingBox = document.getElementById('fireJugglingBox');
const fireJuggling = document.getElementById('fireJuggling');

const highwireBox = document.getElementById('highwireBox');
const highwire = document.getElementById('highwire');

const humanCannonballBox = document.getElementById('humanCannonballBox');
const humanCannonball = document.getElementById('humanCannonball');

const lionTamingBox = document.getElementById('lionTamingBox');
const lionTaming = document.getElementById('lionTaming');

const trapezeBox = document.getElementById('trapezeBox');
const trapeze = document.getElementById('trapeze');

//===========================================================Exit Button document references========================================

const btnclownsExit = document.getElementById('btnclownsExit');
const btncontortionistsExit = document.getElementById('btncontortionistsExit');
const btncyrWheelExit = document.getElementById('btncyrWheelExit');
const btnelephantsExit = document.getElementById('btnelephantsExit');
const btnfireJugglingExit = document.getElementById('btnfireJugglingExit');
const btnhighwireExit = document.getElementById('btnhighwireExit');
const btnhumanCannonballExit = document.getElementById('btnhumanCannonballExit');
const btnlionTamingExit = document.getElementById('btnlionTamingExit');
const btntrapezeExit = document.getElementById('btntrapezeExit');


//===========================================================Box Inflaters=========================================================

clowns.addEventListener('click', e => {
  clownsBox.style.display = 'block';
  clownsBox.style.height = '420px';
});

btnclownsExit.addEventListener('click', e => {
    clownsBox.style.display = 'none';
});

contortionists.addEventListener('click', e => {
    contortionistsBox.style.display= 'block';
    contortionistsBox.style.height = '420px';
});
  
btncontortionistsExit.addEventListener('click', e => {
    contortionistsBox.style.display = 'none';
});

cyrWheel.addEventListener('click', e => {
    cyrWheelBox.style.display= 'block';
    cyrWheelBox.style.height = '420px';
});
  
btncyrWheelExit.addEventListener('click', e => {
    cyrWheelBox.style.display = 'none';
});

elephants.addEventListener('click', e => {
    elephantsBox.style.display= 'block';
    elephantsBox.style.height = '420px';
});
  
btnelephantsExit.addEventListener('click', e => {
    elephantsBox.style.display = 'none';
});

fireJuggling.addEventListener('click', e => {
    fireJugglingBox.style.display= 'block';
    fireJugglingBox.style.height = '420px';
});
  
btnfireJugglingExit.addEventListener('click', e => {
    fireJugglingBox.style.display = 'none';
});

highwire.addEventListener('click', e => {
    highwireBox.style.display= 'block';
    highwireBox.style.height = '420px';
});
  
btnhighwireExit.addEventListener('click', e => {
    highwireBox.style.display = 'none';
});

humanCannonball.addEventListener('click', e => {
    humanCannonballBox.style.display= 'block';
    humanCannonballBox.style.height = '420px';
});
  
btnhumanCannonballExit.addEventListener('click', e => {
    humanCannonballBox.style.display = 'none';
});

lionTaming.addEventListener('click', e => {
    lionTamingBox.style.display= 'block';
    lionTamingBox.style.height = '420px';
});
  
btnlionTamingExit.addEventListener('click', e => {
    lionTamingBox.style.display = 'none';
});

trapeze.addEventListener('click', e => {
    trapezeBox.style.display= 'block';
    trapezeBox.style.height = '420px';
});
  
btntrapezeExit.addEventListener('click', e => {
    trapezeBox.style.display = 'none';
});

//====================================================Getting Pre references from document========================================

const preClowns = document.getElementById('clownsPay');
const preContortionists = document.getElementById('contortionistsPay');
const preCyrWheel = document.getElementById('cyrWheelPay');
const preElephants = document.getElementById('elephantsPay');
const preFireJuggling = document.getElementById('fireJugglingPay');
const preHighwire = document.getElementById('highwirePay');
const preHumanCannonball = document.getElementById('humanCannonballPay');
const preLionTaming = document.getElementById('lionTamingPay');
const preTrapeze = document.getElementById('trapezePay');

//===============================================Create references to database locations============================================

const dbRefClowns = firebase.database().ref().child('payroll').child('clowns');
const dbRefContortionists = firebase.database().ref().child('payroll').child('contortionists');
const dbRefCyrWheel = firebase.database().ref().child('payroll').child('cyr wheel');
const dbRefElephants = firebase.database().ref().child('payroll').child('elephants');
const dbRefFireJuggling = firebase.database().ref().child('payroll').child('fire juggling');
const dbRefHighwire = firebase.database().ref().child('payroll').child('highwire');
const dbRefHumanCannonball = firebase.database().ref().child('payroll').child('human cannonball');
const dbRefLionTaming = firebase.database().ref().child('payroll').child('lion taming');
const dbRefTrapeze = firebase.database().ref().child('payroll').child('trapeze');

//==================================================Live Sync db information to page================================================

dbRefClowns.on('value', snap => {
    preClowns.innerText = snap.val().pay;
});

dbRefContortionists.on('value', snap => {
    preContortionists.innerText = snap.val().pay;
});

dbRefCyrWheel.on('value', snap => {
    preCyrWheel.innerText = snap.val().pay;
});

dbRefElephants.on('value', snap => {
    preElephants.innerText = snap.val().pay;
});

dbRefFireJuggling.on('value', snap => {
    preFireJuggling.innerText = snap.val().pay;
});

dbRefHighwire.on('value', snap => {
    preHighwire.innerText = snap.val().pay;
});

dbRefHumanCannonball.on('value', snap => {
    preHumanCannonball.innerText = snap.val().pay;
});

dbRefLionTaming.on('value', snap => {
    preLionTaming.innerText = snap.val().pay;
});

dbRefTrapeze.on('value', snap => {
    preTrapeze.innerText = snap.val().pay;
});

//Links to fields in html files
const txtUsername = document.getElementById('welcomeText');

//Links to buttons in html files
const linkLogout = document.getElementById('linkLogout');
const btnFeedback = document.getElementById('btnFeedback');
const btnPayroll = document.getElementById('btnPayroll');
const btnEditShows = document.getElementById('btnEditShows');

//Check if user is logged in
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

//logout button
linkLogout.addEventListener('click', e=> {
    console.log("logout triggered");
    const promise = auth.signOut()
        promise.catch(e => console.log(e.message));
    if (!firebase.auth().currentUser) {
        console.log("no user, kicking to index page");
    }
});

//Links to more buttons in html files
btnPayroll.addEventListener('click', e=> {
    document.location.href = 'payroll.html';
})
btnEditShows.addEventListener('click', e=> {
    document.location.href = 'showsmaker.html';
})
btnFeedback.addEventListener('click', e=> {
    document.location.href = 'feedback.html';
})

// Checks date; sees if current date equals any show dates
var today = new Date();
console.log(today);

var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

console.log(today);

db.ref().child('shows').orderByChild('date').on('child_added', function(snapshot) {
    console.log(snapshot.val().date);

    //parse through to catch past shows
    showDate = Date.parse(snapshot.val().date)

    //Init vars for paying acts
    var totalRevenue;
    var actRevenue
    
    if (showDate <= today) {

        //calculates division of revenue into pay and net profit
        totalRevenue = snapshot.val().revenue;
        actRevenue = totalRevenue / 4;
        console.log(actRevenue);
        console.log(totalRevenue);
        console.log(snapshot.key);

        location_ = snapshot.val().location;
        date_ = snapshot.val().date;

        //Ref to list of acts under shows
        actRef = db.ref().child('shows').child(snapshot.key).child('acts');

        //Orders acts from most votes to least votes (sub ordered alphabetically)
        actRef.orderByChild('votes').limitToLast(3).on('child_added', function(snapshot) {
            var act = snapshot.key;
            console.log(act);

            //Pays acts
            payrollRef = db.ref().child('payroll').child(act);
            payrollRef.set({
                'pay': actRevenue
            })
        })

        //Replaces show information with post show breakdown
        db.ref().child('shows').child(snapshot.key).set({
            'Net profit': actRevenue,
            date: date_,
            location: location_
        })
    }
})