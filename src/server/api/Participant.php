<?php
namespace Src\api;

class Participant extends BaseController{
    public function __construct($db)
    {
        parent::__construct($db);
    }

    public function processRequest($method, $params)
    {
        $this->log("processRequest($method), ".print_r($params, true));
        array_splice($params, 0, 1);
        switch ($method) {
            case 'GET':
                $response = $this->processGet($params);
                break;
            case 'POST':
                $response = $this->processPost($params);
                break;
            default:
                $response = $this->notFoundResponse();
        }       
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function processGet($params)
    {
    }

    private function processPost($params)
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
/*        if (! $this->validateParticipant($input)) {
          return $this->unprocessableEntityResponse();
        } */
        $this->log('processPost '.print_r($input, true));
        $sql = <<<SQL
INSERT INTO participant (excursion_id, lastname, firstname, midname, phone, email, 
when_reserved, fullcost_tickets, discount_tickets, free_tickets, `status`, cost)
VALUES(:excursion_id, :lastname, :firstname, :midname, :phone, :email, 
NOW(), :fullcost, :discount, :free, 'reserved', :cost)
SQL;
        try {        
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([
                'excursion_id' => $input[excursion_id],
                'lastname' => $input[lastname],
                'firstname' => $input[firstname],
                'midname' => $input[midname],
                'phone' => $input[phone],
                'email' => $input[email],
                'fullcost' => $input[fullcost],
                'discount' => $input[discount],
                'free' => $input[free],
                'cost' => $input[cost],
            ]);
            //$statement->rowCount();
        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        }

        return $this->json201Response();
    }

}
