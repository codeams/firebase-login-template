(function() {

  var config = {
    apiKey: "AIzaSyAob5TVDejP5x2oK7-txdJsrZ-XX-2pLxY",
    authDomain: "login-template-firebase.firebaseapp.com",
    databaseURL: "https://login-template-firebase.firebaseio.com",
    storageBucket: "login-template-firebase.appspot.com",
    messagingSenderId: "682870522204"
  };

  firebase.initializeApp( config );
  const auth = firebase.auth();

  auth.onAuthStateChanged(function( user ) {
    if ( user ) {
      window.location.href = 'done.html';
    }
  });

  const txtEmail = document.getElementById( 'email' );
  const txtPassword = document.getElementById( 'password' );
  const btnLogin = document.getElementById( 'login-button' );

  btnLogin.addEventListener('click', function( event ) {

    const email = txtEmail.value;
    const password = txtPassword.value;

    const promise = auth.signInWithEmailAndPassword( email, password ).then(function() {
      window.location.href = 'done.html';
    });

    promise.catch(function( error ) {
      console.log( error.message );
    });

  });








  // User getters:

  function getName() {
    var user = auth.currentUser;

    if (user != null) {
      return user.displayName;
    } else {
      return null;
    }
  }

  function getEmail() {
    var user = auth.currentUser;

    if (user != null) {
      return user.email;
    } else {
      return null;
    }

  }

  function getPhotoUrl() {
    var user = auth.currentUser;

    if (user != null) {
      return user.photoUrl;
    } else {
      return null;
    }
  }

  function getUid() {
    var user = auth.currentUser;

    if (user != null) {
      return user.uid;
    } else {
      return null;
    }
  }



  //User setters:

  function setName(name) {
    var user = auth.currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      // Update successful.
    }, function(error) {
      // An error happened.
    });
  }

  /*
  function setEmail() {
    var user = auth.currentUser;

    if (user != null) {
      return user.email;
    } else {
      return null;
    }
  }
  */

  function setPhotoUrl(url) {
    var user = auth.currentUser;

    user.updateProfile({
      photoUrl: url
    }).then(function() {
      // Update successful.
    }, function(error) {
      // An error happened.
    });
  }



}());
