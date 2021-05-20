
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="images/favicon.ico">

    <title>CSD PHILIPPINES CALLS MONITORING</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">


    <!-- Custom styles for this template -->
    <link href="css/offcanvas.css" rel="stylesheet">
  </head>

  <body class="bg-light" onload="getAllTags()">

    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <a class="navbar-brand mr-auto mr-lg-0 " id="index_menu" href="index.php">CSD PHILIPPINES CALLS MONITORING</a>
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
    <div class="nav-scroller bg-blue shadow-sm">
          <nav class="nav nav-underline ">

                 <a class="nav-link mx-0 px-2" href="index.php">HOME</a>
                 <a class="nav-link mx-0 px-2 " href="csd_manage.php">MANAGE CSD AGENTS</a>
                <a class="nav-link mx-0 px-2" href="collection_manage.php">MANAGE COLLECTION AGENTS</a>
                 <a class="nav-link mx-0 px-2 btn btn-primary btn-lg active" href="tag.php"> MANAGE TAGS</a>
                 <a class="nav-link mx-0 px-2" href="metrics.php">GEN METRICS</a>
              
          </nav>   
    </div>

    <main role="main" class="container" id="main">



 <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">

          <h4 class="modal-title">Add Tag</h4>
        </div>
        <div class="modal-body">
              <form method="POST" id="addTag">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Add Tag</label>
                    <input type="text" class="form-control" id="tagname" name="tagname" aria-describedby="emailHelp" placeholder="Add Tag" required="true">
                  </div>
                   <div class="form-group">
                    <label for="TagType">Select TagType:</label>
                     <select class="custom-select" name="tagtype" form="addTag" required id="tagtype">
                             <option value="CSDINBOUND">CSD-INBOUND</option>
                            <option value="CSDOUTBOUND">CSD-OUTBOUND</option>
                             <option value="COLLECTION">COLLECTION</option>

                    </select>
                  </div>
                  
                  <hr>
                  <div class="text-right mb-3">
                      <button type="button" class="btn btn-primary ml-auto" data-dismiss="modal" id="addbtn" >Submit</button>
                    <button type="button" class="btn btn-danger ml-auto"  data-dismiss="modal" >Close</button>
                  </div>

          </form>
        </div>


      </div>

    </div>
  </div>

</div>
        <table class="table table-striped " style="padding-top: 30px; padding-bottom:30px; margin-top: 30px;">
          <thead>
            <tr>
              <th scope="col"><h3>TAGTYPE</h3></th>
              <th scope="col"><h3>TAGNAME</h3></th>
              <th scope="col"><h3>CREATED BY</h3></th>
              <th scope="col"><h3>CREATED DATE</h3></th>
              <th scope="col"><h3>ACTION</h3></th>
            </tr>
          </thead>
          <tbody id="tag_tbody">


          </tbody>
        </table>
        <div class="row justify-content-md-center pb-5">
            <div class="col">

           </div>


            <div class="col-6">
               <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#myModal" dataset-backdrop="static" dataset-keyboard="false" id="add_tag">ADD TAG</button>
            <!--   <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#myMetrics" dataset-backdrop="static" dataset-keyboard="false" id="add_agent">GENERATE RANKING METRICS</button> -->
            <button type="button" class="btn btn-dark" id="gen_metrics" hidden>GENERATE RANKING METRICS</button>
            </div>
              <div class="col">

           </div>

        </div>


    <script src="js/tags.js"></script>
    </main>

 <?php include ('footer.php');?>
