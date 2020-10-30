<?php include ('header.php');?>
<body class="bg-light" ">

<body class="bg-light"  >

     <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <a class="navbar-brand mr-auto mr-lg-0 "id="index_menu" href="index.php">CSD PHILIPPINES CALLS MONITORING</a>
       <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#" id="user"></a>
                <input type="hidden" name="hidden_extension" id="hidden_extension">
                 <input type="hidden" name="position" id="position">
                 <input type="hidden" name="type" id="type" value="csdoutbound">
            </li>
            <li class="nav-item">
                <button type="button" class="btn btn-primary btn-small btn-nav" id="logout" onclick="logout()">Logout</button>
            </li>
        </ul>
    </div>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
     <style> 
       #index_menu:hover {
          color: magenta;
       }
     </style>
<div class="nav-scroller bg-blue shadow-sm">
      <nav class="nav nav-underline">
       
        <a class="nav-link mx-0 px-2" href="active.php">ACTIVE</a>
        <a class="nav-link mx-0 px-2" href="inactive.php">INACTIVE</a>
        <a class="nav-link mx-0 px-2" href="csd_inbound.php">CSD-INBOUND</a>
        <a class="nav-link mx-0 px-2 btn btn-primary btn-lg active" href="csd_outbound.php">CSD-OUTBOUND</a>
        <a class="nav-link mx-0 px-2" href="csd_missedcalls.php">CSD-MISSED-CALLS </a>
        <a class="nav-link mx-0 px-2" href="parked_calls.php">PARKED-CALLS </a>
        <a class="nav-link mx-0 px-2" href="voicemails.php">VOICE-MAILS </a> 
        <a class="nav-link mx-0 px-2" href="collection.php">COLLECTION-TEAM</a>
       <a class="nav-link mx-0 px-2" href="management.php">MANAGEMENT</a>   
       
      </nav>
</div>

    <main role="main" class="container" >
          <div>
             <button class="btn btn-primary btn-lg btn-block" id="outbound_summary_export" > EXPORT <i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
              <table class="table">
                <thead class="thead-dark">
                   <tr>
                      <th scope="col">#</th>
                      <th scope="col">EXTENSION</th>
                      <th scope="col">NAME</th>
                      <th scope="col" class="text-center">Total Made Calls </th>
                      <th scope="col">Total Calls Duration</th>
                      <th scope="col">
                      
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myDateRange" dataset-backdrop="static" dataset-keyboard="false" id="selectdate">SELECT DATE</button>
                              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#mySearch" dataset-backdrop="static" dataset-keyboard="false">SEARCH</button>
                         
                      </th>
                  </tr>
                </thead>
                <tbody id="call-summary-body">
                
                </tbody>
            </table>
          </div>
           <div class="modal fade" id="mySearch" role="dialog">
              <div class="modal-dialog">
              
                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                  
                    <h4 class="modal-title">SEARCH PHONE NUMBER</h4>
                   </div>
                   <div class="modal-body">
                        <form method="GET" id="search_number" name="search_number" action="search_outbound_number.php">
                            <div class="form-group">
                              <label for="search_caller">Search</label>
                              <input type="text" class="form-control" id="callednumber" name="callednumber" aria-describedby="callednumber" placeholder="Type or Paste number here!" required="true">
                            
                            </div> 
                            <hr>
                            <div class="text-right mb-3">
                                <input type="submit" class="btn btn-primary ml-auto">
                                <!-- <button type="submit" class="btn btn-primary ml-auto" data-dismiss="modal" id="search" >Search</button> -->
                              <button type="button" class="btn btn-danger ml-auto"  data-dismiss="modal" >Close</button>   
                            </div>
                                      
                        </form>
                    </div>
                  
              
                 </div>
      
               </div>
           </div>
            <div class="modal fade" id="myDateRange" role="dialog">
              <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">

                    <h4 class="modal-title">Select Date Range</h4>
                  </div>
                  <div class="modal-body">
                        <form method="GET" id="daterange" action="csd_outbound.php">
                            <div class="form-group">
                              <label for="startdate">From:</label>
                              <input type="date" class="form-control" id="startdate" name="startdate" aria-describedby="dateHelp" placeholder="Add Tag" required="true" onchange="validateDate()">
                            </div>
                             <div class="form-group">
                              <label for="enddate">To:</label>
                              <input type="date" class="form-control" id="enddate" name="enddate" aria-describedby="dateHelp" placeholder="Add Tag" required="true" onchange="validateDate()">
                            </div>
                             <div class="form-group">
                              <label for="TagType">Filter By Tag:</label>
                               <select class="custom-select" name="tagname" form="daterange" required id="tagname">
                                       <option select value="all">all</option>
                                        <option select value="">NO TAG</option>

                              </select>
                            </div>
                            
                            <hr>
                            <div class="text-right mb-3">
                                <input type="submit" class="btn btn-primary ml-auto">
                              <button type="button" class="btn btn-danger ml-auto"  data-dismiss="modal" >Close</button>
                            </div>

                    </form>
                  </div>


                </div>

              </div>
         </div>
      <script type="text/javascript">
          var _gaq = _gaq || [];
          _gaq.push(['_setAccount', 'UA-36251023-1']);
          _gaq.push(['_setDomainName', 'jqueryscript.net']);
          _gaq.push(['_trackPageview']);

          (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
          })();

          //THIS FUNCTION IS TO MAKE SURE THAT USER CANNOT SELECT DATE LATER THAT THE CURRENT DATE
            //AND STARTDATE CANNOT BE GREATER THAT THE ENDDATE
            function validateDate(){ 

            var startdate = document.getElementById('startdate').value.toString()
            
            var startdateSplit = startdate.split("-");
            var newStartDate = new Date(startdateSplit[0],startdateSplit[1]-1,startdateSplit[2]);
            var startdateTimeStamp = newStartDate.getTime();
            
            var enddate = document.getElementById('enddate').value.toString()
            //get the timestamp of the  start date
            var enddateSplit = enddate.split("-");
            var newEndDate = new Date(enddateSplit[0],enddateSplit[1]-1,enddateSplit[2]);
            var enddateTimeStamp = newEndDate.getTime();

             var d = new Date();
            
             if(startdateTimeStamp > d.getTime() || enddateTimeStamp > d.getTime()){
              alert('Selected Date Must Not be Greater on the Current Date')
              document.getElementById('startdate').value = "";
              document.getElementById('enddate').value = "";
             }
             if(startdateTimeStamp > enddateTimeStamp){
              alert('StartDate Must not Greater on EndDate')
              document.getElementById('startdate').value = "";
              document.getElementById('enddate').value = "";
             }
          }

      </script>  
    </main>
    <script type="module" src="js/controllers/callctrl.js"></script> 
 <?php include ('footer.php');?>
