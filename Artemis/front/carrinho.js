// Chama a função para atualizar o conteúdo do carrinho no modal quando o modal for exibido
$(document).ready(function () {
    $('#cartModal').on('show.bs.modal', function () {
        atualizarCarrinhoModal();
    });
});

function atualizarCarrinhoModal() {
    console.log("entrou")
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    var modalBody = document.querySelector('#cartModal .modal-body');

    // Limpa o conteúdo atual do carrinho
    modalBody.innerHTML = '';

    // Percorre os itens do carrinho e cria elementos HTML para exibir os detalhes dos produtos
    carrinho.forEach(function (produto, index) {
        var itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        var nomeProduto = document.createElement('span');
        nomeProduto.textContent = produto.nome;

        var precoProduto = document.createElement('span');
        precoProduto.textContent = '  - - - - - - - - - - - - - - - - - - - - - ' + produto.preco;

        var removerBotao = document.createElement('button');
        removerBotao.textContent = 'x';
        removerBotao.addEventListener('click', function () {
            removerItemDoCarrinho(index);
        });

        itemDiv.appendChild(nomeProduto);
        itemDiv.appendChild(precoProduto);
        itemDiv.appendChild(removerBotao);

        modalBody.appendChild(itemDiv);
    });
}



function adicionarAoCarrinho() {
    var produtoId = document.getElementById('produto-id').value;
    var produtoNome = document.getElementById('produto-nome').textContent;
    var produtoPreco = document.getElementById('produto-preco').textContent;
    var quantidade = document.getElementById('produto-quantidade').value;

    // Parseie o preço para um número removendo o "R$" e quaisquer caracteres não numéricos
    var precoNumerico = parseFloat(produtoPreco.replace(/[^\d.,]/g, '').replace(',', '.'));

    // Realize a multiplicação do preço pela quantidade
    var precoTotal = precoNumerico * quantidade;

    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    var item = {
        produto_id: produtoId,
        nome: produtoNome,
        preco: produtoPreco,
        quantidade: quantidade,
        precoTotal: precoTotal // Adicione o preço total ao objeto do item
    };

    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    atualizarCarrinhoModal(); // Atualiza o conteúdo do carrinho no modal
}




// Obtém o botão "Adicionar ao Carrinho" e adiciona o evento de clique
//var btnAdicionarCarrinho = document.getElementById('btnAdicionarCarrinho');
//btnAdicionarCarrinho.addEventListener('click', adicionarAoCarrinho);

function removerItemDoCarrinho(index) {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o item do carrinho usando o índice
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinhoModal(); // Atualiza o conteúdo do carrinho no modal
}





