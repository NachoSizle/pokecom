<?php
  
  	class Autor {
	   	public $id;
	   	public $name;
   		public $description;
  	}

  	require('../Php/connectToBBDD.php');

  	$result = mysql_query("SELECT * FROM Authors", $link);

	$rawdata = array(); //creamos un array
 
	//guardamos en un array multidimensional todos los datos de la consulta
	$i = 0;
	$numRowsRes = mysql_num_rows($result);

	if($numRowsRes > 0){
		while($aux = mysql_fetch_row($result)) 
		{
			$auxAutor = new Autor();

		  	$auxAutor->id = $aux[0];
		  	$auxAutor->name = $aux[1];
		  	$auxAutor->description = $aux[2];

	  		$rawdata[$i] = $auxAutor;

		    $i++;
		    //echo json_encode($aux); 
		}
	} else {
		echo 'No se ha conseguido ningun registro';
	}

  echo json_encode($rawdata); 
  mysql_close($link);
?> 