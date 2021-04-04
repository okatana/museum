<?php

namespace MuseumTicketsPlugin;

add_action('rest_api_init', function () {
    $controller = new MuseumTicketsRoutes();
    $controller->register_routes();
});