<?php
include_once "../enable-cors.php";
include("../validate-jwt.inc.php");
include("../validate-admin.inc.php");

require_once "../db/connection.inc.php";
require_once "produto.dao.php";

$produtoDAO = new ProdutoDAO($pdo);

// Obter o corpo da requisição
$json = file_get_contents('php://input');

// Transforma o JSON em um Objeto PHP
$produto = json_decode($json);

$responseBody = '';

try {
    $produto = $produtoDAO->insert($produto);

    $responseBody = json_encode($produto);
} catch (Exception $e) {
    // Muda o código de resposta HTTP para 'bad request'
    http_response_code(400);
    $responseBody = '{ "message": "Ocorreu um erro ao tentar executar esta ação. Erro: Código: ' .  $e->getCode() . '. Mensagem: ' . $e->getMessage() . '" }';
}

// Defique que o conteúdo da resposta será um JSON (application/JSON)
header('Content-Type: application/json');

// Exibe a resposta
print_r($responseBody);
