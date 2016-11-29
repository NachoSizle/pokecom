var arrayObjectForNews = new Array();
var totalNews = 0;
var widthDev = screen.availWidth;
var typeDev = 0;

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

  //FUNCION QUE OBTIENE LAS NOTICIAS DEL SERVIDOR
  getAllNewsFromServer();
  //FUNCION QUE MUESTRA LAS NOTICIAS MENOS RELEVANTES EN EL TL
  //showAllLessImporNews();
  
  //FUNCION QUE MUESTRA LAS NOTICIAS RELEVANTES EN EL TL
  //showAllNews();
};

//FUNCION QUE MUESTRA LAS NOTICIAS RELEVANTES EN EL TL
function showAllNews(){
  var typeN = "";

  if(typeDev === 0){
    //ESTE CASO ES CUANDO LA PAGINA SE CARGA EN UN MÓVIL
    for(var idNew = totalNews - 1; idNew >= 0; idNew--){

      if(arrayObjectForNews[idNew].typeNews === "0"){
        typeN = "medium";
      } else {
        typeN = "large";
      }

      $('#contPpal').append("<div class='col s12 m6 l6'><div id='" + arrayObjectForNews[idNew].id + "' class='card " + typeN + "'><div class='card-image'><img class='activator responsive-img' src='../Images/News" + idNew + "/title.png'></div><div class='card-content'><p class='flow-text card-title activator grey-text text-darken-4'>" + arrayObjectForNews[idNew].title + "</p><div class='card-action linkToNew'><a onclick='viewThisNew(" + arrayObjectForNews[idNew].id +")'>Seguir leyendo...</a><footer>" + arrayObjectForNews[idNew].author + " | " + arrayObjectForNews[idNew].location + "</footer></div></div></div></div>");

      typeN = "";
      /*
      $('.linkToNewDir').click( function(){
        console.log(arrayObjectForNews[idNew].id + ", " + arrayObjectForNews[idNew].title);
        viewThisNew(arrayObjectForNews[idNew].id, arrayObjectForNews[idNew].title);
      });
      */
    }

    $('.linkToNew').css('padding-left','20px');
    $('.card-title').css('font-size','20px');

  } else if(typeDev === 1){
    //ESTE CASO SE DA CUANDO SE CARGA LA PAGINA EN UNA TABLET
    $('#contPpal').append("<div class='slider'><ul class='slides'></ul></div>");

    for(var idNew = totalNews - 1; idNew >= 0; idNew--){
      $('.slides').append("<li><img src='../Images/News" + idNew + "/title.png' onclick='viewThisNew(" + arrayObjectForNews[idNew].id +")'></li>");
      
      $('.slides div').css('top','50%');
    };

    //INICIALIZAMOS EL SLIDER QUE ACABAMOS DE AÑADIR
    $('.slider').slider({
      full_width: true,
      interval: 4000
    });

  } else {
    //ESTE ULTIMO CASO ES CUANDO SE CARGA EN UN ORDENADOR O DISPOSITIVOS SUPERIORES (TV)
    $('#contPpal').append("<div class='slider'><ul class='slides'></ul></div>");

    for(var idNew = totalNews - 1; idNew >= 0; idNew--){
      $('.slides').append("<li><img src='../Images/News" + idNew + "/title.png' onclick='viewThisNew(" + arrayObjectForNews[idNew].id +")'></li>");
      
      $('.slides div').css('top','50%');
    };

    //INICIALIZAMOS EL SLIDER QUE ACABAMOS DE AÑADIR
    $('.slider').slider({
      full_width: true,
      interval: 4000
    });
  }
}

//FUNCION QUE COGE EL ID DE LA NOTICIA EN EL QUE SE HA HECHO CLICK PARA MOSTRARLA 
function viewThisNew(idNew){
  location.href = "../subHtml/showNewSelected.html?idNew=" + idNew + "&title=" + arrayObjectForNews[idNew].title;
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
	      case 3: location.href ="../subHtml/showAllAuthors.html";
	        break;
	      case 4: location.href = "../subHtml/home.html";
	        break;
	  }
};

//FUNCION QUE MUESTRA EL CONTENEDOR DE ENVIAR NOTICIA
function showContainerToSendNews(){ 
  $('#contPpal').append("<div class='col s12' id='contSendNews'><hr><h4>¿Quieres compartir una noticia en la web?</h4></div>");
  //$('#contSendNews').css('background-color','#FF1744');
}

//FUNCION QUE DEVUELVE AL USUARIO A LA PARTE DE ARRIBA DE LA PAGINA (PPIO)
function backToInitPage(){
  $('html,body').animate({
    scrollTop: $(".nav-wrapper").offset().top
  }, 1250);  
}

//FUNCION QUE OBTIENE LOS DATOS DE LAS NOTICIAS EN LA BBDD
function getAllNewsFromServer(){
	
  $.ajax({
    url:   '../Php/getNewsFromServer.php',
    type:  'post',
    datatype: 'json',
    success:  function (response) {

      var jsonData = JSON.parse(response);

      //ACTUALIZAMOS EL NUMERO DE NOTICIAS TOTALES
      totalNews = jsonData.length;

      for (var i = 0; i < totalNews; i++){

        var aux = new Object();
        aux.id = jsonData[i].id;
        aux.title = jsonData[i].title;
        aux.author = jsonData[i].author;
        aux.location = jsonData[i].location;
        aux.typeNews = jsonData[i].typeNews;

        arrayObjectForNews.push(aux);
      }

      //FUNCION QUE MUESTRA LAS NOTICIAS RELEVANTES EN EL TL
      showAllNews();

      //FUNCION QUE MUESTRA EL CONTENEDOR DE ENVIAR NOTICIA
      //showContainerToSendNews();
    },
    error: function (obj, error, objError){
        //avisar que ocurrió un error
        console.log("Ha ocurrido un error: ");
        console.log(error);
    }
  });
  
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
        Materialize.toast("Email o mensaje vacíos.", 3000, 'rounded');
        location.href = "../index.html";
      }

      //SE ELIMINA COMPLETAMENTE EL MODAL
      $('#contactModal').remove();
    }
  });
}