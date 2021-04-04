<?php

namespace MuseumTicketsPlugin;

require dirname(__FILE__) . '/db/BaseController.php';
require dirname(__FILE__) . '/db/ExcursionController.php';

class MuseumTicketsRoutes extends \WP_REST_Controller {
    public function getExcursionController()
    {
        return new db\ExcursionController();
    }

    public function register_routes() {
        $namespace = 'museum-tickets/v1';
//        $base = '/api/';
        $base = '/';

        register_rest_route($namespace, $base.'test', [[
            'methods'       => 'GET',
            'callback'      => [$this, 'test']
        ]]);

        $base = '/excursion/(?P<type_id>\d+)/dates';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getAvalableDates']
        ]);

        $base = '/excursion/(?P<type_id>\d+)/date/(?P<date>\d\d\d\d-\d\d-\d\d)';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getExcursionsForDate']
        ]);

    }

    public function test($request) {
        
        
        $data = 'test-string';
        return new \WP_REST_Response($data, 200);
    }

    public function test1($request) {
        $data = print_r($request['URL'], true);
        return new \WP_REST_Response($data, 200);
    }   
}
