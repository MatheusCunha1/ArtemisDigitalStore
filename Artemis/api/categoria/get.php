<?php
include("../enable-cors.php");
require_once("../db/connection.inc.php");
require_once("categoria.dao.php");

$categoriaDAO = new CategoriaDAO($pdo);

$responseBody;

if (@$_REQUEST['id']) { // Retornar um único objeto pelo ID

    if ($res = $categoriaDAO->get($_REQUEST['id']))
        $responseBody = json_encode($res);
    else {
        http_response_code(404);
        $responseBody = '{ "message": "Categoria não existe" }';
    }
} else { // Retornar todos os objetos
    $responseBody = json_encode(
        $categoriaDAO->getAll()
    );
}

header('Content-Type: application/json');
print_r($responseBody);
