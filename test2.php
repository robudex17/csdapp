<?php
$mystring = "Rogmer&bulaclac";

$mystring = mysql_real_escape_string($mystring);
echo $mystring;