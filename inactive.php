

<?php include ('header.php');?>

<body class="bg-light" onload="getInactiveAgents()">

   <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <a class="navbar-brand mr-auto mr-lg-0 " id="index_menu" href="index.php">CSD PHILIPPINES CALLS MONITORING</a><span style="margin:3px"><button  class="btn btn-primary btn-small btn-nav" data-toggle="modal" data-target="#myModal" dataset-backdrop="static" dataset-keyboard="false"  id="calltypebtn" ><span id="calltypelabel"></span><i class="fa fa-phone" aria-hidden="true"  style="font-size:15px"></i></span></button></span>
       <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#" id="user"></a>
                  <input type="hidden" name="hidden_extension" id="hidden_extension">
                   <input type="hidden" name="position" id="position">
                   <input type="hidden" name="blended" id="blended">
 
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
<div class="nav-scroller bg-blue shadow-sm" >
      <nav class="nav nav-underline">
       
        <a class="nav-link mx-0 px-2 " href="active.php">ACTIVE</a>
        <a class="nav-link mx-0 px-2 btn btn-primary btn-lg active " href="inactive.php">INACTIVE</a>
        <a class="nav-link mx-0 px-2" href="csd_inbound.php">CSD-INBOUND</a>
        <a class="nav-link mx-0 px-2" href="csd_outbound.php">CSD-OUTBOUND</a>
        <a class="nav-link mx-0 px-2" href="csd_missedcalls.php">CSD-MISSED-CALLS </a>
        <a class="nav-link mx-0 px-2" href="parked_calls.php">PARKED-CALLS </a>
        <a class="nav-link mx-0 px-2" href="voicemails.php">VOICE-MAILS </a> 
        <a class="nav-link mx-0 px-2" href="collection.php">COLLECTION-TEAM</a>
         <a class="nav-link mx-0 px-2" href="management.php">MANAGEMENT</a> 

       
      </nav>
</div>


    <main role="main" class="container">
          <div>
              <table class="table">
                <thead class="thead-dark">
                   <tr >
                      <th scope="col">#</th>
                      <th scope="col">EXTENSION</th>
                      <th scope="col">NAME</th>
                      <th scope="col">LOGIN/LOGOUT</th>
                      <th scope="col">LOGOUT DURATION </th>
                  </tr>
                </thead >
                <tbody id ="inactive_tbody">
                </tbody>
            </table>
          </div>
          <div id="calltype_modal"></div>
    </main>

<script src="js/active_inactive.js"></script>
<?php include ('footer.php');?>

