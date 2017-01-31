/**
 * Project: Firebase demo application
 * Authors: codeams@gmail.com, rejonpardenilla@gmail.com
 * License: MIT.
 */


(function() {

  /* -- Configuración de la aplicación -- */

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



  /* -- Listeners de los eventos de Firebase -- */

  // Listener de configuración de la aplicación
  dbref.child( 'appConfig' ).on( 'value', function( _appConfig ) {

    // Leyendo la configuración
    var themeColor = _appConfig.child( 'themeColor' ).val();
    var font = _appConfig.child( 'font' ).val();
    var topic = _appConfig.child( 'topic' ).val();

    // Cambiando colores de la aplicación:
    $( 'header' ).css( 'backgroundColor', themeColor );
    $( '#say-cuack-form' ).css( 'border-color', themeColor );
    $( '#button-cuack' ).css( 'backgroundImage', 'url(icons/quacker.php?color='+ themeColor.replace(/#/g, '%23') +')' );

    // Cambiando la fuente:
    $( 'body' )[0].style.fontFamily = font;

    // Cambiando el texto del topic:
    $( '#topic' ).text( topic );

    $( '#input-message' ).attr( 'placeholder', 'Say cuack!' );

  });


  // Listener de cambios en la sesión de usuario
  auth.onAuthStateChanged(function( user ) {

    if ( user ) {

      $( '#button-cuack' ).on( 'click', function() {
        addMessage();
      });

    } else {
      window.location.href = 'login.html';
    }

  });


  // Listener de cambios al nodo de los mensajes
  dbref.child( 'messages' )
    .orderByChild( 'timestamp' )
    .on( 'value', function( snapshot ) {

      // Si no existe el nodo de mensajes:
      if ( ! snapshot.exists() ) {
        document
          .getElementById( 'messages-list' )
          .innerHTML = 'No hay mensajes.';

        return;
      }

      // else:
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

      $( '#messages-list' ).html( messagesHtml );

    });


  // Listener del botón de cerrar sesión
  $( '#button-logout' ).on( 'click', function() {
    auth.signOut();
  });

  $( '#input-message' ).on( 'keydown', function( event ) {
    if ( event.keyCode === 13 ) {
      addMessage();
    }
  });


  function shakeDatAss() {

    $( '#say-cuack-form' )
      .removeClass( 'shake' )
      .addClass( 'shake' );

    setTimeout(function() {
      $( '#say-cuack-form' ).removeClass( 'shake' );
    }, 1200);

  }

  function addMessage() {
    var inputMessage = $( '#input-message' );
    var buttonCuack = $( '#button-cuack' );

    var message = inputMessage.val();

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

      inputMessage.val( '' );

    }).catch(function( error ) {

      console.error( 'Error: ' + error.message );

    });
  }

})();
