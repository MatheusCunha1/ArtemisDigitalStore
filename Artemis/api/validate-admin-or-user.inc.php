<?php

/**
 * Verifica se o id passado na função é o mesmo do usuário autenticado.
 * Caso não seja, interrompe a execução do script e gera a resposta ao cliente.
 */
function validarUsuario($userId)
{
    global $userAuth;

    if (@$userAuth["admin"] != 1 && $userId != @$userAuth["id"]) {
        // Muda o código de resposta HTTP para 'Unauthorized'
        http_response_code(401);

        // Define que o conteúdo da resposta será um JSON (application/JSON)
        header('Content-Type: application/json');

        // Exibe a resposta
        print_r('{ "message": "Sem permissão de acesso" }');

        exit; // Encerra o script
    }
}
