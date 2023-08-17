<?php

class ItemCompraDAO
{
    private $pdo;
    
    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Obter um item de compra pelo ID.
     */
    public function get($id)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra_produto WHERE id = ?");
        $stmt->bindParam(1, $id);

        $stmt->execute();
        return $stmt->fetchObject();
    }


    /**
     * Obter todos os itens de uma compra
     */
    public function getByCompra($compraid)
    {
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra_produto WHERE compra_id = ?");
        $stmt->bindParam(1, $compraid);

        $stmt->execute();
        // Retorna um array de objetos
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /**
     * Inserir um item de compras
     */
    public function insert($item)
    {
        $stmt = $this->pdo->prepare("INSERT INTO tb_compra_produto (compra_id, produto_id, quantidade) VALUES (:compra_id, :produto_id, :quantidade)");
        $stmt->bindValue(':compra_id', $item->compra_id);
        $stmt->bindValue(':produto_id', $item->produto_id);
        $stmt->bindValue(':quantidade', $item->quantidade);

        $stmt->execute();
        $item = clone $item;

        return $item;
    }

    /**
     * Atualizar um item de compra
     */
    public function update($id, $item)
    {
        $stmt = $this->pdo->prepare("UPDATE tb_compra_produto
            SET
                quantidade = :quantidade
            WHERE
                id = :id");

        $data = [
            'id' => $id,
            'quantidade' => $item->quantidade
        ];

        return $stmt->execute($data);
    }

    /**
     * Deletar um item de compra
     */
    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE from tb_compra_produto WHERE id = ?");
        $stmt->bindParam(1, $id);

        $stmt->execute();

        return $stmt->rowCount(); // Retorna a quantidade de linhas afetadas
    }
}
