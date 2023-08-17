<?php

error_reporting(E_STRICT);

include_once "../enable-cors.php";
include_once "../validate-jwt.inc.php";


require_once "../db/connection.inc.php";
require_once "compra.dao.php";
require_once "itemcompra.dao.php";


$compraDAO = new CompraDAO($pdo);
$itemCompraDAO = new ItemCompraDAO($pdo);

// Obter o corpo da requisição
$json = file_get_contents('php://input');

// Transforma o JSON em um Objeto PHP
$compra = json_decode($json);

$responseBody = '';

try {
    $compra->data_compra = date('Y-m-d'); // Seta a data de compra a partir do sistema
    $compra->usuario_id = $userAuth["id"]; // Obtém o ID do usuário autenticado.
    $compra = $compraDAO->insert($compra);

    foreach($compra->itens as $item) {
        $item->compra_id = $compra->id;
        $itemCompraDAO->insert($item);
    }

    $responseBody = json_encode($compra);
} catch (Exception $e) {
    // Muda o código de resposta HTTP para 'bad request'
    http_response_code(400);
    $responseBody = '{ "message": "Ocorreu um erro ao tentar executar esta ação. Erro: Código: ' .  $e->getCode() . '. Mensagem: ' . $e->getMessage() . '" }';
}

// Defique que o conteúdo da resposta será um JSON (application/JSON)
header('Content-Type: application/json');

// Exibe a resposta
print_r($responseBody);
