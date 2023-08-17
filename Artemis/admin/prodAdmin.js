// URL base da API que será consumida
const API = 'http://localhost/bijuteria/api/produto';

// Elemento HTML Table para inserir os produtos
const tbprodutos = document.getElementById('tbprodutos');

/**
 * Função: showProdutoList
 * 
 * Objetivo: Invocar a API, solicitando a lista de produtos cadastrados
 * e apresentar na tabela HTML.
 */
const showProdutoList = () => {
    // Método fetch faz a requisição HTTP para a URL de listagem de produtos    
    fetch(`${API}/list.php`)
        .then(function (response) { // Quando chegar a resposta, converte em JSON
            return response.json();
        })
        .then(function (produtoList) { // Recebe a lista de produtos (do then anterior)

            // Percorre a lista de produtos, adicionando cada um na tabela HTML
            produtoList.forEach(produto => {
                addProdutoTableRow(produto); // Adiciona uma linha na tabela HTML
            })
        });

}

/**
 * Método responsável por adicionar uma linha na tabela HTML para um produto.
 * 
 * @param {*} produto Objeto produto, podendo conter os atributos nome, preço, 
 * descrição, categoria, etc,. como { nome: ..., preço: ..., descrição: ..., categoria: ..., xxxx }.
 */
const addProdutoTableRow = (produto) => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerHTML = produto.nome;

    const td2 = document.createElement('td');
    td2.innerHTML = produto.preco;

    const td3 = document.createElement('td');
    td3.innerHTML = produto.descricao;

    const td4 = document.createElement('td');
    td4.innerHTML = produto.quantidade;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tbprodutos.tBodies[0].appendChild(tr);
}

/**
 * Método responsável por adicionar um novo produto na API e, posteriormente,
 * adicionar na tabela HTML.
 * 
 * @param {*} nome
 * @param {*} preco 
 * @param {*} descricao 
 * @param {*} quantidade 
 * @param {*} categoria 
 */
const addProduto = (nome, preco, descricao, quantidade, categoria) => {
    const token = localStorage.getItem('token'); // Obter o token do localStorage

    const produto = {
        nome: nome,
        preco: preco,
        descricao: descricao,
        quantidade: quantidade,
        categoria_id: categoria
    };

    fetch(`${API}/create.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluir o token no cabeçalho Authorization
        },
        body: JSON.stringify(produto)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.message === 'Produto criado com sucesso.') {
                addProdutoTableRow(produto);
                resetFormProduto();
                closeFormCadastroProduto();
            } else {
                alert('Erro ao criar produto.');
            }
        });
}


/**
 * Função responsável por abrir o formulário de cadastro de produto.
 */
const openFormCadastroProduto = () => {
    const formCadastroProduto = document.getElementById('formCadastroProduto');
    formCadastroProduto.style.display = 'block';
}

/**
 * Função responsável por fechar o formulário de cadastro de produto.
 */
const closeFormCadastroProduto = () => {
    const formCadastroProduto = document.getElementById('formCadastroProduto');
    formCadastroProduto.style.display = 'none';
}

/**
 * Função responsável por limpar os campos do formulário de cadastro de produto.
 */
const resetFormProduto = () => {
    document.getElementById('nomeProduto').value = '';
    document.getElementById('precoProduto').value = '';
    document.getElementById('descricaoProduto').value = '';
    document.getElementById('categoria').selectedIndex = 0;
}

// Chamar a função showProdutoList para exibir os produtos cadastrados na tabela HTML
showProdutoList();
