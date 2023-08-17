<?php
include_once "connection.inc.php";

$sqls = array();

array_push(
    $sqls,
    "CREATE TABLE tb_usuario (
    id int UNSIGNED NOT NULL AUTO_INCREMENT,
    nome varchar(100) NOT NULL,
    nascimento date,
    cidade varchar(100),
    uf varchar(2),
    pais varchar(50),
    email varchar(100) NOT NULL,
    telefone varchar(15) default NULL,
    senha varchar(20) NOT NULL default '',
    PRIMARY KEY  (id),
    UNIQUE(email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
);


foreach ($sqls as $sql) {
    try {
      if ($pdo->prepare($sql)->execute()) {
        printf("<b>Table created successfully.</b><br />");
        printf("<pre>$sql</pre>");
      }
    }
    catch (Exception $e) {
      printf("<b>Could not create table.</b><br />");
      printf($e);
    }

    echo "<hr/>";
}

exit;


?>