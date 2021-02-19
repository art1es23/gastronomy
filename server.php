<?php
$_GET = json_decode(file_GET_contents("php://input"), true);
echo var_dump($_GET);

