<?php

$host = 'mysql';
$user = 'root';
$pass = '';
$connection = new mysqli($host, $user, $pass);

if ($connection->connect_error) {
  echo 'connection failed' . $connection->connect_error;
  die();
}

echo 'connection successfull!';