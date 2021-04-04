<?php

namespace MuseumTicketsPlugin\db;

class ParticipantController extends BaseController
{

    public function addParticipant($request)
    {
        global $wpdb;
        $params = $request->get_json_params();
        $sql = <<<SQL
INSERT INTO participant (excursion_id, lastname, firstname, midname, phone, email, 
when_reserved, fullcost_tickets, discount_tickets, free_tickets, `status`, cost)
VALUES(%d, %s, %s, %s, %s, %s, NOW(), %d, %d, %d, 'reserved', %f)
SQL;
        try {
            $prepared = $wpdb->prepare($sql,
                $params['excursion_id'],
                $params['lastname'],
                $params['firstname'],
                $params['midname'],
                $params['phone'],
                $params['email'],
                $params['fullcost'],
                $params['discount'],
                $params['free'],
                $params['cost']
            );
            $result = $wpdb->query($prepared);
        } catch (\PDOException $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        } catch (\Exception $e) {
            return new \WP_REST_Response($e->getMessage(), 500);
        }

        if ($result) {
            return new \WP_REST_Response('OK', 201);
        }
        //return new \WP_REST_Response('INSERT INTO participant failed', 500);
        return new \WP_Error(0, 'INSERT INTO participant failed', 500);
    }
}