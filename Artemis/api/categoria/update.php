<?php
include("../enable-cors.php");
include("../validate-jwt.inc.php");
include("../validate-admin.inc.php");

require_once("../db/connection.inc.php");
require_once("categoria.dao.php");

$categoriaDAO = new CategoriaDAO($pdo);

// Obter o corpo da requisição
$json = file_get_contents('php://input');

// Transforma o JSON em um Objeto PHP
$categoria = json_decode($json);

$id = @$_REQUEST['id'];

$responseBody = '';

if (!$id) {
    http_response_code(400);
    $responseBody = '{ "message": "ID não informado" }';
} else {
    try {
        $categoriaDAO->update($id, $categoria);
    } catch (Exception $e) {
        // Muda o código de resposta HTTP para 'bad request'
        http_response_code(400);
        $responseBody = '{ "message": "Ocorreu um erro ao tentar executar esta ação. Erro: Código: ' .  $e->getCode() . '. Mensagem: ' . $e->getMessage() . '" }';
    }
}

// Defique que o conteúdo da resposta será um JSON (application/JSON)
header('Content-Type: application/json');

// Exibe a resposta
print_r($responseBody);
