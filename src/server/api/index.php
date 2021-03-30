<?php
require "../start.php";
use Src\api\Excursion;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
//echo $uri . PHP_EOL;
$uri = explode( '/', $uri );

//print_r($uri);

if (count($uri) <= 2) {
    header("HTTP/1.1 400 Bad Request");
    exit();
}
$mainToken = $uri[2];
array_splice($uri, 0, 2);
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($mainToken) {
    case 'excursion':
    case 'excursions':
    case 'excursion_type':
        $controller = new Excursion($dbConnection);
        $controller->processRequest($requestMethod, $uri);
        break;
    default:
        header("HTTP/1.1 400 Bad Request");
        exit();
    
}
