<?php


namespace MuseumTicketsPlugin\db;


class ExcursionController extends BaseController
{
    
    public function getAvalableDates($request) {
        global $wpdb;
        $type_id = $request['type_id'];
        $sql = <<<SQL
SELECT distinct DATE(`when`) as date
FROM excursion WHERE type_id= %d AND `when` > NOW() ORDER BY 1;
SQL;
        try {
            $result = $wpdb->get_results($wpdb->prepare($sql,$type_id));
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        return new \WP_REST_Response($result, 200);
    }

    public function getExcursionParticipants($request)
    {
        global $wpdb;
        $id = $request['id'];
        $sql = <<<SQL
SELECT * FROM participant where excursion_id=%d ORDER BY lastname, firstname;
SQL;
        try {
            $result = $wpdb->get_results($wpdb->prepare($sql, $id));
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        return new \WP_REST_Response($result, 200);
    }

    public function getExcursionOfficeTickets($request)
    {
        global $wpdb;
        $id = $request['id'];
        $sql = <<<SQL
SELECT e.fullcost_tickets, e.discount_tickets, e.free_tickets, participants_limit,
       SUM(IFNULL(p.fullcost_tickets,0)+IFNULL(p.discount_tickets,0)+IFNULL(p.free_tickets,0)) AS site_tickets
FROM excursion e
LEFT JOIN participant p ON p.excursion_id=e.id AND p.status IN ('sold', 'reserved')
WHERE e.id=%d
GROUP BY e.id;

SQL;
        try {
            $result = $wpdb->get_results($wpdb->prepare($sql, $id));
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        return new \WP_REST_Response($result[0], 200);
    }

    public function putExcursionOfficeTickets($request)
    {
        global $wpdb;
        $id = $request['id'];
        $params = $request->get_json_params();
        $sql = <<<SQL
UPDATE excursion
SET fullcost_tickets=fullcost_tickets+%d, 
    discount_tickets=discount_tickets+%d, 
    free_tickets=free_tickets+%d
WHERE id=%d
SQL;
        try {
            $prepared = $wpdb->prepare($sql,
                $params['fullcost'],
                $params['discount'],
                $params['free'],
                $id
            );
            $result = $wpdb->query($prepared);
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        return new \WP_REST_Response('OK', 200);
    }

    public function getExcursionsForDate($request)
    {
        global $wpdb;
        $type_id = $request['type_id'];
        $date = $request['date'];
        $sql = <<<SQL
SELECT e.id, participants_limit, `when` AS datetime, 
e.fullcost_tickets+e.discount_tickets+e.free_tickets+
  SUM(IFNULL(ps.fullcost_tickets,0)+IFNULL(ps.discount_tickets,0)+IFNULL(ps.free_tickets,0)) AS sold,
SUM(IFNULL(pr.fullcost_tickets,0)+IFNULL(pr.discount_tickets,0)+IFNULL(pr.free_tickets,0)) AS reserved
FROM excursion e
LEFT JOIN participant ps ON ps.excursion_id=e.id AND ps.status='sold'
LEFT JOIN participant pr ON pr.excursion_id=e.id AND pr.status='reserved'
WHERE type_id=%d AND DATE(`when`)='%s' 
GROUP BY e.id
ORDER BY datetime;
SQL;
        try {
            $result = $wpdb->get_results($wpdb->prepare($sql, $type_id, $date));
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        return new \WP_REST_Response($result, 200);
    }

    public function getExcursionsForDateAdmin($request)
    {
        global $wpdb;
        $type_id = $request['type_id'];
        $date = $request['date'];
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
WHERE type_id=%d AND DATE(`when`)=%s 
GROUP BY e.id
ORDER BY datetime;
SQL;
        try {
            $result = $wpdb->get_results($wpdb->prepare($sql, $type_id, $date));
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        return new \WP_REST_Response($result, 200);
    }

    public function getExcursionDatesAllTypes($request)
    {
        global $wpdb;
        $sql = <<<SQL
SELECT distinct DATE(`when`) as date
FROM excursion WHERE `when` >= DATE(NOW()) ORDER BY 1;
SQL;
        try {
            $result = $wpdb->get_results($wpdb->prepare($sql));
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        $result = array_map(function($item) {
            return $item->date;
        }, $result);
        return new \WP_REST_Response($result, 200);
    }

    public function getExcursionTypes($request)
    {
        global $wpdb;
        $sql = <<<SQL
SELECT * FROM excursion_type
SQL;
        try {
            $result = $wpdb->get_results($wpdb->prepare($sql));
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        return new \WP_REST_Response($result, 200);
    }

    public function getExcursionType($request)
    {
        global $wpdb;
        $type_id = $request['type_id'];
        $sql = <<<SQL
SELECT * FROM excursion_type WHERE id=%d
SQL;
        try {
            $result = $wpdb->get_results($wpdb->prepare($sql, $type_id));
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        return new \WP_REST_Response($result[0], 200);
    }

    public function putExcursionType($request)
    {
        global $wpdb;
        $type_id = $request['type_id'];
        $params = $request->get_json_params();
        /*
        $sql = <<<SQL
UPDATE excursion_type
SET `name`=%s, description=%s, participants=%d, `options`=%s, date_from=%s, date_to=%s
WHERE id=%d
SQL; */
        try {
            //$result = $wpdb->get_results($wpdb->prepare($sql, $type_id));
/*            $prepared = $wpdb->prepare($sql,
                $params['name'],
                $params['description'],
                $params['participants'],
                json_encode($params['options']),
                strlen($params['date_from']) > 0 ? $params['date_from'] : null,
                strlen($params['date_to']) > 0 ? $params['date_to'] : null,
                $type_id);
            $result = $wpdb->query($prepared);*/
            $date_from = $params['date_from'];
            $date_to = $params['date_to'];
            $result = $wpdb->update('excursion_type', [
                'name' => $params['name'],
                'description' => $params['description'],
                'participants' => $params['participants'],
                'options' => json_encode($params['options']),
                'date_from' => strlen($date_from) > 0 ? $date_from : null,
                'date_to' => strlen($date_to) > 0 ? $date_to : null,
            ], [
                'id' => $type_id,
            ], [
                '%s', '%s', '%d', '%s',
                strlen($date_from) > 0 ? '%s' : null,
                strlen($date_to) > 0 ? '%s' : null,
            ], '%d');

        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        } catch (\Exception $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        if ($result) {
            return new \WP_REST_Response('OK', 200);
        }
        return new \WP_Error(0, 'UPDATE excursion_type failed', 500);
    }

    public function addScheduledExcurions($request)
    {
        global $wpdb;
        $params = $request->get_json_params();
        $type_id = $params['typeId'];
        $sql = <<<SQL
SELECT options, participants FROM excursion_type WHERE id=%d
SQL;
        try {
            $result = $wpdb->get_results($wpdb->prepare($sql, $type_id));
            //return new \WP_REST_Response($result[0], 200);
            if ($result) {
                $excursionType = $result[0];
                $options = json_decode($excursionType->options);
                $timeStart = $options->schedule->timeStart;
                $timeEnd = $options->schedule->timeEnd;
                $pattern = '/^(\d\d):(\d\d)/';
                $error = false;
                if (preg_match($pattern, $timeStart, $matches)) {
                    $timeStartHours = intval($matches[1]);
                    $timeStartMinutes = intval($matches[2]);
                    //$this->log("1 $timeStartHours $timeStartMinutes");
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
                    return new \WP_REST_Response($error, 400);
                }
                $interval = $options->schedule->interval;
            } else {
                return new \WP_REST_Response("Invalid type_id=$type_id", 400);
            }
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        $sql = <<<SQL
INSERT IGNORE excursion
(`when`, type_id, participants_limit, guide_id)
VALUES (%s, %d, %d, 1)
SQL;
        try {
            $statement = $this->db->prepare($sql);
            $dateFrom = new \DateTime($params['dateFrom']);
            $dateTo = new \DateTime($params['dateTo']);
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
                    //$this->log($dateTime->format('Y-m-d H:i'));
/*                    $result = $statement->execute([
                        'type_id' => $type_id,
                        'when' => $dateTime->format('Y-m-d H:i'),
                        'participants' => $excursionType->participants,
                    ]);*/

                    $prepared = $wpdb->prepare($sql,
                        $dateTime->format('Y-m-d H:i'),
                        $type_id,
                        $excursionType->participants
                    );
                    $result = $wpdb->query($prepared);

                    if ($result) {
                        //$this->log('excursion added = '.$statement->rowCount());
                        $counter += $wpdb->num_rows;
                    } else {
                        //$this->log('excursion add failed');
                    }
                    $dateTime->add($timeInterval);
                } while($dateTime <= $dateTimeEnd);
                $dateTime->setTime($timeStartHours, $timeStartMinutes);
                $dateTime->add($dateInterval);
            } while ($dateTime <= $dateTo);
            //return $this->dbErrorResponse('not implemented');

        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        } catch (\Exception $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }
        //return new \WP_REST_Response("Добавлено экскурсий $counter", 201);
        return new \WP_REST_Response($counter, 201);
    }

}
