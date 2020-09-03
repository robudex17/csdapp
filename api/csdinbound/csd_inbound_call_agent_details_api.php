<?php
//required headers
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");

// // database connection will be here...

// //include database and object files
include_once '../../config/database.php';
include_once '../../objects/csdinbound.php';

$database = new Database();
$db = $database->getConnection();

$csdinbound = new CSDINBOUND($db);


if( isset($_GET['extension']) && isset($_GET['username']) && isset($_GET['startdate'])  && isset($_GET['enddate']) && isset($_GET['tagname'])){

	$extension = $_GET['extension'];
	$username = $_GET['username'];
	$startdate = $_GET['startdate'];
	$enddate = $_GET['enddate'];
	$tagname = $_GET['tagname'];

	$stmnt = $csdinbound->csdInboundCallAgentDetails($extension,$username,$startdate,$enddate,$tagname);


}elseif(isset($_GET['modalextension']) && isset($_GET['modalusername']) && isset($_GET['startdate'])  && isset($_GET['enddate']) && isset($_GET['tagname'])){

	$extension = $_GET['modalextension'];
	$username = $_GET['modalusername'];
	$startdate = $_GET['startdate'];
	$enddate = $_GET['enddate'];
	$tagname = $_GET['tagname'];

	$stmnt = $csdinbound->csdInboundCallAgentDetails($extension,$username,$startdate,$enddate,$tagname);

}else{
	echo json_encode(array("message" => "Each Field must not empty"));
}