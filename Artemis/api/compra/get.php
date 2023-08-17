<?php
include_once "../enable-cors.php";
include_once "../validate-jwt.inc.php";
include_once "../validate-admin-or-user.inc.php";

require_once "../db/connection.inc.php";

require_once "compra.dao.php";
require_once "itemcompra.dao.php";

$compraDAO = new CompraDAO($pdo);
$itemCompraDAO = new ItemCompraDAO($pdo);

$responseBody;

if (@$_REQUEST['id']) { // Retornar um único objeto pelo ID

    if ($res = $compraDAO->get(@$_REQUEST['id'])) {
        // Verificar se tem permissão para deletar a compra.
        if($res)
            validarUsuario($res->usuario_id);

        // Setando os itens da compra
        $res->itens = $itemCompraDAO->getByCompra($res->id);

        $responseBody = json_encode($res);
    }
    else {
        http_response_code(404);
        $responseBody = '{ "message": "Compra não existe" }';
    }
} elseif (@$_REQUEST['todos'] == 1) { // Retornar todas as compras (somente para admin)
    include_once "../validate-admin.inc.php";

    $responseBody = json_encode($compraDAO->getAll());
}
else { // Retornar todos os objetos do usuário autenticado
    $responseBody = json_encode(
        $compraDAO->getAllByUser($userAuth["id"])
    );
}

header('Content-Type: application/json');
print_r($responseBody);
