<?php

 class CSDOUTBOUND {

 	//CSD class properties
	private $csdinbound_table = "csdinbound";
	private $inbound_callstatus_table = "inbound_callstatus";
    private $csdoutbound = "outbound";
    private $parked_calls_tb = "waiting_calls";
    private $voicemail = "voicemail";

	private $logs_table = "logs";
	private $conn;
	public $extension;
	public $callerid;
	public $username;
	public $receive_calls;
	  //add on 08222020
	public $tagtype;
	public $tagname;
	public $createdby;
	public $createddate;
	public $tagId;
	private $tag = "tag";

	private $json_addr = "/var/www/html/sbtph_csd/json/";
  
   //create database connection  when this class instantiated
    public function __construct($db){
    	$this->conn = $db;
    }

    public function getSingle($extension) {
        // build query
        $query = "SELECT * FROM ".$this->csdinbound_table." WHERE extension=?";

        //prepare the query

        $stmnt = $this->conn->prepare($query);

        //bind values

        $stmnt->bindParam(1,$extension);

        //execute
        $stmnt->execute();
        return $stmnt;
    }

     public function csdOutboundCallSummary($startdate,$enddate,$tagname){
        $currentdate = date('Y-m-d');

        if(strtotime($getdate) > strtotime($currentdate)){
            echo json_encode(array ("message" => "No Records Found"));
            exit();
        }

         $getOutboundTags = $this->getTags('CSDOUTBOUND');
      
          $tags_options = array();

          while ($row_tag = $getOutboundTags->fetch(PDO::FETCH_ASSOC) ) {
             array_push($tags_options, $row_tag['tagname']);
          }

        // build the query
        $query = "SELECT * FROM ".$this->csdinbound_table."  ";

        //prepare the query
        $stmnt = $this->conn->prepare($query);

        if($stmnt->execute()){
            $outbound_summary = array();
            while($row = $stmnt->fetch(PDO::FETCH_ASSOC)){
                $getAgentTotalRecords = $this->getTotalAgentOutboundRecords($startdate,$enddate,$tagname,$row['extension']);

                 //total answer calls of each agent
                $totalMadeCalls = $getAgentTotalRecords->rowCount();
                //This section calculate the total call duration of each agents..
                 $total=0;
                 while($row_calls = $getAgentTotalRecords->fetch(PDO::FETCH_ASSOC)) {
										 if($row_calls['Duration'] != 0){
											 $total = $total + $row_calls['Duration'];
										 }else{
											 $endtime = explode("-", $row_calls['EndTimeStamp']);
	                     $startime = explode("-", $row_calls['StartTimeStamp']);
	                     $total = $total + ( (strtotime($endtime[0]) + strtotime($endtime[1])) - (strtotime($startime[0]) +strtotime($startime[1])) );
	                  }
									}

                // make H:m:s time format
                 $total_duration = $this->secToHR($total);
                 $getdate = '('.$startdate.')'. "-".'('.$enddate.')';
                 if(strtotime($startdate) == strtotime($enddate)){
                    $getdate = $startdate;
                 }
                 $outbound_agent_summary = array(
                    "extension" => $row['extension'],
                    "username" => $row['username'],
                    "totalmadecalls" => $totalMadeCalls,
                    "totalduration" => $total_duration,
                    "getdate" => $getdate,
                    "calldetails" => "csd_outbound_call_agent_details.php?extension=" . $row['extension'] . "&username=" . $row['username'] . "&startdate=" . $startdate. "&enddate=".$enddate ."&tagname=" .$tagname

                 );

                 array_push($outbound_summary, $outbound_agent_summary);
             }
             $data = array();
             array_push($data,$outbound_summary);
             array_push($data,$tags_options);
            echo json_encode($data);
        }

    }

    public function csdOutboundCallSummaryExport($startdate,$enddate,$tagname){
        $currentdate = date('Y-m-d');

        if(strtotime($getdate) > strtotime($currentdate)){
            echo json_encode(array ("message" => "No Records Found"));
            exit();
        }

        // build the query
        $query = "SELECT * FROM ".$this->csdinbound_table."  ";

        //prepare the query
        $stmnt = $this->conn->prepare($query);

        if($stmnt->execute()){

             $outbound_summary_template_json = file_get_contents($this->json_addr."outbound_summary.json");
            //make an object
            $outbound_summary_call_details_obj = json_decode($outbound_summary_template_json, FALSE);
            while($row = $stmnt->fetch(PDO::FETCH_ASSOC)){
                $getAgentTotalRecords = $this->getTotalAgentOutboundRecords($startdate,$enddate,$tagname,$row['extension']);

                 //total answer calls of each agent
                $totalMadeCalls = $getAgentTotalRecords->rowCount();
                                /*This section calculate the total call duration of each agents..
                                    Duration field is newly added  on the table.
                                    On the  old records that Duration field is empty, Duraiton is calculated using the End and start timestamp
                                */
                 $total=0;
                 while($row_calls = $getAgentTotalRecords->fetch(PDO::FETCH_ASSOC)) {
                                     if($row_calls['Duration'] != 0){
                                         $total = $total +  $row_calls['Duration'];
                                     }else{
                                            $endtime = explode("-", $row_calls['EndTimeStamp']);
                                            $startime = explode("-", $row_calls['StartTimeStamp']);
                                            $total = $total + ( (strtotime($endtime[0]) + strtotime($endtime[1])) - (strtotime($startime[0]) +strtotime($startime[1])) );
                                     }
                 }
                // make H:m:s time format
                 $total_duration = $this->secToHR($total);
                  $getdate = '('.$startdate.')'. "-".'('.$enddate.')';
                 if(strtotime($startdate) == strtotime($enddate)){
                    $getdate = $startdate;
                 }
                 $outbound_summary = array();
                 //put each field to each array
                 $array_extension = array("text" => $row['extension']);
                 $array_name = array("text" => $row['username']);
                 $array_totalmadecalls = array("text" =>  $totalMadeCalls);
                 $array_totalduration = array("text" => $total_duration);
                 $array_getdate = array("text" => $getdate);

                 //push it one by one
                 array_push($outbound_summary,$array_extension);
                 array_push($outbound_summary, $array_name);
                 array_push($outbound_summary, $array_totalmadecalls);
                 array_push($outbound_summary, $array_totalduration);
                 array_push($outbound_summary, $array_getdate);

                 array_push($outbound_summary_call_details_obj->tableData[0]->data, $outbound_summary);
             }
            //echo as json
            echo json_encode($outbound_summary_call_details_obj);

        }
    }


    public function getTotalAgentOutboundRecords($startdate,$enddate,$tagname, $extension) {
    	if($tagname == 'all'){
    		//build query
		        $query  = "SELECT * FROM ".$this->csdoutbound." WHERE getDate BETWEEN ? AND ? AND CallStatus='ANSWER'  AND Caller =? ORDER BY StartTimeStamp DESC";

		        //prepare the query
		        $stmnt = $this->conn->prepare($query);

		        //bind values from question mark (?) place holder.
		         $stmnt->bindParam(1,$startdate);
		          $stmnt->bindParam(2,$enddate);
		         $stmnt->bindParam(3,$extension);

		        //execute
		       $stmnt->execute();

		       return $stmnt;
    	}else{
    		//build query
		        $query  = "SELECT * FROM ".$this->csdoutbound." WHERE getDate BETWEEN ? AND ? AND CallStatus='ANSWER'  AND Caller =? AND tag=? ORDER BY StartTimeStamp DESC";

		        //prepare the query
		        $stmnt = $this->conn->prepare($query);

		        //bind values from question mark (?) place holder.
		         $stmnt->bindParam(1,$startdate);
		          $stmnt->bindParam(2,$enddate);
		         $stmnt->bindParam(3,$extension);
		         $stmnt->bindParam(4,$tagname);

		        //execute
		       $stmnt->execute();

		       return $stmnt;
    	}
        
    }

    public function csdOutboundCallAgentDetails($extension,$username,$startdate,$enddate,$tagname){

      $getOutboundTags = $this->getTags('CSDOUTBOUND');
      
      $outboundTags_array = array();

      while ($row_tag = $getOutboundTags->fetch(PDO::FETCH_ASSOC) ) {
         array_push($outboundTags_array, $row_tag['tagname']);
      }
      if($tagname == 'all'){
         $query = "SELECT * FROM " . $this->csdoutbound . " WHERE Caller=? AND CallStatus='ANSWER' AND getDate BETWEEN ? AND ? ORDER BY StartTimeStamp DESC ";
         $stmnt = $this->conn->prepare($query);

         //bind values from question mark (?) place holder
         $stmnt->bindParam(1, $extension);
          $stmnt->bindParam(2,$startdate);
          $stmnt->bindParam(3,$enddate);

      }else{
         $query = "SELECT * FROM " . $this->csdoutbound . " WHERE Caller=? AND CallStatus='ANSWER' AND getDate BETWEEN ? AND ? AND tag=? ORDER BY StartTimeStamp DESC";
          $stmnt = $this->conn->prepare($query);

         //bind values from question mark (?) place holder
         $stmnt->bindParam(1, $extension);
         $stmnt->bindParam(2,$startdate);
          $stmnt->bindParam(3,$enddate);
          $stmnt->bindParam(4,$tagname);
      }
       
         $stmnt->execute();

         $num = $stmnt->rowCount();


        if ($num != 0 ){

            $csdoutbound_calls_details = array();

            while($row = $stmnt->fetch(PDO::FETCH_ASSOC)){
                            $total=0;
                            //Duration Field is new added to the table and the old records has empty duration field so need to used start and end timestamp to compute the duration
                             if($row['Duration'] != 0){
                                 $total = $total + $row['Duration'];
                                 $EndTime  = str_replace("-", " ", $row['EndTimeStamp']);
                                 $EndTime = strtotime($EndTime);
                                 $StartTime =  $EndTime - $duration;

                             }
                             // this is where the duration is available so no need to compute the duration but need to compute the start timestamp.
                             else{
                                    $endtime = explode("-", $row['EndTimeStamp']);
                                    $startime = explode("-", $row['StartTimeStamp']);
                                    $total = $total + ((strtotime($endtime[0]) + strtotime($endtime[1])) - (strtotime($startime[0]) +strtotime($startime[1])) );

                                    $StartTime = str_replace("-", " ", $row['StartTimeStamp']);
                                    $EndTime  = str_replace("-", " ", $row['EndTimeStamp']);
                                    $StartTime = strtotime($StartTime);
                                    $EndTime = strtotime($EndTime);
                             }
                                $duration = $this->secToHR($total);

                //get recordings url
                $base_url = "http://211.0.128.110/callrecording/outgoing/";
                $date_folder = str_replace('-',"", $row['getDate']);
                $filename = $row['Caller'] .'-'. $row['CalledNumber'] .'-' .$row['StartTimeStamp']. ".mp3";
                $full_url = $base_url . $date_folder .'/'.$filename;

                 $agent = array(
                    "username" => $username,
                    "caller" => $extension,
                    "calledNumber" => $row['CalledNumber'],
                    "callStatus" => $row['CallStatus'],
                    "startime" => date( "h:i:s a",$StartTime),
                    "endtime" =>  date("h:i:s a",$EndTime),
                    "callDuration" => $duration,
                    "callrecording" => $full_url,
                    "getDate" => $row['getDate'],
                    "comment" => $row['comment'],
                    "starttimestamp" => $row['StartTimeStamp'],
                    "tag" => $row['tag']
                );
                array_push($csdoutbound_calls_details, $agent);
            }
            $agent_data = array();
            array_push($agent_data,$csdoutbound_calls_details);
            array_push($agent_data,$outboundTags_array);
            //http_response_code(201);
            echo json_encode($agent_data);
        }else{
            echo json_encode(array ("message" => "No Records Found"));
        }
     }

     public function csdOutboundCallAgentDetailsExport($extension,$username,$startdate,$enddate,$tagname){

          if($tagname == 'all'){
         $query = "SELECT * FROM " . $this->csdoutbound . " WHERE Caller=? AND CallStatus='ANSWER' AND getDate BETWEEN ? AND ? ";
         $stmnt = $this->conn->prepare($query);

         //bind values from question mark (?) place holder
         $stmnt->bindParam(1, $extension);
          $stmnt->bindParam(2,$startdate);
          $stmnt->bindParam(3,$enddate);

      }else{
         $query = "SELECT * FROM " . $this->csdoutbound . " WHERE Caller=? AND CallStatus='ANSWER' AND getDate BETWEEN ? AND ? AND tag=? ";
          $stmnt = $this->conn->prepare($query);

         //bind values from question mark (?) place holder
         $stmnt->bindParam(1, $extension);
         $stmnt->bindParam(2,$startdate);
          $stmnt->bindParam(3,$enddate);
          $stmnt->bindParam(4,$tagname);
      }

         $stmnt->execute();

         $num = $stmnt->rowCount();


        if ($num != 0 ){

            $outbound_call_details_template_json = file_get_contents($this->json_addr."outbound_call_details.json");
            //make an object
            $outbound_call_details_obj = json_decode($outbound_call_details_template_json, FALSE);

            while($row = $stmnt->fetch(PDO::FETCH_ASSOC)){
                            $total=0;
                            //Duration Field is new added to the table and the old records has empty duration field so need to used start and end timestamp to compute the duration
                             if($row['Duration'] != 0){
                                 $total = $total + $row['Duration'];
                                 $EndTime  = str_replace("-", " ", $row['EndTimeStamp']);
                                 $EndTime = strtotime($EndTime);
                                 $StartTime =  $EndTime - $duration;

                             }
                             // this is where the duration is available so no need to compute the duration but need to compute the start timestamp.
                             else{
                                 $endtime = explode("-", $row['EndTimeStamp']);
                                 $startime = explode("-", $row['StartTimeStamp']);
                                 $total = $total + ((strtotime($endtime[0]) + strtotime($endtime[1])) - (strtotime($startime[0]) +strtotime($startime[1])) );

                                 $StartTime = str_replace("-", " ", $row['StartTimeStamp']);
                                 $EndTime  = str_replace("-", " ", $row['EndTimeStamp']);
                                 $StartTime = strtotime($StartTime);
                                 $EndTime = strtotime($EndTime);
                             }
                                $duration = $this->secToHR($total);

                //get recordings url
                $base_url = "http://211.0.128.110/callrecording/outgoing/";
                $date_folder = str_replace('-',"", $row['getDate']);
                $filename = $row['Caller'] .'-'. $row['CalledNumber'] .'-' .$row['StartTimeStamp']. ".mp3";
                $full_url = $base_url . $date_folder .'/'.$filename;

                 $agent = array();
                //put each field to each array
                $array_username = array("text" => $username);
                $array_extension = array("text" => $extension);
                $array_calledNumber = array("text" => $row['CalledNumber']);
                $array_caller = array("text" => $row['Caller'] );
                $array_callStatus = array("text" => $row['CallStatus']);
                $array_startime = array("text" => date( "h:i:s a",$StartTime));
                $array_endtime = array("text" => date("h:i:s a",$EndTime));
                $array_callDuration = array("text" => $duration );
                $array_callrecording = array("text" => $full_url);
                $array_getDate = array("text" => $row['getDate']);
                $array_comment = array("text" =>  $row['comment']);
                $array_tag = array("text" => $row['tag']);

                //push it
                array_push($agent,$array_username);
                array_push($agent, $array_extension);
                array_push($agent,$array_calledNumber);
                array_push($agent,$array_caller);
                array_push($agent, $array_callStatus);
                array_push($agent,$array_startime);
                array_push($agent, $array_endtime);
                array_push($agent, $array_callDuration);
                array_push($agent,$array_callrecording);
                array_push($agent, $array_getDate);
                array_push($agent,$array_comment);
                array_push($agent,$array_tag);
                array_push($outbound_call_details_obj->tableData[0]->data, $agent);
            }
            //http_response_code(201);

            echo json_encode($outbound_call_details_obj);
        }else{
            echo json_encode(array ("message" => "No Records Found"));
        }
     }

      public function getTags($tagtype){

	      //build query
	      $query = "SELECT * FROM  ".$this->tag." WHERE tagtype=?";

	      //prepare the query
	      $stmnt = $this->conn->prepare($query);

	      //bind values
	      $stmnt->bindParam(1,$tagtype);
	     

	      $stmnt->execute();

	      return $stmnt;
    }

     public function getOutboundCallComment($caller,$getdate,$startimestamp) {
        //build query
        $query = "SELECT * FROM  ".$this->csdoutbound." WHERE Caller=? AND getDate=? AND StartTimeStamp=?";

        //prepare the query
        $stmnt = $this->conn->prepare($query);

        //bind values
        $stmnt->bindParam(1,$caller);
        $stmnt->bindParam(2,$getdate);
        $stmnt->bindParam(3,$startimestamp);

        $stmnt->execute();

        $num = $stmnt->rowCount();

        if ($num != 0 ){
              $row = $stmnt->fetch(PDO::FETCH_ASSOC);
             $outbound_comment = array("comment" => $row['comment'],"tag" => $row['tag']);
             echo json_encode($outbound_comment);

        }else{
            echo json_encode(array ("comment" => "No comment"));
        }
    }


     private function secToHR($seconds) {
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds / 60) % 60);
        $seconds = $seconds % 60;
         return "$hours:$minutes:$seconds";
    }

    public function putOutboundCallComment($startimestamp, $getdate, $caller, $comment,$tag) {
        //build query
       $query = "UPDATE `outbound` SET `comment`='$comment',`tag`='$tag' WHERE `StartTimeStamp`='$startimestamp' AND `getDate`='$getdate' AND `Caller`='$caller'";
        //prepare query
        $stmnt = $this->conn->prepare($query);
        //excute
        $stmnt->execute();

        $count = $stmnt->rowCount();
        if($count !=0){
                 echo json_encode(array("message" => "Successfully Updated"));
        }else{
             echo json_encode(array("message" => "Update was not Successfull"));
        }
    }

    public function searchCalledNumberCallDetails($callednumber){

        $getOutboundTags = $this->getTags('CSDOUTBOUND');
      
        $outboundTags_array = array();

          while ($row_tag = $getOutboundTags->fetch(PDO::FETCH_ASSOC) ) {
             array_push($outboundTags_array, $row_tag['tagname']);
          }
         //  build query
        $query = "SELECT * FROM " . $this->csdoutbound . " WHERE CalledNumber=? ORDER BY getDate DESC";
        // $query  = "SELECT StartTimeStamp,EndTimeStamp FROM ".$this->collectionteam_callsummary." WHERE getDate='2019-09-13' AND CallStatus='ANSWER'  AND Caller ='6340'";
        // //prepare the query
         $stmnt = $this->conn->prepare($query);

         //bind values from question mark (?) place holder
         $stmnt->bindParam(1, $callednumber);


         $stmnt->execute();

         $num = $stmnt->rowCount();


        if ($num != 0 ){

            $csdoutbound_calls_details = array();

            while($row = $stmnt->fetch(PDO::FETCH_ASSOC)){
                            $total=0;
                            //Duration Field is new added to the table and the old records has empty duration field so need to used start and end timestamp to compute the duration
                             if($row['Duration'] != 0 ){
                                 $total = $total + $row['Duration'];
                                 $EndTime  = str_replace("-", " ", $row['EndTimeStamp']);
                                 $EndTime = strtotime($EndTime);
                                 $StartTime =  $EndTime - $duration;

                             }
                             // this is where the duration is available so no need to compute the duration but need to compute the start timestamp.
                             else{
                                 $endtime = explode("-", $row['EndTimeStamp']);
                                 $startime = explode("-", $row['StartTimeStamp']);
                                 $total = $total + ((strtotime($endtime[0]) + strtotime($endtime[1])) - (strtotime($startime[0]) +strtotime($startime[1])) );

                                 $StartTime = str_replace("-", " ", $row['StartTimeStamp']);
                                 $EndTime  = str_replace("-", " ", $row['EndTimeStamp']);
                                 $StartTime = strtotime($StartTime);
                                 $EndTime = strtotime($EndTime);
                             }
                                $duration = $this->secToHR($total);

                //get recordings url
                $base_url = "http://211.0.128.110/callrecording/outgoing/";
                $date_folder = str_replace('-',"", $row['getDate']);
                $filename = $row['Caller'] .'-'. $row['CalledNumber'] .'-' .$row['StartTimeStamp']. ".mp3";
                $full_url = $base_url . $date_folder .'/'.$filename;

                $get_single_agent =  $this->getSingle($row['Caller']);
                if($get_single_agent->rowCount() !=0) {
                    $agent_row = $get_single_agent->fetch(PDO::FETCH_ASSOC);
                    $agent_name = $agent_row['username'];
                }else{
                    $agent_name = "SaleAgent";
                }


                 $agent = array(
                    "caller" => $agent_name,
                     "extension" => $row['Caller'],
                    "calledNumber" => $row['CalledNumber'],
                    "callStatus" => $row['CallStatus'],
                    "startime" => date( "h:i:s a",$StartTime),
                    "endtime" =>  date("h:i:s a",$EndTime),
                    "callDuration" => $duration,
                    "callrecording" => $full_url,
                    "getDate" => $row['getDate'],
                    "comment" => $row['comment'],
                    "starttimestamp" => $row['StartTimeStamp'],
                    "tag" => $row['tag']
                );
                array_push($csdoutbound_calls_details, $agent);
            }
            //http_response_code(201);
            $final_data = array();
            array_push($final_data, $csdoutbound_calls_details);
            array_push($final_data,$outboundTags_array);
            echo json_encode($final_data);

        }else{
            echo json_encode(array ("message" => "No Records Found"));
        }
     }




 }
