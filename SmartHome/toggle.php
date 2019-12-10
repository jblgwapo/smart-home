<?php
$_GET["toggle"];
exec('say request '.$_GET["value"]);
if($_GET["value"]=="1"){ echo false; exec('say switching the toggle to off');}
if($_GET["value"]=="0"){ echo true; exec('say switching the toggle to on');}

?>
