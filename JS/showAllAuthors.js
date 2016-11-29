var widthDev = screen.availWidth,
    typeDev = 0,
    arrayOfAuthors = new Array(),
    totalAuthors = 0;

$(window).load(function() {
  $('#pkBallLoader').fadeOut('slow');
  $('body').css('overflow','visible');
  ppalesActions();
});

function ppalesActions(){
  //ELIMINAMOS LA IMAGEN DE LOADER
  $('#pkBallLoader').remove();
  //INICIALIZAMOS EL MENU DE LA IZQUIERDA
  $(".button-collapse").sideNav({
    closeOnClick: false
  });

  $('.brand-logo').css('color','#ffd54f');

  if(widthDev <= 600){
    console.log("Mobile device");
    typeDev = 0;
  } else if (widthDev >= 600 && widthDev <= 992){
    console.log("Tablet Device");
    typeDev = 1;
  } else {
    console.log("Desktop Device");
    typeDev = 2;
    //INICIALIZAMOS EL EFECTO REBOTE
    Materialize.showStaggeredList('#menuDesktopVersion');
  }

  //FUNCION QUE OBTIENE LOS AUTORES EN LA BBDD
  getAllAuthorsFromServer();
};

//FUNCION QUE OBTIENE LOS AUTORES EN LA BBDD
function getAllAuthorsFromServer(){
  
  $.ajax({
    url:   '../Php/getAuthorsFromServer.php',
    type:  'post',
    datatype: 'json',
    success:  function (response) {

      var jsonData = JSON.parse(response);

      //ACTUALIZAMOS EL NUMERO DE AUTORES TOTALES
      totalAuthors = jsonData.length;

      for (var i = 0; i < totalAuthors; i++){

        var aux = new Object();
        aux.id = jsonData[i].id;
        aux.authName = jsonData[i].name;
        aux.authorDesc = jsonData[i].description;

        arrayOfAuthors.push(aux);
      }

      //FUNCION QUE MUESTRA LOS AUTORES
      showAllAuthors();
    },
    error: function (obj, error, objError){
        //avisar que ocurrió un error
        console.log("Ha ocurrido un error: ");
        console.log(error);
    }
  });
  
}

//FUNCION QUE MUESTRA LOS AUTORES
function showAllAuthors(){

  var nameAuthMod = '',
      nameAux = '',
      formToDisplayCard = true; 

  //ESTA VARIABLE DE ID SALDRA DE LA BBDD
  for(var idAuth = 0; idAuth < totalAuthors; idAuth++){

    nameAuthMod = arrayOfAuthors[idAuth].authName.toLowerCase();
    nameAux = arrayOfAuthors[idAuth].authName;

    if(formToDisplayCard){
      $('#contPpal').append("<div id='cont" + nameAuthMod + "' class='col s12 m12 l4'><div class='card horizontal'><div class='col s4 card-imag center-align'><img class='responsive-img imgHorCard' src='../Images/"+ nameAuthMod +".png'><footer>"+ arrayOfAuthors[idAuth].authName +"</footer></div><div class='col s8 card-stacked'><div class='card-content'><p class='flow-text'>"+ arrayOfAuthors[idAuth].authorDesc +"</p></div><div class='card-action'><a href='../subHtml/userProfilePage.html?userName=" +  nameAux +"'>Ir a perfil</a></div></div></div></div>");

      formToDisplayCard = false;

    } else {
      $('#contPpal').append("<div id='cont" + nameAuthMod + "' class='col s12 m4'><div class='card horizontal'><div class='col s8 card-stacked'><div class='card-content'><p class='flow-text'>"+ arrayOfAuthors[idAuth].authorDesc +"</p></div><div class='card-action'><a href='../subHtml/userProfilePage.html?userName=" +  nameAux +"'>Ir a perfil</a></div></div><div class='col s4 card-imag center-align'><img class='responsive-img imgHorCard' src='../Images/"+ nameAuthMod +".png'><footer>"+ arrayOfAuthors[idAuth].authName +"</footer></div></div></div>");

      formToDisplayCard = true;

    }
    
  }

  //FUNCION QUE SETEA EL ESTILO DE LAS HORIZONTAL CARDS
  setStyleHorCard();
}

//FUNCION QUE SETEA EL ESTILO DE LAS HORIZONTAL CARDS
function setStyleHorCard(){
  $('.imgHorCard').css('margin-top', '25px');
  $('.imgHorCard').css('margin-left', '5px');
  $('#contPpal footer').css('font-size','20px');
  $('.card-stacked p').css('font-size','17px');
  $('.card').css('background-color','#c6ffd2');
}

//FUNCIÓN PARA REDIRIGIR EN EL MENÚ DESPLEGABLE
function redirec(op){
  switch(op){
      case 1: location.href = "../index.html";
        break;
      case 2: {
        $('.button-collapse').sideNav('hide');
        createmodalAndLaunch();
        break;
      }
      case 3:
        break;
      case 4: location.href = "#";
        break;
  }
};

//FUNCION QUE DEVUELVE AL USUARIO A LA PARTE DE ARRIBA DE LA PAGINA (PPIO)
function backToInitPage(){
  $('html,body').animate({
    scrollTop: $(".nav-wrapper").offset().top
  }, 1250);  
}

//FUNCION QUE CREA LA ESTRUCTURA MODAL DINAMICAMENTE Y LA EJECUTA
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
        Materialize.toast("Email o mensaje vacíos.", 3000, 'rounded', location.href = "../index.html");
      }

      //SE ELIMINA COMPLETAMENTE EL MODAL
      $('#contactModal').remove();
    }
  });
}