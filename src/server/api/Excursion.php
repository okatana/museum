<?php
namespace Src\api;

class Excursion extends BaseController{
    public function __construct($db)
    {
        parent::__construct($db);
    }

    public function processRequest($method, $params)
    {
        $this->log("processRequest($method), ".print_r($params, true));
        $mainToken = $params[0];
        array_splice($params, 0, 1);
        if ($mainToken === 'excursion_type') {
            $response = $this->processExcursionType($method, $params);            
        } else {
            switch ($method) {
                case 'GET':
                    $response = $this->processGet($params);
                    break;
                default:
                    $response = $this->notFoundResponse();
            }
        }
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function processExcursionType($method, $params)
    {
        switch ($method) {
            case 'GET':
                if (count($params) === 0) {
                    $response = $this->getAllExcursionTypes();                  
                } else
                if (count($params) === 1) {
                    $response = $this->getExcursionType($params[0]);                  
                }
                 break;
            default:
                $response = $this->notFoundResponse();
        }
        return $response;
    }

    private function getAllExcursionTypes()
    {

    }

    private function getExcursionType($type_id)
    {
        $this->log("getExcursionType($type_id)");
        $sql = <<<SQL
SELECT * FROM excursion_type WHERE id=?
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([$type_id]);
            if ($result) {
                $result = $statement->fetch(\PDO::FETCH_ASSOC); 
//                $this->log('getExcursionType() $result='. print_r($result, true));    
            } else {
                exit(print_r($statement->errorInfo(), true));
            }
        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        }

        return $this->json200Response($result);
    }

    private function processGet($params)
    {
        switch (count($params)) {
            case 2:
                if ($params[1] === 'dates') {
                    $response = $this->getAvalableDates($params[0]);
                } else
                if ($params[1] === 'participants') {
                    $response = $this->getExcursionParticipants($params[0]);
                } else
                break;
            case 3:
                if ($params[1] === 'date') {
                    $response = $this->getExcursionsForDate($params[0], $params[2]);
                }
                break;
            case 4:
                if ($params[1] === 'date' && $params[3] === 'admin') {
                    $response = $this->getExcursionsForDateAdmin($params[0], $params[2]);
                }
                break;
           }
        if (isset($response)) {
            return $response;
        } else {
            return $this->badRequestResponse();
        }
    }

    private function getAvalableDates($type_id) {
        $sql = <<<SQL
SELECT distinct DATE(`when`) as date
FROM excursion WHERE type_id=? AND `when` > NOW() ORDER BY 1;
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([$type_id]);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        }

        return $this->json200Response($result);
    }

    private function getExcursionParticipants($excursion_id) {
        $sql = <<<SQL
SELECT * FROM participant where excursion_id=? ORDER BY lastname, firstname;
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([$excursion_id]);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        }

        return $this->json200Response($result);
    }

    private function getExcursionsForDate($type_id, $date) {
        $sql = <<<SQL
SELECT e.id, participants_limit, `when` AS datetime, 
e.fullcost_tickets+e.discount_tickets+e.free_tickets+
  SUM(IFNULL(ps.fullcost_tickets,0)+IFNULL(ps.discount_tickets,0)+IFNULL(ps.free_tickets,0)) AS sold,
SUM(IFNULL(pr.fullcost_tickets,0)+IFNULL(pr.discount_tickets,0)+IFNULL(pr.free_tickets,0)) AS reserved
FROM excursion e
LEFT JOIN participant ps ON ps.excursion_id=e.id AND ps.status='sold'
LEFT JOIN participant pr ON pr.excursion_id=e.id AND pr.status='reserved'
WHERE type_id=? AND DATE(`when`)=? 
GROUP BY e.id
ORDER BY 1;
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([$type_id, $date]);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        }

        return $this->json200Response($result);
    }

    private function getExcursionsForDateAdmin($type_id, $date) {
        $sql = <<<SQL
SELECT e.id, participants_limit, `when` AS datetime, 
    e.fullcost_tickets+e.discount_tickets+e.free_tickets AS office_sold,
    SUM(IFNULL(ps.fullcost_tickets,0)+IFNULL(ps.discount_tickets,0)+IFNULL(ps.free_tickets,0)) AS site_sold,
    SUM(IFNULL(pr.fullcost_tickets,0)+IFNULL(pr.discount_tickets,0)+IFNULL(pr.free_tickets,0)) AS reserved,
    e.fullcost_tickets+SUM(IFNULL(ps.fullcost_tickets,0)) AS fullcost,
    e.discount_tickets+SUM(IFNULL(ps.discount_tickets,0)) AS discount,
    e.free_tickets+SUM(IFNULL(ps.free_tickets,0)) AS free
FROM excursion e
LEFT JOIN participant ps ON ps.excursion_id=e.id AND ps.status='sold'
LEFT JOIN participant pr ON pr.excursion_id=e.id AND pr.status='reserved'
WHERE type_id=? AND DATE(`when`)=? 
GROUP BY e.id
ORDER BY 1;
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([$type_id, $date]);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        }

        return $this->json200Response($result);
    }
}
