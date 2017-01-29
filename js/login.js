(function() {

  var config = {
    apiKey: "AIzaSyAob5TVDejP5x2oK7-txdJsrZ-XX-2pLxY",
    authDomain: "login-template-firebase.firebaseapp.com",
    databaseURL: "https://login-template-firebase.firebaseio.com",
    storageBucket: "login-template-firebase.appspot.com",
    messagingSenderId: "682870522204"
  };
  firebase.initializeApp(config);

  const auth = firebase.auth();

  const txtEmail = document.getElementById('email');
  const txtPass = document.getElementByName('pass');
  const btnLogin = document.getElementByName('login');

  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPass.value;

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(console.log(error));
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