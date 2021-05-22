#!/usr/bin/php -q

<?php
$myServer = "103.5.6.2";
$myServer2 = "210.1.86.210";
$myUser = "python";
$myPass = "sbtph@2018";
$myDB = "sbtphcsd";

//get collection agents extensions from the file
$collection_file = fopen("collection_extension_list.txt", "r") or die("Unable to open file!");
$collection_pattern = fgets($collection_file);
fclose($collection_file);

$vRecFileName =  $argv[1];
$vEndTimeStamp = $argv[2];
$vDuration =  $argv[3];
$vCallStatus = $argv[4];
$vCaller = $argv[5];
$vCalledNumber = $argv[6];
$getCurrentdate = date('Y-m-d');

$removeWav = explode('.', $vRecFileName);
$pattern = "/^6[0-9]{3}$/";

//echo $removeWav[0];
//same => n,System(/usr/bin/php /root/SCRIPTS/getcollectionrecordings.php ${REC_FILENAME} ${CTS} ${ANSWEREDTIME} ${DIALSTATUS} ${CALLINGPARTY} ${CALLEDPARTY} )

$getStartTimeStamp = explode('-', $removeWav[0]);

$vStartTimeStamp =   $getStartTimeStamp[2] . '-'. $getStartTimeStamp[3];


//FETCH  COLLECTION STAFF RECORDING
if (preg_match($collection_pattern, $vCaller)) {
	// Create connection
	$conn = new mysqli($myServer, $myUser, $myPass, $myDB);
	// Check connection
	if ($conn->connect_error) {
		 //USE BACKUP IS INCASE PRIMARY IS DOWN
		$conn = new mysqli($myServer2, $myUser, $myPass, $myDB);
		if($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
	}else {
		echo "Connected...";
	}

	$comment = "";
	$commentby = "";
	$tag = "";
	$query = "INSERT INTO collectionteam_callsummary";
	$query .= "(StartTimeStamp, EndTimeStamp, Duration, CallStatus, Caller, CalledNumber, getDate,recording_link, comment, commentby, tag) VALUES ";
	$query .= "('".$vStartTimeStamp."','".$vEndTimeStamp."','".$vDuration."','".$vCallStatus."','".$vCaller."','".$vCalledNumber."','".$getCurrentdate."','".$vRecFileName."', '".$comment."', '".$commentby."', '".$tag."')";


	$result = $conn->query($query);

	if(!$result){
		echo("Error description: " . mysqli_error($conn));

	}else{
		echo "success";
	}
	$conn->close();


}
//FALLBACK  if Colllection parttern is not working
elseif ( ($vCaller == '6373') || ($vCaller == '6373')  || ($vCaller == '6340') || ($vCaller == '6379') || ($vCaller == '6309') || ($vCaller == '6369') || ($vCaller == '6334') || ($vCaller == '6390')) {
	// Create connection
	$conn = new mysqli($myServer, $myUser, $myPass, $myDB);
	// Check connection
	if ($conn->connect_error) {
		 //USE BACKUP IS INCASE PRIMARY IS DOWN
		$conn = new mysqli($myServer2, $myUser, $myPass, $myDB);
		if($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
	}else {
		echo "Connected...";
	}

	$comment = "";
	$commentby = "";
	$tag = "";
	$query = "INSERT INTO collectionteam_callsummary";
	$query .= "(StartTimeStamp, EndTimeStamp, Duration, CallStatus, Caller, CalledNumber, getDate,recording_link, comment, commentby, tag) VALUES ";
	$query .= "('".$vStartTimeStamp."','".$vEndTimeStamp."','".$vDuration."','".$vCallStatus."','".$vCaller."','".$vCalledNumber."','".$getCurrentdate."','".$vRecFileName."', '".$comment."', '".$commentby."', '".$tag."')";


	$result = $conn->query($query);

	if(!$result){
		echo("Error description: " . mysqli_error($conn));

	}else{
		echo "success";
	}
	$conn->close();

//FETCH  SBTPH STAFF RECORDING
}

elseif(preg_match($pattern, $vCaller)){
	// Create connection
	$conn = new mysqli($myServer, $myUser, $myPass, $myDB);
	// Check connection
	if ($conn->connect_error) {
		 //USE BACKUP IS INCASE PRIMARY IS DOWN
		$conn = new mysqli($myServer2, $myUser, $myPass, $myDB);
		if($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
	}else {
		echo "Connected...";
	}
	$comment = "";
	$commentby = "";
	$tag = "";
     
	// $query = "INSERT INTO outbound";
	// $query .= "(StartTimeStamp, EndTimeStamp, CallStatus, Caller, CalledNumber, getDate) VALUES ";
	// $query .= "('".$vStartTimeStamp."','".$vEndTimeStamp."','".$vCallStatus."','".$vCaller."','".$vCalledNumber."','".$getCurrentdate."')";
	$comment = "";
	$commentby = "";
	$tag = "";
	$query = "INSERT INTO outbound";
	$query .= "(StartTimeStamp, EndTimeStamp, Duration, CallStatus, Caller, CalledNumber, getDate,recording_link, comment, commentby, tag) VALUES ";
	$query .= "('".$vStartTimeStamp."','".$vEndTimeStamp."','".$vDuration."','".$vCallStatus."','".$vCaller."','".$vCalledNumber."','".$getCurrentdate."','".$vRecFileName."', '".$comment."', '".$commentby."', '".$tag."')";



	$result = $conn->query($query);

	if(!$result){
		echo("Error description: " . mysqli_error($conn));

	}else{
		echo "success";
	}
	$conn->close();
}else {
	exit();
}

?>
