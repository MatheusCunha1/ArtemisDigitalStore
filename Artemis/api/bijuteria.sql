-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29/06/2023 às 18:52
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bijuteria`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_categoria`
--

CREATE TABLE `tb_categoria` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_categoria`
--

INSERT INTO `tb_categoria` (`id`, `nome`) VALUES
(1, 'Relógio '),
(2, 'Brinco'),
(3, 'Colares'),
(4, 'Pulseiras');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_compra`
--

CREATE TABLE `tb_compra` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `valor` float NOT NULL,
  `data_compra` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_compra_produto`
--

CREATE TABLE `tb_compra_produto` (
  `compra_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `quantidade` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_produto`
--

CREATE TABLE `tb_produto` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `preco` float NOT NULL,
  `quantidade` int(11) NOT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_produto`
--

INSERT INTO `tb_produto` (`id`, `nome`, `descricao`, `preco`, `quantidade`, `imagem`, `categoria_id`) VALUES
(2, 'Relógio', 'O relógio Rolex apresenta um movimento automático de alta qualidade, que garante uma precisão perfeita ao medir o tempo. Seu mostrador é elegante e legível, com marcadores distintos e ponteiros luminosos para facilitar a leitura.', 1000, 20, NULL, 1),
(9, 'Pulseira', 'A Pulseira Rolex é uma obra-prima de artesanato e estilo. Seu design meticuloso e acabamento impecável demonstram a excelência e a dedicação da marca. Feita com materiais de primeira qualidade, esta pulseira é uma expressão de elegância e sofisticação. ', 3000, 30, NULL, 4),
(10, 'Brinco ', 'O Brinco Rolex é uma peça única, criada com maestria e elegância. Seu design sofisticado e detalhes requintados refletem o cuidado e a atenção aos detalhes. Feito com materiais de alta qualidade, este brinco é um símbolo de estilo e bom gosto. ', 4000, 40, NULL, 2),
(11, 'Colar', 'O Colar Rolex é uma joia de destaque, feito com materiais de qualidade e design elegante. Seu estilo refinado e durabilidade excepcional o tornam uma escolha perfeita. Com um pingente exclusivo e charmoso, é uma obra de arte que adiciona elegância ', 500, 50, NULL, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nascimento` date DEFAULT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_usuario`
--

INSERT INTO `tb_usuario` (`id`, `nome`, `email`, `senha`, `nascimento`, `admin`) VALUES
(1, 'Juca de Oliveira', 'jucaoliveira@gmail.com', '123', '1986-04-01', 0),
(2, 'teste', 'teste@gmail.com', '1234', '1985-04-01', 0),
(6, 'root', 'admin', 'admin', '2023-06-09', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tb_categoria`
--
ALTER TABLE `tb_categoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tb_compra`
--
ALTER TABLE `tb_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_compra_usuario` (`usuario_id`);

--
-- Índices de tabela `tb_compra_produto`
--
ALTER TABLE `tb_compra_produto`
  ADD PRIMARY KEY (`compra_id`,`produto_id`),
  ADD KEY `fk_compraproduto_produto` (`produto_id`);

--
-- Índices de tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_produto_categoria` (`categoria_id`);

--
-- Índices de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_categoria`
--
ALTER TABLE `tb_categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `tb_compra`
--
ALTER TABLE `tb_compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tb_compra`
--
ALTER TABLE `tb_compra`
  ADD CONSTRAINT `fk_compra_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `tb_usuario` (`id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `tb_compra_produto`
--
ALTER TABLE `tb_compra_produto`
  ADD CONSTRAINT `fk_compraproduto_compra` FOREIGN KEY (`compra_id`) REFERENCES `tb_compra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_compraproduto_produto` FOREIGN KEY (`produto_id`) REFERENCES `tb_produto` (`id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD CONSTRAINT `fk_produto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `tb_categoria` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
