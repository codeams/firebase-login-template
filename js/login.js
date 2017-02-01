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

  const txtEmail = document.getElementById( 'email' );
  const txtPassword = document.getElementById( 'password' );
  const btnLogin = document.getElementById( 'login-button' );

  function signIn() {
    const email = txtEmail.value;
    const password = txtPassword.value;

    auth
    .signInWithEmailAndPassword( email, password )
    .catch(function( error ) {
      shake();
      console.log( error.message );
    });
  }

  btnLogin.addEventListener('click', function( event ) {
    signIn();
  });

  txtPassword.addEventListener( 'keydown', function( event ) {
    if ( event.keyCode === 13 ) {

      const email = txtEmail.value;
      const password = txtPassword.value;

      signIn();
    }
  });


  auth.onAuthStateChanged(function( user ) {
    if ( user ) {
      window.location.href = 'app.html';
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
