#!/usr/bin/php -q

<?php

$servername = "192.168.70.250";
$servername2 ="192.168.70.165";
$username = "python";
$password = "sbtph@2018";
$dbname = "sbtphcsd";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
   //USE BACK IS INCASE PRIMARY IS DOWN
   $conn = new mysqli($servername2, $username, $password, $dbname);
   if($conn->connect_error) {
	   die("Connection failed: " . $conn->connect_error);
   }
}else {
	echo "good"; 
	
} 

 $query = "SELECT extension FROM `calltype` WHERE calltype='collection' ";


$result = $conn->query($query);

// Associative array
$collection_extensions = array();
while($row = $result->fetch_array(MYSQLI_ASSOC)){
	array_push($collection_extensions, $row['extension']);
}

$collection_implode =  implode("|",$collection_extensions);
$collection_string_pattern = '/'. $collection_implode . '/';
echo $collection_string_pattern;
$fp = fopen('collection_extension_list.txt', 'w');
fwrite($fp, $collection_string_pattern);
fclose($fp);


$servers = array("61.194.115.115", "211.0.1.128.97", "211.0.1.128.98", "211.0.1.128.100","211.0.1.128.101");

// exec('rsync -a -e "ssh -p 20022" collection_extension_list.txt root@61.194.115.115:/root/SCRIPTS', $output, $retval);
//  if($retval != 0){
//     echo "Transfer was not successfull";
//  }else{
//    echo json_encode(array("message" => "Successfully Updated CallType"));
// }
foreach ($servers as $server){
   $output=null;
   $retval=null;
   $rsync=null;
  if($server === "61.194.115.115"){
     $rsync = 'rsync -a -e "ssh -p 20022" collection_extension_list.txt root@'.$server.':/root/SCRIPTS';
     
  }else{

  } $rsync = 'rsync -a -e "ssh  collection_extension_list.txt root@'.$server.':/root/SCRIPTS';

   exec($rsync, $output, $retval);
   if ($retval != 0){
      $logdate = date("Y-m-d");
      $serverlog = "rsync is not successfull on server" . $server . "date" . $logdate;
      $logsyncfile = fopen('rsync.log', 'a');
      fwrite($logsyncfile, $serverlog);
      fclose($logsyncfile);
   }else{
      echo json_encode(array("message" => "Successfully Updated CallType"));
   }
 }




// Free result set
$result->free_result();

$conn->close();


?>
