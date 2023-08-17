<?php
include_once "../enable-cors.php";
include_once "../validate-jwt.inc.php";
include_once "../validate-admin-or-user.inc.php";
validarUsuario($_REQUEST["id"]);

require_once "../db/connection.inc.php";
require_once "user.dao.php";

$userDAO = new UserDAO($pdo);

$id = @$_REQUEST['id'];

$responseBody = '';

if (!$id) {
    http_response_code(400);
    $responseBody = '{ "message": "ID não informado" }';
} else {
    try {
        if ($userDAO->delete($id) != 1) {
            // Muda o código de resposta HTTP para 'not found'
            http_response_code(404);
            $responseBody = '{ "message": "Usuário não encontrado" }';
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