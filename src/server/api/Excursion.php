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
        if ($mainToken === 'excursion_type' || $mainToken === 'excursion_types') {
            $response = $this->processExcursionType($method, $params);            
        } else {
            switch ($method) {
                case 'GET':
                    $response = $this->processGet($params);
                    break;
                case 'POST':
                    $response = $this->processPost($params);
                    break;
                case 'PUT':
                    $response = $this->processPut($params);
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
            case 'PUT':
                $response = $this->putExcursionType($params[0]);
                break;
            default:
                $response = $this->notFoundResponse();
        }
        return $response;
    }

    private function putExcursionType($id) {
        $this->log("putExcursionType($id)");
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $this->log(print_r($input, true));
        $sql = <<<SQL
UPDATE excursion_type
SET `name`=:name, description=:description, participants=:participants, `options`=:options, date_from=:date_from, date_to=:date_to
WHERE id=:id
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([
                'id' => $id,
                'name' => $input['name'],
                'description' => $input['description'],
                'participants' => $input['participants'],
                'options' => json_encode($input['options']),
                'date_from' => $input['date_from'],
                'date_to' => $input['date_to'],
            ]);
        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        }
        return $this->json200Response('OK');
    }

    private function getAllExcursionTypes()
    {
        $sql = <<<SQL
SELECT * FROM excursion_type
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return $this->dbErrorResponse($e->getMessage());
        }

        return $this->json200Response($result);
    }

    private function getExcursionType($type_id)
    {
//        $this->log("getExcursionType($type_id)");
        $sql = <<<SQL
SELECT * FROM excursion_type WHERE id=?
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([$type_id]);
            if ($result) {
                $result = $statement->fetch(\PDO::FETCH_ASSOC);
            } else {
                return $this->dbErrorResponse(print_r($statement->errorInfo(), true));
            }
        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        }

        return $this->json200Response($result);
    }

    private function processGet($params)
    {
        //$this->log('processGet '.print_r($params, true));
        switch (count($params)) {
            case 2:
                if ($params[1] === 'dates') {
                    $response = $this->getAvalableDates($params[0]);
                } else
                if ($params[1] === 'participants') {
                    $response = $this->getExcursionParticipants($params[0]);
                } else
                if ($params[1] === 'office-tickets') {
                    $response = $this->getExcursionOfficeTickets($params[0]);
                } else
                if ($params[0] === 'dates' && $params[1] === 'all-types') {
                    $response = $this->getExcursionDatesAllTypes();
                }
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

    private function processPut($params)
    {
        switch (count($params)) {
            case 2:
                if ($params[1] === 'office-tickets') {
                    $response = $this->updateExcursionTickets($params[0]);
                }
                break;
        }
        return $response;
    }

    private function updateExcursionTickets($id) {
        $this->log("updateExcursionTickets($id)");
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $this->log(print_r($input, true));
        $sql = <<<SQL
UPDATE excursion
SET fullcost_tickets=fullcost_tickets+:fullcost_tickets, 
    discount_tickets=discount_tickets+:discount_tickets, 
    free_tickets=free_tickets+:free_tickets
WHERE id=:id
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([
                'id' => $id,
                'fullcost_tickets' => $input['fullcost'],
                'discount_tickets' => $input['discount'],
                'free_tickets' => $input['free'],
            ]);
        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        }
        return $this->json200Response('OK');
    }

    private function processPost($params)
    {
        switch (count($params)) {
            case 1:
                if ($params[0] === 'schedule') {
                    $response = $this->addScheduledExcurions();
                }
                break;
        }
        return $response;
    }

    private function addScheduledExcurions()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $this->log(print_r($input, true));
        $type_id = $input['typeId'];

        $sql = <<<SQL
SELECT options, participants FROM excursion_type WHERE id=?
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([$type_id]);
            if ($result) {
                //$result = $statement->fetchAll();
                $excursionType = $statement->fetchObject();
                //$this->log('$result='.print_r($result, true));
                $options = json_decode($excursionType->options);
                $this->log('$options='.print_r($options, true));
                $timeStart = $options->schedule->timeStart;
                $timeEnd = $options->schedule->timeEnd;
                $pattern = '/^(\d\d):(\d\d)/';
                $error = false;
                if (preg_match($pattern, $timeStart, $matches)) {
                    $timeStartHours = intval($matches[1]);
                    $timeStartMinutes = intval($matches[2]);
                    $this->log("1 $timeStartHours $timeStartMinutes");
                    $error = !($timeStartHours < 24 && $timeStartMinutes <60);
                } else {
                    $error = true;
                }
                if ($error) {
                    $error = "Invalid timeStart=$timeStart";
                }
                if (!$error) {
                    if (preg_match($pattern, $timeEnd, $matches)) {
                        $timeEndHours = intval($matches[1]);
                        $timeEndMinutes = intval($matches[2]);
                        $this->log("2 $timeEndHours $timeEndMinutes");

                        $error = !($timeEndHours < 24 && $timeEndMinutes < 60 &&
                            ($timeEndHours > $timeStartHours ||
                                $timeEndHours == $timeStartHours && $timeEndMinutes > $timeStartMinutes));
                    } else {
                        $error = true;
                    }
                    if ($error) {
                        $error = "Invalid timeEnd=$timeEnd";
                    }
                }
                if ($error) {
                    return $this->badRequestResponse($error);
                }
                $interval = $options->schedule->interval;
            } else {
                return $this->dbErrorResponse(print_r($statement->errorInfo(), true));
            }
        } catch (\PDOException $e) {
            return $this->dbErrorResponse($e->getMessage());
        }

        $sql = <<<SQL
INSERT IGNORE excursion
(`when`, type_id, participants_limit, guide_id)
VALUES (:when, :type_id, :participants, 1)
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $dateFrom = new \DateTime($input['dateFrom']);
            $dateTo = new \DateTime($input['dateTo']);
            $dateTo->setTime($timeEndHours, $timeEndMinutes);
            $dateTime = clone $dateFrom;
            $dateTime->setTime($timeStartHours, $timeStartMinutes);
            $dateInterval = \DateInterval::createFromDateString('1 day');
            $timeInterval = \DateInterval::createFromDateString("$interval minutes");
            $counter = 0;
            do {
                $dateTimeEnd = clone $dateTime;
                $dateTimeEnd->setTime($timeEndHours, $timeEndMinutes);
                do {
                    $this->log($dateTime->format('Y-m-d H:i'));
                    $result = $statement->execute([
                        'type_id' => $type_id,
                        'when' => $dateTime->format('Y-m-d H:i'),
                        'participants' => $excursionType->participants,
                    ]);
                    if ($result) {
                        $this->log('excursion added = '.$statement->rowCount());
                        $counter += $statement->rowCount();
                    } else {
                        $this->log('excursion add failed');
                    }
                    $dateTime->add($timeInterval);
                } while($dateTime <= $dateTimeEnd);
                $dateTime->setTime($timeStartHours, $timeStartMinutes);
                $dateTime->add($dateInterval);
            } while ($dateTime <= $dateTo);
            //return $this->dbErrorResponse('not implemented');

        } catch (\PDOException $e) {
            //exit($e->getMessage());
            return $this->dbErrorResponse($e->getMessage());
        } catch (\Exception $e) {
            return $this->dbErrorResponse($e->getMessage());
        }
        //return $this->json201Response("Добавлено экскурсий $counter");
        return $this->json201Response($counter);
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

    private function getExcursionDatesAllTypes() {
        $this->log('getExcursionDatesAllTypes()');
        $sql = <<<SQL
SELECT distinct DATE(`when`) as date
FROM excursion WHERE `when` >= DATE(NOW()) ORDER BY 1;
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([]);
            $result = $statement->fetchAll(\PDO::FETCH_COLUMN);
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

    private function getExcursionOfficeTickets($excursion_id) {
        $sql = <<<SQL
SELECT e.fullcost_tickets, e.discount_tickets, e.free_tickets, participants_limit,
       SUM(IFNULL(p.fullcost_tickets,0)+IFNULL(p.discount_tickets,0)+IFNULL(p.free_tickets,0)) AS site_tickets
FROM excursion e
LEFT JOIN participant p ON p.excursion_id=e.id AND p.status IN ('sold', 'reserved')
WHERE e.id=?
GROUP BY e.id;
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $result = $statement->execute([$excursion_id]);
            $result = $statement->fetch(\PDO::FETCH_ASSOC);
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
ORDER BY datetime;
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
ORDER BY datetime;
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
