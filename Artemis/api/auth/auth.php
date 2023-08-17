<?php

/**
 * Este script PHP é um recurso de autenticação. Serve para gerar o token do usuário.
 * 
 * O objetivo é receber um JSON, no corpo da requisição HTTP, contendo o login e a senha
 * do usuário.
 * 
 * Na sequência, o login e a senha repassados devem ser avaliados (aqui é feito de maneira fictícia).
 * Se estiverem corretos, então o token é gerado e entregue ao cliente. Caso contrário, 
 * uma mensagem informativa é enviada.
 */

// Inclusão de arquivos
include("../enable-cors.php");
require_once("../db/connection.inc.php");
require_once("../user/user.dao.php");
require_once("../lib/jwtutil.class.php");
require_once("../config.php");


$userDAO = new UserDAO($pdo);

// Obter o conteúdo do corpo da requisição
$json = file_get_contents('php://input');

// Transforma o JSON em um Objeto PHP
$credentials = json_decode($json);

$responseBody = ''; // Variável para armazenar a resposta para o cliente

// Busca um usuário no banco de dados a partir do USERNAME e PASSWORD passados por JSON.
$user = $userDAO->getByEmailAndSenha(@$credentials->username, @$credentials->password);

/**
 * Se o usuário for válido, então gera o token.
 */
if ($user) {
    // Array de dados para ser carregado no token (aceita qualquer atributo e valor).
    $payload = [
        "id" => $user->id,
        "nome" => $user->nome,
        "email" => $user->email,
        "admin" => $user->admin
    ];

    // Gerar o token (codificar), usando a classe disponível no arquivo "jwtutil.class.php"
    $token = JwtUtil::encode($payload, JWT_SECRET_KEY);

    $objetoResposta = (object) [];
    $objetoResposta->token = $token;
    $objetoResposta->user = $user;

    // Gerando a mensagem de resposta para o cliente: um JSON contendo o token.
    $responseBody = json_encode($objetoResposta);
}
/*
 * Caso o usuário e senha sejam inválidos, então uma mensagem 
 * de não autorizado será gerada.
 */else {
    // Muda o código de resposta HTTP para 'Unauthorized'
    http_response_code(401);
    // Mensagem JSON informando que a credencial é inválida
    $responseBody = '{ "message": "Credencial inválida" }';
}

// Defique que o conteúdo da resposta será um JSON (application/JSON)
header('Content-Type: application/json');

// Exibe a resposta
echo $responseBody;