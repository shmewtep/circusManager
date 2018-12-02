// JavaScript source code

 (function(){

// Initialize Firebase

var config = {
    apiKey: "Aaasff34eaADASDAS334444qSDASD23ASg5H",
    authDomain: "APP_NAME.firebaseapp.com",
    databaseURL: "https://APP_NAME.firebaseio.com",
    storageBucket: "APP-NAME.appspot.com",
    messagingSenderId: "51965125444878"
};

firebase.initializeApp(config);

var userDataRef = firebase.database().ref("UserData").orderByKey();

userDataRef.once("value")

  .then(function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;
      var childData = childSnapshot.val();              // childData will be the actual contents of the child

      var name_val = childSnapshot.val().Name;
      var id_val = childSnapshot.val().AssignedID;
      document.getElementById("name").innerHTML = name_val;
      document.getElementById("id").innerHTML = id_val;

  });

 });

}());