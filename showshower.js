/*
*
*   Kelsey Rook & Caleb Whitman
*   Circus Project
*   Software Engineering
*   Andrews University
*   12/12/2018
*
*   showshower.js
*
*/

//Initialize primary firbase consts
const auth = firebase.auth();
const db = firebase.database();

//Links to fields and buttons in html files
const displayShows = document.getElementById('displayShows');
const showDetails = document.getElementById('showDetails');
const txtDate = document.getElementById('txtDate');
const txtLocation = document.getElementById('txtLocation');
const numTickets = document.getElementById('numTickets');
const buyTickets = document.getElementById('buyTickets');
const totalCost = document.getElementById('total');
const detailsPane = document.getElementById('detailsPane');
const confirmPane = document.getElementById('confirmPane');
const btnTicketExit = document.getElementById('btnTicketExit');
const txtUsername = document.getElementById('welcomeText');
const btnHome = document.getElementById('btnHome');
const btnShows = document.getElementById('btnShows');
const btnFeedback = document.getElementById('btnFeedback');
const actsForm = document.getElementById('actsForm');
const linkLogout = document.getElementById('linkLogout');
const btnPayroll = document.getElementById('btnPayroll');
const btnEditShows = document.getElementById('btnEditShows');

//Confirm if user is logged in
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

actsRef = db.ref().child('acts');
actsRef.on('child_added', function(snapshot) {
    act = snapshot.val();
    // Create checkbox options for each act
    var actsOption = document.createElement('input');
    actsOption.setAttribute('type', 'checkbox');
    actsOption.setAttribute('name', 'act');
    actsOption.setAttribute('value', act);
    console.log(act);

    var actId = act.toLowerCase();
    actsOption.setAttribute('id', 'checkbox' + actId);
    actsOption.setAttribute('class', 'checkbox');
     
    var actsOptionLabel = document.createElement('label');
    actsOptionLabel.innerHTML = act;
    actsOptionLabel.setAttribute('for', 'checkbox' + act);
    actsOptionLabel.setAttribute('style', 'color:lightblue');
    actsOptionLabel.setAttribute('class', 'checkboxLabel');
    actsOptionLabel.setAttribute('id', 'label' + actId);

    actsForm.appendChild(actsOption);
    actsForm.appendChild(actsOptionLabel);
    
    br = document.createElement('br');
    actsForm.appendChild(br);
});

console.log('code accesses');
var actsFormSubmit = document.createElement('actsFormSubmit');
actsFormSubmit.setAttribute('class', 'hoverButton');
actsFormSubmit.setAttribute('id', 'actsFormSubmit');
actsFormSubmit.innerHTML = 'Submit Votes';
confirmPane.appendChild(actsFormSubmit);

var showsRef = db.ref().child('shows');
showsRef.orderByChild('date').limitToFirst(6).on('child_added', function(snapshot) {
    
    itemDiv = document.createElement('div');
    itemDiv.setAttribute('class', 'listItem');
    console.log(snapshot.key);
    itemDiv.setAttribute('id', snapshot.key + 'item');
    var location = snapshot.val().location;
    console.log(snapshot.val().time);
    var day = snapshot.val().date;
    var time = snapshot.val().time;

    var pLocation = document.createElement('p');
    var pDay = document.createElement('p');
    var pTime = document.createElement('p');

    pLocation.innerHTML = location;
    pDay.innerHTML = day;
    pTime.innerHTML = time;

    itemDiv.appendChild(pLocation);
    itemDiv.appendChild(pDay);
    itemDiv.appendChild(pTime);

    itemDiv.onclick = function() {
        var show = snapshot.key;
        console.log('key: ', show);
        console.log("show clicked");
        showDetails.style.display = 'block';

        //Display date and location of show inside purchase panel
        txtDate.innerHTML = 'Date: ' + day;
        txtLocation.innerHTML = 'Location: ' + location;

        //purchase tickets panel
        buyTickets.addEventListener('click', e => {
            
            var firstName;
            var quant = numTickets.value;
            const refObject = db.ref().child('users').child(uid);

            refObject.on('value', function(snapshot) {
                console.log(snapshot.val().firstName);
                firstName = snapshot.val().firstName;
            }, function (error) {
                console.log("The read failed: ", error.code);
            });

            user = auth.currentUser;

            email = user.email;

            //Template for EmailJS email
            var template_params = {
                to_name: firstName,
                num_tickets: quant,
                user_email: email
            }
            
            detailsPane.style.display = 'none';
            confirmPane.style.display = 'block';

            showDetails.style.height = '600px';
            showDetails.style.top = '50%';

            quantTickets = numTickets.value;
            
            var oldKey = snapshot.key;

            const dbRefShowRev = firebase.database().ref().child('shows').child(snapshot.key);

            //calculate revenue and add it to the database
            dbRefShowRev.once('value', snap => {
                var oldRev = snap.val().revenue;
                var newRevenue = quantTickets * 9;
                var totalRevenue = oldRev + newRevenue;
                console.log(totalRevenue);
                showRef = showsRef.child(snapshot.key);
                showRef.update({
                    "revenue": totalRevenue             
                })
            });
        
            //Submit act voes
            actsFormSubmit.addEventListener('click', e => {
                console.log(show);
                actsRef = db.ref().child('shows').child(show).child('acts');
                // Increments act votes for each show
                actsRef.on('child_added', function(snapshot) {
                    act = snapshot.key;
                    voteNum = snapshot.val().votes;
                    voteNum = parseInt(voteNum);
                    console.log(voteNum)
                    console.log(snapshot.key);
                    console.log(act);

                    check = document.getElementById('checkbox' + act);
                    if (check.checked == true) {
                        voteNum ++;
                        console.log(snapshot.child(act));
                        actsRef.child(act).update({
                            votes: voteNum
                        });
                        console.log("votes updated");
                    }
                })

                const msgVote = document.getElementById('msgVote');
                msgVote.style.display = 'none';
                actsForm.style.display = 'none';
                const msgThanks = document.getElementById('msgThanks');
                msgThanks.style.display = 'block';
                actsFormSubmit.style.display = 'none';
            });
        })

        //exit purchase panel
        btnTicketExit.addEventListener('click', e => {
            detailsPane.style.display = 'block';
            showDetails.style.display = 'none';
            confirmPane.style.display = 'none';              
        });
    }

    displayShows.appendChild(itemDiv);
})

//Button listeners
numTickets.addEventListener('input', e => {
    quant =  numTickets.value;
    totalCost.innerHTML = "Total: $" + (quant * 9.00);
})
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