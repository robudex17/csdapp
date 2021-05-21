<?php
//required headers
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
date_default_timezone_set('Asia/Tokyo');

// // database connection will be here...

// //include database and object files
include_once '../config/database.php';
include_once '../objects/csd.php';

$database = new Database();
$db = $database->getConnection();

$csd = new Csd($db);
$condition=true;
echo $_GET['extension'];
if( isset($_GET['extension'])) {
	$extension = "6336";
	$stmnt = $csd->getCallType($extension);
	$num = $stmnt->rowCount();
	

	if($num != 0){
        $row = $stmnt->fetch(PDO::FETCH_ASSOC);
        $calltype = $row['calltype'];

		echo json_encode($calltype);

	}else{
		echo json_encode(array("message" => "No Details"));
	}


}else{
	echo json_encode(array("message" => "No Details"));
}