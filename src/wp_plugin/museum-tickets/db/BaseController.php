<?php
namespace MuseumTicketsPlugin\db;

class BaseController {
    protected $db;

    public function __construct($db)
    {
        global $wpdb;
        $this->db = $wpdb;
    }

}
