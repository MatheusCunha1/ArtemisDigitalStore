<?php
include_once "../enable-cors.php";
include_once "../validate-jwt.inc.php";
include_once "../validate-admin.inc.php";

require_once "../db/connection.inc.php";
require_once "produto.dao.php";

$produtoDAO = new ProdutoDAO($pdo);

$id = @$_REQUEST['id'];

$responseBody = '';

if (!$id) {
    http_response_code(400);
    $responseBody = '{ "message": "ID não informado" }';
} else {
    try {
        if ($produtoDAO->delete($id) != 1) {
            // Muda o código de resposta HTTP para 'not found'
            http_response_code(404);
            $responseBody = '{ "message": "Produto não encontrado" }';
        }
    } catch (Exception $e) {
        // Muda o código de resposta HTTP para 'bad request'
        http_response_code(400);
        $responseBody = '{ "message": "Ocorreu um erro ao tentar executar esta ação. Erro: Código: ' .  $e->getCode() . '. Mensagem: ' . $e->getMessage() . '" }';
    }
}

// Define que o conteúdo da resposta será um JSON (application/JSON)
header('Content-Type: application/json');

// Exibe a resposta
print_r($responseBody);