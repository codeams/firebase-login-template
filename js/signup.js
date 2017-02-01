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

  const txtFName = document.getElementById('fname');
  const txtLName = document.getElementById('lname');
  const txtEmail = document.getElementById('email');
  const txtPassword = document.getElementById('password');
  const btnSignup = document.getElementById('signup-button');

  function signUp() {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const name = txtFName.value + " " + txtLName.value;
    if (name.length < 3) {
      shake();
      return;
    }

    auth
      .createUserWithEmailAndPassword( email, password )
      .then(function() {

        auth.currentUser.updateProfile({
          displayName: name
        }).then(function() {
          window.location.href = 'app.html';
        }).catch(function( error ) {
          console.log( error.message );
        });

      }).catch(function( error ) {
        shake();
        console.log( error.message );
      });
  }



  btnSignup.addEventListener('click', function( event ) {
    signUp();
  });

  txtPassword.addEventListener( 'keydown', function( event ) {
    if ( event.keyCode === 13 ) {
      signUp();
    }
  });


  function shake() {
    const loginCard = document.getElementsByTagName('div')[0];

    loginCard.className = "login-card";
    loginCard.className = "login-card shake";

    setTimeout(function(){
      loginCard.className = "login-card";
    }, 1200);

  }

}());
