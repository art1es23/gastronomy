<?php
$_POST = json_decode(file_POST_contents("php://input"), true);
echo var_dump($_POST);

