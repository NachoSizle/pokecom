<?php
  
  	class ContentArticulo {
	   	public $id;
	   	public $hastag;
	   	public $bodyText;
  	}

  	require('../Php/connectToBBDD.php');

  	$result = mysql_query("SELECT * FROM contentNews", $link);

	$rawdata = array(); //creamos un array
 
	//guardamos en un array multidimensional todos los datos de la consulta
	$i = 0;
	$numRowsRes = mysql_num_rows($result);

	if($numRowsRes > 0){
		while($aux = mysql_fetch_row($result)) 
		{
			$auxArticulo = new ContentArticulo();
		  	$auxArticulo->id = $aux[0];
		  	$auxArticulo->hastag = $aux[1];
		  	$auxArticulo->bodyText = $aux[2];

	  		$rawdata[$i] = $auxArticulo;

		    $i++;
		    //echo json_encode($aux); 
		}
	} else {
		echo 'No se ha conseguido ningun registro';
	}
  echo json_encode($rawdata); 
  mysql_close($link);
?> 