<?php

class ProdutoDAO
{
    private $pdo;
    
    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function get($id)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_produto WHERE id = ?");
        $stmt->bindParam(1, $_REQUEST['id']);

        $stmt->execute();
        return $stmt->fetchObject();
    }

    public function getAll()
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_produto");
        $stmt->execute();

        // Retorna um array de objetos
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    public function getByCategoria($categoriaid)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_produto WHERE categoria_id = ?");
        $stmt->bindParam(1, $categoriaid);
        $stmt->execute();

        // Retorna um array de objetos
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    public function insert($produto)
    {
        $stmt = $this->pdo->prepare("INSERT INTO tb_produto (nome, descricao, imagem, preco, quantidade, categoria_id) VALUES (:nome, :descricao, :imagem, :preco, :quantidade, :categoria_id)");
        $stmt->bindValue(':nome', $produto->nome);
        $stmt->bindValue(':descricao', $produto->descricao);
        $stmt->bindValue(':imagem', $produto->imagem);
        $stmt->bindValue(':preco', $produto->preco);
        $stmt->bindValue(':quantidade', $produto->quantidade);
        $stmt->bindValue(':categoria_id', $produto->categoria_id);

        $stmt->execute();
        $produto = clone $produto;

        $produto->id = $this->pdo->lastInsertId();

        return $produto;
    }

    public function update($id, $produto)
    {
        $stmt = $this->pdo->prepare("UPDATE tb_produto
            SET
                nome = :nome,
                descricao = :descricao,
                preco = :preco,
                quantidade = :quantidade,
                imagem = :imagem,
                categoria_id = :categoria_id
            WHERE
                id = :id");

        $data = [
            'id' => $id,
            'nome' => $produto->nome,
            'descricao' => $produto->descricao,
            'preco' => $produto->preco,
            'quantidade' => $produto->quantidade,
            'imagem' => $produto->imagem,
            'categoria_id' => $produto->categoria_id
        ];

        return $stmt->execute($data);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE from tb_produto WHERE id = ?");
        $stmt->bindParam(1, $id);

        $stmt->execute();

        return $stmt->rowCount(); // Retorna a quantidade de linhas afetadas
    }
}
