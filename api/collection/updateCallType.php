<?php
//required headers
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// // database connection will be here...

//include database and object files
include_once '../../config/database.php';
include_once '../../objects/csd.php';

$database = new Database();
$db = $database->getConnection();

$collection = new Csd($db);
 // get posted data
<<<<<<< HEAD
//  $data = json_decode(file_get_contents("php://input"));
  	//$collection->calltype = "collection"; $data->calltype;
	//$collection->extension = "6363";  $data->extension;
 	


$collection->updateCallType("6336","collection");
=======
  $data = json_decode(file_get_contents("php://input"));
  	$calltype = $data->calltype;
	$extension = $data->extension;
 	


$collection->updateCallType($extension,$calltype);
>>>>>>> fcdfc0a6f584e1d533574c1d1bc41943b89d6209
