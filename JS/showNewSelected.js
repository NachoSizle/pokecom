var arrayObjectForNews = new Array();
var totalNews = 0;

$(window).load(function() {
  $('#pkBallLoader').fadeOut('slow');
  $('body').css('overflow','visible');
  ppalesActions();
});

function ppalesActions(){
  //ELIMINAMOS LA IMAGEN DE LOADER
  $('#pkBallLoader').remove();
  //ESCONDEMOS EL SHARECONTAINER
  $('#shareContainer').hide();
  $('body').css('background-color','#ffebee');
  $('.brand-logo').css('color','#ffd54f');

  //INICIALIZAMOS EL MENU DE LA IZQUIERDA
  $(".button-collapse").sideNav();

  //FUNCION QUE OBTIENE LOS DATOS DE LAS NOTICIAS EN LA BBDD
  getAllNewsFromServer();

  //INICIALIZAMOS EL EFECTO REBOTE
  Materialize.showStaggeredList('#menuDesktopVersion');
  //INICIALIZAMOS EL SLIDER
  $('.slider').slider({full_width: false});
  //FUNCION QUE MUESTRA LAS NOTICIAS RELACIONADAS CON LA NOTICIA QUE ACTUALMENTE SE VE
  //showRelNews();
};


//FUNCION QUE RECOGE EL PARAMETRO DE LA URL Y MUESTRA LA NOTICIA DESDE LA QUE SE LLAMO A ESTA PAGINA
function showNewToMainContainer(){
  var paramId = extraerParametroUrl('idNew'),
      titleCab = extraerParametroUrl('title'),
      bodyNew;

  titleCab = decodeURI(titleCab);
  //VAMOS A OBTENER LOS DATOS DEL SERVIDOR
  //LOS OBTENEMOS CON EL METODO getAllNewsFromServer() LLAMADO EN ppalesActions
  //UNA VEZ OBTENIDOS, VAMOS A CREAR LA NOTICIA PARA MOSTRARLA COMO HACÍAMOS DE MANERA ESTATICA

  if(paramId > arrayObjectForNews.length - 1 ){
      titleCab = "Noticia no encontrada";
      bodyNew = "Noticia no encontrada";

      $('#newsContainer').empty();

      $('#newsContainer').addClass("center-align");
      $('#newsContainer').css('font-family','Pattaya');
      $('#newsContainer').css('color','#757575');
      $('#newsContainer').css('font-size','80px');
      
  } else {

    bodyNew = arrayObjectForNews[paramId].bodyText;

    //IMAGENES DE TITULO
    //$('#newsContainer').append("<div class='slider'><ul class='slides'><li><img class='responsive-img' src='../Images/pokevision.png'></li></ul></div>");
    $('#newsContainer').append("<div class='center-align'><img class='responsive-img' src='../Images/News" + paramId + "/title.png'></div>");
    $('#newsContainer').append("Fuente: PokeCom");
    
    //TITULO
    $('#newsContainer').append("<h3 class='flow-text'>" + titleCab + "</h3>");
    
    //METEMOS UNA IDENTIFICACION DEL AUTOR DE LA NOTICIA
    //PONEMOS UN EVENTO QUE CUANDO SE PULSE EN EL AUTHOR SE REDIRECCIONE A LA PÁGINA DE PERFIL
    $('#newsContainer').append("<div class='chip' onclick='redirec(4)'><img src='../Images/nachosizle.png' alt='Contact Person'>NachoSizle</div>");

    //ASI COMO UNOS TAGS IDENTIFICATIVOS DE LA NOTICIA
    $('#newsContainer').append("<div class='chip'>Madrid, Spain</div>");
    $('#newsContainer').append("<div class='chip'>Pokemon GO</div>");
    //Y UNA LINEA SEPARADORA DE SECCIONES
    $('#newsContainer').append("<hr>");

    //CAMBIAMOS EL TITULO DE LA PAGINA 
    document.title = 'PokeCom - ' + titleCab;
    //MOSTRAMOS EL SHARECONTAINER
    $('#shareContainer').show();

  }
    
  //CUERPO DE LA NOTICIA
  $('#newsContainer').append(bodyNew);
}

//FUNCION QUE GESTIONA EL EVENTO DE COMPARTIR DE TWITTER
!function (d,s,id){
  var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
  if(!d.getElementById(id)){
    js=d.createElement(s);
    js.id=id;
    js.src=p+'://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js,fjs);
  }
}(document, 'script', 'twitter-wjs');

//FUNCION QUE MUESTRA LAS NOTICIAS RELACIONADAS CON LA NOTICIA QUE ACTUALMENTE SE VE
function showRelNews(){
  $('#mainContainer').append("<div id='relNewsContainer'><hr><h4>Noticias Relacionadas</h4><hr></div>");
  $('#relNewsContainer h4').css('font-family','Pattaya');
  $('#relNewsContainer h4').addClass('center-align');
  $('#relNewsContainer h4').css('color','#757575');
  
  //ESTA VARIABLE DE ID SALDRA DE LA BBDD
  for(var idNew = 1; idNew < 4; idNew++){
    $('#relNewsContainer').append("<div id='" + idNew + "' class='col s12'><div class='card horizontal'><div class='col s4 card-imag'><img class='responsive-img imgHorCard' src='../Images/" + arrayPhotosAvailable[idNew] + ".png'></div><div class='col s8 card-stacked'><div class='card-content'><p>News Title and Info.</p></div><div class='card-action'><a onclick='viewThisNew(" + idNew + ")'>Link to the News</a><footer>Author | Location</footer></div></div></div></div>");
  }
  
  //FUNCION QUE SETEA EL ESTILO DE LAS HORIZONTAL CARDS
  setStyleHorCard();
}

//FUNCION QUE SETEA EL ESTILO DE LAS HORIZONTAL CARDS
function setStyleHorCard(){
  $('.imgHorCard').css('width', '120px');
  $('.card-action').css('text-transform', 'none');
  $('.imgHorCard').css('padding-top','5px');
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
	      case 3: location.href = "../subHtml/showAllAuthors.html";
        break;
	      case 4: {
        location.href ="../subHtml/userProfilePage.html?userName=NachoSizle";
        break;
      }
	  }
};

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

//FUNCION QUE DEVUELVE AL USUARIO A LA PARTE DE ARRIBA DE LA PAGINA (PPIO)
function backToInitPage(){
  $('html,body').animate({
    scrollTop: $(".nav-wrapper").offset().top
  }, 1250);  
}

//FUNCION QUE OBTIENE LOS DATOS DE LAS NOTICIAS EN LA BBDD
function getAllNewsFromServer(){
  
  $.ajax({
          url:   '../Php/getContentNewsFromServer.php',
          type:  'post',
          datatype: 'json',
          success:  function (response) {

            var jsonData = JSON.parse(response);

            //ACTUALIZAMOS EL NUMERO DE NOTICIAS TOTALES
            totalNews = jsonData.length;

            for (var i = 0; i < totalNews; i++){

              var aux = new Object();
              aux.id = jsonData[i].id;
              aux.hastagsNews = jsonData[i].hastag;
              aux.bodyText = jsonData[i].bodyText;
              arrayObjectForNews.push(aux);
            }
            //FUNCION QUE MUESTRA LA NEW SELECTED
            showNewToMainContainer();
          },
          error: function (obj, error, objError){
              //avisar que ocurrió un error
              console.log("ha ocurrido un error: ");
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