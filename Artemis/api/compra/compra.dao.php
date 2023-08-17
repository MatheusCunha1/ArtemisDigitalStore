<?php

class CompraDAO
{
    private $pdo;
    
    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function get($id)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra WHERE id = ?");
        $stmt->bindParam(1, $id);

        $stmt->execute();
        return $stmt->fetchObject();
    }

    public function getAll()
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra");
        $stmt->execute();

        // Retorna um array de objetos
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    public function getAllByUser($userid)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra WHERE usuario_id = ?");
        $stmt->bindParam(1, $userid);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    public function insert($compra)
    {
        $stmt = $this->pdo->prepare("INSERT INTO tb_compra (data_compra, valor, usuario_id) VALUES (:data_compra, :valor, :usuario_id)");
        $stmt->bindValue(':data_compra', $compra->data_compra);
        $stmt->bindValue(':valor', $compra->valor);
        $stmt->bindValue(':usuario_id', $compra->usuario_id);

        $stmt->execute();
        $compra = clone $compra;

        $compra->id = $this->pdo->lastInsertId();

        return $compra;
    }

    public function update($id, $compra)
    {
        $stmt = $this->pdo->prepare("UPDATE tb_compra
            SET
                valor = :valor
            WHERE
                id = :id");

        $data = [
            'id' => $id,
            'valor' => $compra->valor
        ];

        return $stmt->execute($data);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE from tb_compra WHERE id = ?");
        $stmt->bindParam(1, $id);

        $stmt->execute();

        return $stmt->rowCount(); // Retorna a quantidade de linhas afetadas
    }
}
