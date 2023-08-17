const API = "http://localhost/bijuteria/api";

// Função para obter parâmetros da URL  home.js
function getParameters() {
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });

    return data;
}

console.log(getParameters());



// categoria.html

const params = getParameters()['categoria'] ? `?categoria=${getParameters()['categoria']}` : '';

fetch(`${API}/produto/get.php${params}`)
    .then(function (response) {
        if (response.ok) {
            return response.json(); // Retorna os produtos em formato JSON
        }
        throw new Error('Erro ao obter os produtos.');
    })
    .then(function (produtos) {
        exibirProdutos(produtos); // Chama a função para exibir os produtos
    })
    .catch(function (error) {
        console.error(error);
    });





// Função para exibir os produtos na página inicial
function exibirProdutos(produtos) {
    var produtosContainer = document.getElementById('produtos-container');

    // Limpar conteúdo atual
    produtosContainer.innerHTML = '';

    // Percorrer os produtos e criar elementos HTML para cada um
    produtos.forEach(function (produto) {
        var card = document.createElement('div');
        card.className = 'card';

        var dataImage = document.createElement('img');
        dataImage.src = 'https://trevisostore.com/cdn/shop/products/imagem_2023-02-16_145354418.png?v=1676570436';
        dataImage.className = 'card-img-top';
        dataImage.alt = 'Imagem de exemplo';

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = produto.nome;

        var price = document.createElement('p');
        price.className = 'card-text';
        price.textContent = 'R$ ' + produto.preco + ' à vista, ou 12x de R$ ' + (produto.preco / 12).toFixed(2) + ' sem juros';

        var form = document.createElement('form');
        form.action = ''; // Defina a ação adequada para o formulário
        form.method = 'POST';

        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'id';
        input.value = produto.id;

        var button = document.createElement('button');
        button.type = 'submit';
        button.className = 'btn btn-success';
        button.textContent = 'Detalhes do produto';

        // Adicionar evento de clique ao botão "Comprar"
        button.addEventListener('click', function (event) {
            event.preventDefault();
            var productId = produto.id;
            redirectToProductDetails(productId);
        });

        form.appendChild(input);
        form.appendChild(button);

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(form);

        card.appendChild(dataImage);
        card.appendChild(cardBody);

        produtosContainer.appendChild(card);
    });
}




//  detalhes do produto
function redirectToProductDetails(id) {
    window.location.href = `detalheProduto.html?id=${id}`;
}


// detalheProduto.html

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(`${API}/produto/get.php?id=${id}`)
    .then(function (response) {
        if (response.ok) {
            return response.json(); // Retorna os dados do produto em formato JSON
        }
        throw new Error('Erro ao obter os dados do produto.');
    })
    .then(function (produto) {
        showDetalheProduto(produto); // Chama a função para exibir os dados do produto
    })
    .catch(function (error) {
        console.error(error);
    });

// Função para exibir os dados do produto na página de detalhes
function showDetalheProduto(produto) {
    document.getElementById('produto-nome').textContent = produto.nome;
    document.getElementById('produto-descricao').textContent = produto.descricao;
    document.getElementById('produto-quantidade').textContent = 'Quantidade : ' + (produto.quantidade);
    document.getElementById('produto-preco').textContent = 'R$:' + (produto.preco);
    document.getElementById('produto-id').value = produto.id;

}



/*


function criarCompra(carrinho) {
    // Realiza uma requisição AJAX para o arquivo create.php
    fetch('caminho/para/compra/create.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrinho)
    })
        .then(function (response) {
            if (response.ok) {
                return response.json(); // Retorna os dados da compra em formato JSON
            }
            throw new Error('Erro ao criar a compra.');
        })
        .then(function (compra) {
            console.log('Compra criada:', compra);
            // Aqui você pode realizar alguma ação adicional após a criação da compra
        })
        .catch(function (error) {
            console.error(error);
        });
}

// Obtém os itens do carrinho do local storage
var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Chama a função para criar a compra no banco de dados
criarCompra(carrinho);
//

*/