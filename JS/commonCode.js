/******************************************************************************************************/
/*********************************FUNCIONES COMUNES DE JAVASCRIPT**************************************/
/******************************************************************************************************/

//FUNCION QUE SE ENCARGA DE EXTRAER EL NOMBRE DE USUARIO DE LA URL
function extraerParametroUrl( nombreParametro ){
  var regexS = "[\\?&]" + nombreParametro + "=([^&#]*)",
      regex = new RegExp ( regexS ),
      tmpURL = window.location.href,
      results = regex.exec( tmpURL );

  if( results == null ) {
    return '';
  } else {
    return results[1];
  };
}

//FUNCION QUE CREA LA ESTRUCTURA MODAL DE ENVIAR UN EMAIL DINAMICAMENTE Y LA EJECUTA
function createmodalAndLaunch(){
  var email = "",
      textToSend = "";

  $('body').append("<div id='contactModal' class='modal'><div class='modal-content'><h5>Contacta con NachoSizle</h5><form class='col s12'><div class='input-field col s12'><input id='email' type='email' name='email' class='validate'><label for='email'>¿Cual es tu email?</label></div><div class='input-field col s12'><textarea name='contentEmail' id='textArea1' class='materialize-textarea'></textarea><label for='textarea1'>¿Qué quieres decirme?</label></div></form></div><div class='modal-footer center-align'><a class='modal-action modal-close waves-effect waves-red accent-3 btn-flat'>Enviar</a></div></div>");

  $('#contactModal').openModal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    starting_top: '4%', // Starting top style attribute
    ending_top: '10%', // Ending top style attribute
    complete: function() { 
      $('#textArea1').trigger('autoresize');
      //SE COGEN LOS DATOS
      emailTo = $('#email').val();
      textToSend = $('#textArea1').val();

      if(emailTo != "" && textToSend != ""){
        //UNA VEZ SE CIERRA EL MODAL, SE PROCEDE LA PETICION AJAX PARA ENVIAR EL EMAIL
        $.ajax({
            url:   '../Php/sendEmail.php',
            type:  'post',
            data: { email : emailTo, contentEmail : textToSend },
            success:  function (response) {
              Materialize.toast(response, 3000, 'rounded');
            },
            error: function (obj, error, objError){
                //avisar que ocurrió un error
                console.log("Ha ocurrido un error: ");
                console.log(error);
            }
        });
      } else {
        Materialize.toast("Email o mensaje vacíos.", 3000, 'rounded');
        location.href = "../index.html";
      }
      //SE ELIMINA COMPLETAMENTE EL MODAL
      $('#contactModal').remove();
    }
  });
}

//FUNCION QUE DEVUELVE AL USUARIO A LA PARTE DE ARRIBA DE LA PAGINA (PPIO)
function backToInitPage(){
  $('html,body').animate({
    scrollTop: $(".nav-wrapper").offset().top
  }, 1250);  
}

