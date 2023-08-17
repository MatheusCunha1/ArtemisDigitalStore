<?php

class UserDAO
{
    private $pdo;
    
    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function get($id)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_usuario WHERE id = ?");
        $stmt->bindParam(1, $_REQUEST['id']);

        $stmt->execute();
        return $stmt->fetchObject();
    }

    public function getByEmailAndSenha($email, $senha)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT id, nome, nascimento, email, admin FROM tb_usuario WHERE email = ? AND senha = ? LIMIT 1");
        $stmt->bindParam(1, $email);
        $stmt->bindParam(2, $senha);

        $stmt->execute();
        return $stmt->fetchObject();
    }

    public function getAll()
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_usuario");
        $stmt->execute();

        // Retorna um array de objetos
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    public function insert($user)
    {
        $stmt = $this->pdo->prepare("INSERT INTO tb_usuario (nome, nascimento, email, senha) VALUES (:nome, :nascimento, :email, :senha)");
        $stmt->bindValue(':nome', $user->nome);
        $stmt->bindValue(':nascimento', $user->nascimento);
        $stmt->bindValue(':email', $user->email);
        $stmt->bindValue(':senha', $user->senha);

        $stmt->execute();
        $user = clone $user;

        $user->id = $this->pdo->lastInsertId();

        return $user;
    }

    public function update($id, $user)
    {
        $stmt = $this->pdo->prepare("UPDATE tb_usuario
            SET
                nome = :nome,
                nascimento = :nascimento,
                email = :email
            WHERE
                id = :id");

        $data = [
            'id' => $id,
            'nome' => $user->nome,
            'nascimento' => $user->nascimento,
            'email' => $user->email,
        ];

        return $stmt->execute($data);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE from tb_usuario WHERE id = ?");
        $stmt->bindParam(1, $id);

        $stmt->execute();

        return $stmt->rowCount(); // Retorna a quantidade de linhas afetadas
    }
}
