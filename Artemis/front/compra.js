// Obtém o token do local storage
var token = localStorage.getItem('token');

function criarCompra() {
    console.log("Criar compra");

    console.log( getCarrinho());

    const compra = {
        valor: 0,
        item: getCarrinho()
    };

    console.log(compra);

    // Realiza uma requisição AJAX para o arquivo create.php
    fetch('http://localhost/bijuteria/api/compra/create.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(compra)
    })
        .then(function (response) {
            if (response.status == 200) {
                response.json().then(data => {
                    console.log(data);
                })
            }
            else {
                response.text().then(message => {
                    console.log(message);
                })
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}


function getCarrinho() {
    // Obtém os itens do carrinho do local storage
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}
