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
}
