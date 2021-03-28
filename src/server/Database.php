<?php
namespace Src;

class Database {

    private $dbConnection = null;

    public function __construct()
    {
        $host = 'localhost';
        $port = 3306;
        $db = 'museum';
        $user = 'museum';
        $pass= 'museum';

        try {
            $this->dbConnection = new \PDO(
                "mysql:host=$host;port=$port;dbname=$db",
                $user,
                $pass
            );
        } catch (\PDOException $e) {
            exit('Database ERORL '.$e->getMessage());
        }
    }

    public function connect()
    {
        return $this->dbConnection;
    }
}
