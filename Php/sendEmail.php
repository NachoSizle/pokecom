<?php
//Importamos las variables del formulario de contacto
$email = addslashes($_POST['email']);
$contentEmail = addslashes($_POST['contentEmail']);

//Preparamos el mensaje de contacto
$cabeceras = "From: $email\n" //La persona que envia el correo
 . "Reply-To: $email\n";
$asunto = "Mensaje desde PokeCom.es"; //asunto aparecera en la bandeja del servidor de correo
$email_to = "nachosizle@pokecom.es"; //cambiar por tu email
$contenido = "\n"
. "Email: $email\n"
. "Mensaje: \n$contentEmail\n"
. "\n";

//Enviamos el mensaje y comprobamos el resultado
if (mail($email_to, $asunto ,$contenido ,$cabeceras )) {
	//Si el mensaje se envía muestra una confirmación
	die("Gracias. Su mensaje se envió correctamente");
}else{
	//Si el mensaje no se envía muestra el mensaje de error
	die("Error. Intentelo mas tarde.");
	}
?>