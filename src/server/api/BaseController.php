<?php
namespace Src\api;

class BaseController {
    protected $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    protected function json200Response($result)
    {
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    protected function json201Response($message = null)
    {
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        if ($message) {
            $response['body'] = json_encode(['message' => $message]);
        }
        return $response;
    }

    protected function dbErrorResponse($message)
    {
        $response['status_code_header'] = 'HTTP/1.1 500 Internal Server Error';
        $response['body'] = $message;
        return $response;
    }

    protected function badRequestResponse($message = null)
    {
      $response['status_code_header'] = 'HTTP/1.1 400 Bad Request';
      $response['body'] = $message;
      return $response;
    }  

    protected function notFoundResponse()
    {
      $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
      $response['body'] = null;
      return $response;
    }
    
    protected function log($message)
    {
        file_put_contents('log', date('Y/m/d H:m:s').' '.$message.PHP_EOL, FILE_APPEND);
    }

}
