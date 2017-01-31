(function() {

  // Configuración copiada:
  var config = {
    apiKey: "AIzaSyAob5TVDejP5x2oK7-txdJsrZ-XX-2pLxY",
    authDomain: "login-template-firebase.firebaseapp.com",
    databaseURL: "https://login-template-firebase.firebaseio.com",
    storageBucket: "login-template-firebase.appspot.com",
    messagingSenderId: "682870522204"
  };


  // Inicializando la aplicación:
  firebase.initializeApp( config );


  // Constantes de acceso a los servicios:
  const auth = firebase.auth();
  const dbref = firebase.database().ref();


  // Cargando configuración de la aplicación
  dbref.child( 'appConfig' ).on( 'value', function( snapshot ) {

    var themeColor = snapshot.child( 'themeColor' ).val();
    var font = snapshot.child( 'font' ).val();
    var topic = snapshot.child( 'topic' ).val();

    document.getElementById( 'say-cuack-form' ).style.borderColor = themeColor;
    document.getElementById( 'button-cuack' ).style.backgroundImage = "url(icons/quacker.php?color="+ themeColor.replace(/#/g, '%23') +")";
    document.getElementsByTagName( 'header' )[0].style.backgroundColor = themeColor;
    document.getElementsByTagName( 'body' )[0].style.fontFamily = font;

    document.getElementById( 'topic' ).innerText = topic;

    document
      .getElementById( 'input-message' )
        .setAttribute( 'placeholder', 'Say cuack!' );

  });


  // Listener de firebase para cambios en
  // el estado de la sesión
  auth.onAuthStateChanged(function( user ) {

    if ( user ) {

      document.getElementById( 'button-cuack' ).addEventListener( 'click', function() {

        addMessage();

      });

    } else window.location.href = 'login.html';

  });


  // Listener de cambios al nodo de los mensajes
  dbref.child( 'messages' )
    .orderByChild( 'timestamp' )
    .on( 'value', function( snapshot ) {

      if ( ! snapshot.exists() ) {
        document
          .getElementById( 'messages-list' )
          .innerHTML = 'No hay mensajes.';

        return;
      }

      var messagesHtml = '';

      snapshot.forEach( function( message ) {

        var authorEmail = message.child( 'uemail' ).val();
        var authorName = message.child( 'uname' ).val();
        var authorId = message.child( 'uid' ).val();
        var content = message.child( 'message' ).val();

        var messageHtml =
          "<div class='message'>" +
            "<div class='authorData'>" +
              "<div class='authorName'>" + authorName + "</div>" +
              "<div class='authorEmail'>&lt;" + authorEmail + "&gt;</div>" +
            "</div>" +
            "<div class='content'>" + content + "</div>" +
          "</div>";

        messagesHtml = messageHtml + messagesHtml;

      });

      document
        .getElementById( 'messages-list' )
        .innerHTML = messagesHtml;

    });


  // Listener del botón de cerrar sesión
  document
    .getElementById( 'button-logout' )
    .addEventListener( 'click', function() {
      auth.signOut();
    });

  document
    .getElementById( 'input-message' )
    .addEventListener( 'keydown', function( event ) {
      if ( event.keyCode === 13 ) {
        addMessage();
      }
    });


  function shakeDatAss() {

    document
      .getElementById( 'say-cuack-form' )
        .className = "";

    document
      .getElementById( 'say-cuack-form' )
        .className = "shake";

    setTimeout(function() {
      document
        .getElementById( 'say-cuack-form' )
          .className = "";
    }, 1200);

  }

  function addMessage() {
    var inputMessage = document.getElementById( 'input-message' );
    var buttonCuack = document.getElementById( 'button-cuack' );

    var message = inputMessage.value;

    if ( message.length < 3 ) {
      shakeDatAss();
      return;
    } else if ( message.length > 140 ) {
      shakeDatAss();
      return;
    }

    dbref.child( 'messages' ).push().set({

      'message' : message,
      'timestamp' : + new Date(),
      'uid' : auth.currentUser.uid,
      'uname' : auth.currentUser.displayName,
      'uemail' : auth.currentUser.email

    }).then(function() {

      // Firebase usa data-binding
      // El mensaje se agregó, pero no tenemos que
      // mostrarlo aquí, eso lo hará el Listener
      // del nodo de mensajes :D

      inputMessage.value = '';

    }).catch(function( error ) {

      console.error( 'Error: ' + error.message );

    });
  }

})();
