CREATE TABLE tb_usuario (
    id INTEGER NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nascimento date,
    admin boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tb_categoria (
    id INTEGER NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tb_produto (
    id INTEGER NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    preco float NOT NULL,
    quantidade INTEGER NOT NULL,
    imagem VARCHAR(255),
    categoria_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id) REFERENCES tb_categoria(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE tb_compra (
    id INTEGER NOT NULL AUTO_INCREMENT,
    usuario_id INTEGER NOT NULL,
    valor float NOT NULL,
    data_compra date NOT NULL DEFAULT CURDATE(),
    PRIMARY KEY (id),
    CONSTRAINT fk_compra_usuario FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE tb_compra_produto (
    compra_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade float NOT NULL,
    PRIMARY KEY (compra_id, produto_id),
    CONSTRAINT fk_compraproduto_compra FOREIGN KEY (compra_id) REFERENCES tb_compra(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_compraproduto_produto FOREIGN KEY (produto_id) REFERENCES tb_produto(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

