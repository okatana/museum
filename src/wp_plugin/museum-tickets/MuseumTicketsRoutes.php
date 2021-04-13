<?php

namespace MuseumTicketsPlugin;

require dirname(__FILE__) . '/db/BaseController.php';
require dirname(__FILE__) . '/db/ExcursionController.php';
require dirname(__FILE__) . '/db/ParticipantController.php';

class MuseumTicketsRoutes extends \WP_REST_Controller {
    public function getExcursionController()
    {
        return new db\ExcursionController();
    }

    public function getParticipantController()
    {
        return new db\ParticipantController();
    }

    public function register_routes() {
        $namespace = 'museum-tickets/v1';
        $base = '/';

        register_rest_route($namespace, $base.'test', [[
            'methods'       => 'GET',
            'callback'      => [$this, 'test']
        ]]);

        $base = '/excursion/(?P<type_id>\d+)/dates';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getAvalableDates'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/excursion/(?P<type_id>\d+)/date/(?P<date>\d\d\d\d-\d\d-\d\d)';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getExcursionsForDate'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/excursion/(?P<type_id>\d+)/date/(?P<date>\d\d\d\d-\d\d-\d\d)/admin';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getExcursionsForDateAdmin'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/excursion/(?P<id>\d+)/participants';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getExcursionParticipants'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/excursion/(?P<id>\d+)/office-tickets';
        register_rest_route($namespace, $base, [
            [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getExcursionOfficeTickets'],
            'args'          => [],
            'permission_callback' => function() {return true;}
            ],
            [
            'methods'       => 'PUT',
            'callback'      => [$this->getExcursionController(), 'putExcursionOfficeTickets'],
            'args'          => [],
            'permission_callback' => function() {return true;}
            ]
        ]);

        $base = '/excursions/schedule';
        register_rest_route($namespace, $base, [
            'methods'       => 'POST',
            'callback'      => [$this->getExcursionController(), 'addScheduledExcurions'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/excursion/dates/all-types';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getExcursionDatesAllTypes'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/excursion_types';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getExcursionTypes'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/excursion_type/(?P<type_id>\d+)';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getExcursionController(), 'getExcursionType'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/excursion_type/(?P<type_id>\d+)';
        register_rest_route($namespace, $base, [
            'methods'       => 'PUT',
            'callback'      => [$this->getExcursionController(), 'putExcursionType'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/participants';
        register_rest_route($namespace, $base, [
            'methods'       => 'POST',
            'callback'      => [$this->getParticipantController(), 'addParticipant'],
            'args'          => [],
            'permission_callback' => function() {return true;}
        ]);

        $base = '/participants/date/(?P<date>\d\d\d\d-\d\d-\d\d)';
        register_rest_route($namespace, $base, [
            'methods'       => 'GET',
            'callback'      => [$this->getParticipantController(), 'getParticipantsList'],
            'args'          => [],
            'permission_callback' => function() {return true;}
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
