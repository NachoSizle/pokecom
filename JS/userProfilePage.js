var userName = '',
    sizeDivImgProfile = 0;

$(window).load(function() {
  $('#pkBallLoader').fadeOut('slow');
  $('body').css('overflow','visible');
  ppalesActions();
});

function ppalesActions(){
  console.log("OLIKI");
  $('body').css('background-color','#c6ffd2');
  //APLICAMOS UN ESTILO DIFERENTE AL FOOTER
  $('.page-footer').css('background-color','#c6ffd2');
  $('.page-footer').css('position','absolute');
  $('.page-footer').css('bottom','0px');
  $('.page-footer').css('width','100%');

  $('#footerContact').css('margin-bottom','0px');
  //ELIMINAMOS LA IMAGEN DE LOADER
  $('#pkBallLoader').remove();
  //INICIALIZAMOS EL MENU DE LA IZQUIERDA
  $(".button-collapse").sideNav({
    closeOnClick: false
  });

  $('.brand-logo').css('color','#ffd54f');

  //SACAMOS EL NOMBRE DE USUARIO DE POR EL QUE ENTRA, PARA PODER CARGAR LA PAGINA DE PERFIL CORRECTA
  userName = extraerParametroUrl('userName');
  
  if(userName != ''){
    //INICIALIZAMOS EL EFECTO REBOTE
    Materialize.showStaggeredList('#menuDesktopVersion');
    
    //CARGAMOS LA IMAGEN DE PERFIL Y SUS DATOS
    setProfile();
    
    //CARGAMOS LA DESCRIPCION DEL PERFIL
    setDescriptionProfile();
  }
};

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
      case 4:
        break;
    }
  };

//FUNCION QUE CARGA EL PERFIL Y SUS DATOS
function setProfile(){
  var newWidth = 60,
      height = $('#containerImgProfile').height(),
      diffWidth = 0,
      userNameMod = '';
      
  //AÑADIMOS EL DIV CON LAS PUBLICACIONES, SEGUIDORES Y SEGUIDOS
  $('#containerSegPubli').append("<div class='row nameContSegPubli'><div class='col s4 center-align'><b>Seguidores</b></div><div class='col s4 center-align'><b>Artículos</b></div><div class='col s4 center-align'><b>Seguidos</b></div></div>");
  $('#containerSegPubli').append("<div class='row valueContSegPubli'><div class='col s4 center-align'>200</div><div class='col s4 center-align'>500</div><div class='col s4 center-align'>200</div></div>");
  
  $('#containerSegPubli').css('margin-top','15px');
  $('#containerSegPubli').css('margin-bottom','0px');
  $('.nameContSegPubli').css('font-size','20px');
  $('.nameContSegPubli').css('font-family','Lobster');
  $('.nameContSegPubli').css('margin-bottom','0px');
  $('.nameContSegPubli').css('color', '#00796b');
  
  $('.valueContSegPubli').css('margin-bottom','10px');
  $('.valueContSegPubli').css('font-family','Lobster');
  $('.valueContSegPubli').css('color', '#00796b');
  
  userNameMod = userName.toLowerCase();

  $('#containerImgProfile').append("<img id=userNameImg class='responsive-img circle' src='../Images/"+ userNameMod + ".png'> <p class='center-align'>" + userName + "</p>");
  $('#containerImgProfile p').css('font-family', 'Lobster');
  $('#containerImgProfile p').css('font-size', '30px');
  $('#containerImgProfile p').css('color', '#00796b');
  $('#containerImgProfile p').css('margin-bottom', '5px');
  
  //AJUSTAMOS EL TAMAÑO DE LA IMAGEN DE ACORDE CON EL TAMAÑO DE VENTANA
  $('#containerImgProfile').css('width', '100%');
  sizeDivImgProfile = $('#containerImgProfile').width();
  
  newWidth = Math.round((newWidth * sizeDivImgProfile) / 100);
        
  $('#userNameImg').css({
    width : newWidth + 'px',
    height : newWidth + 'px'
  });
  
  diffWidth = (sizeDivImgProfile - newWidth) / 2;
  
  $('#userNameImg').css('margin-left', diffWidth + 'px');
  //$('#profileImg').css('margin-top', diffWidth + 'px');

  $('#userNameImg').css('border','2.5px solid #00897b');
  $('#userNameImg').css('border-radius','150px');
}

//FUNCION QUE CARGA LA DESCRIPCION DEL PERFIL
function setDescriptionProfile(){
  //SE TENDRÁ QUE OBTENER LA DESCRIPCION DEL PERFIL DEL USUARIO DE LA BBDD
  //DE MOMENTO, A MODO DE PRUEBA, PONEMOS UN TEXTO PREDEFINIDO
  var descUserProfile = "Cada día hay algo que menos me molesta en la vida.</br> Vivo mas de noche que de día.";
  
  $('#containerDescriptionProfile').append("<blockquote class='center-align'>" + descUserProfile + "</blockquote>");
  $('#containerDescriptionProfile blockquote').css('color', '#00695c');
  $('#containerDescriptionProfile blockquote').css('border-left', '0px');
  $('#containerDescriptionProfile blockquote').css('padding-left', '10px');
  $('#containerDescriptionProfile blockquote').css('padding-right', '10px');
  $('#containerDescriptionProfile blockquote').css('margin-top', '0px');
  $('#containerDescriptionProfile blockquote').css('font-size', '20px');
}