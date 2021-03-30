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
            $this->dbConnection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this->dbConnection->exec("SET NAMES 'utf8'");
            $this->dbConnection->exec("SET character_set_client = utf8");
        } catch (\PDOException $e) {
            exit('Database ERORL '.$e->getMessage());
        }
    }

    public function connect()
    {
        return $this->dbConnection;
    }
}
