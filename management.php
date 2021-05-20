
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

  <body class="bg-light" onload="getAllAgents()">

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
                 <a class="nav-link mx-0 px-2" href="csd_manage.php">MANAGE CSD AGENTS</a>
                <a class="nav-link mx-0 px-2" href="collection_manage.php">MANAGE COLLECTION AGENTS</a>
                 <a class="nav-link mx-0 px-2" href="tag.php">MANAGE TAGS</a>
                 <a class="nav-link mx-0 px-2" href="metrics.php">GEN METRICS</a>
          </nav>
    </div>

    <main role="main" class="container" id="main">




    <script src="js/csd_manage.js"></script>
    </main>

 <?php include ('footer.php');?>
