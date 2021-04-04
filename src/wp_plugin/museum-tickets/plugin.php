<?php

namespace MuseumTicketsPlugin;

require_once 'MuseumTicketsPlugin.php';

if( ! defined( 'ABSPATH' ) ) {
    return;
}

function mt_plugin_load() {
    $plugin = new MuseumTicketsPlugin();
    $plugin->load();
}

add_action('plugins_loaded', 'mt_plugin_load');
