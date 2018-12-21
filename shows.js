/*
*
*   Kelsey Rook & Caleb Whitman
*   Circus Project
*   Software Engineering
*   Andrews University
*   12/12/2018
*
*   shows.js
*
*/

const db = firebase.database();

var showDataRef = firebase.database().ref("shows").orderByKey();

showDataRef.once("value").then(function(snapshot) {

  snapshot.forEach(function(childSnapshot){

      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      var location_val = childSnapshot.val().Location;
      console.log(location_val);
      var time_val = childSnapshot.val().Time;

      $("location").append(location_val);
      $("time").append(time_val);

        testHeader.innerHTML = location_val;

      document.getElementById("location").innerHTML = location_val;
      document.getElementById("time").innerHTML = time_val;

  });

});


/*
*===============================================================Create Form========================================================
*/
//Init auth
const auth = firebase.auth();

//Links to fields and buttons in html files
const showCreateBox = document.getElementById('showCreateBox');
const createShow = document.getElementById('createShow');
const btnCreateShow = document.getElementById('btnCreateShow');
const linkLogout = document.getElementById('linkLogout');
const txtUsername = document.getElementById('welcomeText');

//Listeners to inflate/deflate create panel
btnshowcreateExit.addEventListener('click', e => {
  createshowForm.style.display= 'block';
  showCreateBox.style.display = 'none';
  showCreateBox.style.height = '420px';
});
btnCreateShow.addEventListener('click', e=> {
  createshowForm.style.display= 'block';
  showCreateBox.style.display = 'block';
})

//Listener to retrieve show information from create form on click
createShow.addEventListener('click', e => {
    var loca_tion = txtCityName.value;
    var da_te = showDate.value;
    var ti_me = showTime.value;
    var reve_nue = 0;
    var vo_tes = 0;

    //Innermost votes list
    var vot_es = {
        votes: vo_tes
    }
    //2nd innermost votes list
    var showVotes = {
        clowns: vot_es,
        contortionists: vot_es,
        "cyr wheel" : vot_es,
        elephants: vot_es,
        "fire juggling": vot_es,
        highwire: vot_es,
        "human cannonball": vot_es,
        "lion taming": vot_es,
        trapeze: vot_es
    }

    //create show in database under shows
    var constShowsRef = firebase.database().ref().child('shows');
    constShowsRef.push().set({
      location: loca_tion,
      date: da_te,
      time: ti_me,
      revenue: reve_nue,//init as 0
      acts: showVotes//outter votes list
    }).then(function() {
      alert("Show created.");//deflate creation form and box
      createshowForm.style.display = 'none';
      showCreateBox.style.display = 'none';
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
});

/*
*=============================================================Delete Form======================================================
*/

//Listener to Delete the show
btnDeleteShow.addEventListener('click', e=> {
  showsDisplay.style.display= 'block';
  showDeleteBox.style.display= 'block';
  displayShows.style.display= 'block';
})

//Listeners to inflate/deflate delete forms and boxes on click
btnshowdeleteExit.addEventListener('click', e => {
  showsDisplay.style.display= 'none';
  showDeleteBox.style.display = 'none';
  showDeleteBox.style.height = '420px';
});
btnDeleteExit.addEventListener('click', e => {
  showDetails.style.display = 'none';
  showDeleteBox.style.height = '420px';
});

//Find show to delete
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
        console.log("show clicked");
        showDetails.style.display = 'block';
        txtDate.innerHTML = 'Date: ' + day;
        txtLocation.innerHTML = 'Location: ' + location;

        //delete show
        deleteShow.addEventListener('click', e => {
          user = auth.currentUser;
          showRef = db.ref().child('shows').child(snapshot.key);
          showRef.remove();
          
          deletePane.style.display = 'none';
          confirmPane.style.display = 'block';
        })

    }

      

    displayShows.appendChild(itemDiv);
})

showsRef.on('child_removed', e => {
      var itemDiv = document.getElementById(snapshot.key + 'item');
      displayShows.removeChild(itemDiv);
})

btnshowdeleteExit.addEventListener('click', e => {
    signupForm.style.display= 'none';
    loginForm.style.display = 'none';
    showDeleteBox.style.display = 'none';
    showDeleteBox.style.height = '420px';
});

//Links to nav buttons
const btnPayroll = document.getElementById('btnPayroll');
const btnEditShows = document.getElementById('btnEditShows');

//listeners for nav buttons
btnPayroll.addEventListener('click', e=> {
    document.location.href = 'payroll.html';
})
btnEditShows.addEventListener('click', e=> {
    document.location.href = 'showsmaker.html';
})

//confirm user is logged in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      console.log("user logged in");
      // Display user's name by logout button
      user = auth.currentUser;
      uid = user.uid;
      
      db.ref('users/' + uid)

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
});

//logout button
linkLogout.addEventListener('click', e=> {
  console.log("logout triggered");
  const promise = auth.signOut()
      promise.catch(e => console.log(e.message));
  if (!firebase.auth().currentUser) {
      console.log("no user, kicking to index page");
  }
});