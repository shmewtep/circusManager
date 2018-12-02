/*const auth = firebase.auth();

const linkLogout = document.getElementById('linkLogout');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user logged in");
        //document.location.href = 'home.html';
    } else {
      //document.location.href = 'index.html';
    }
  });

linkLogout.addEventListener('click', e=> {
    console.log("logout triggered");
    const promise = auth.signOut()
        promise.catch(e => console.log(e.message));
    if (!firebase.auth().currentUser) {
        console.log("no user, kicking to index page");
        document.location.href = 'index.html';
    }
})*/