<?php
  
  	class Articulo {
	   	public $id;
	   	public $title;
   		public $author;
   		public $location;
   		public $typeNews;
  	}

  	require('../Php/connectToBBDD.php');

  	$result = mysql_query("SELECT * FROM NewsTimeline", $link);

	$rawdata = array(); //creamos un array
 
	//guardamos en un array multidimensional todos los datos de la consulta
	$i = 0;
	$numRowsRes = mysql_num_rows($result);

	if($numRowsRes > 0){
		while($aux = mysql_fetch_row($result)) 
		{
			$auxArticulo = new Articulo();
		  	$auxArticulo->id = $aux[0];
		  	$auxArticulo->title = $aux[1];
		  	$auxArticulo->author = $aux[2];
		  	$auxArticulo->location = $aux[3];
		  	$auxArticulo->typeNews = $aux[4];

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