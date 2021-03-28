<?php
$baseDir = dirname(dirname(dirname(__FILE__)));
require $baseDir.'/vendor/autoload.php';

use Src\Database;

$dbConnection = (new Database())->connect();
