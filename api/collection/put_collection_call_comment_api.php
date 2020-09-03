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
include_once '../../objects/collection.php';

$database = new Database();
$db = $database->getConnection();

$collection = new Collection($db);
// get posted data
 $data = json_decode(file_get_contents("php://input"));

$starttimestamp = htmlspecialchars($data->starttimestamp) ; 
$getdate =  htmlspecialchars($data->getdate);
$caller = htmlspecialchars($data->caller);
$comment = htmlspecialchars($data->comment);
$tag = htmlspecialchars($data->tag);

$stmnt = $collection->putCollectionCallComment($starttimestamp, $getdate, $caller, $comment,$tag);
//$stmnt = $csd->putComment("20190920-131217", "2019-09-20", "6328", "This is updated comment");
