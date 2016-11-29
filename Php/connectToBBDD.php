<?php
	$dbserver = "localhost";
  	$dbuser = "pokecome_cUser";
  	$password = "nacho20";
  	$dbname = "pokecome_News";

  	$link = mysql_connect($dbserver, $dbuser, $password); 

  	mysql_select_db($dbname, $link); 
  	mysql_set_charset('utf8');
?>