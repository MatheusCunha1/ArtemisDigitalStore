<?php

if (@$userAuth["admin"] != 1) {
    // Muda o código de resposta HTTP para 'Unauthorized'
    http_response_code(401);

    // Define que o conteúdo da resposta será um JSON (application/JSON)
    header('Content-Type: application/json');

    // Exibe a resposta
    print_r('{ "message": "Acesso somente para administradores" }');

    exit; // Encerra o script
}
