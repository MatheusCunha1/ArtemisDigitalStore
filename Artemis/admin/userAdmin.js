// URL base da API que será consumida
const URL_API = 'http://localhost/bijuteria/api/user';

// Elemento HTML Table para inserir os usuários
const tbusers = document.getElementById('tbusers');

/**
 * Função: showUserList
 * 
 * Objetivo: Invocar a API, solicitando a lista de usuários cadastrados
 * e apresentar na tabela HTML.
 */
const showUserList = () => {
    // Método fetch faz a requisição HTTP para a URL de listagem de usuários    
    fetch(`${URL_API}/list.php`)
        .then(function (response) { // Quando chegar a resposta, converte em JSON
            return response.json();
        })
        .then(function (userList) { // Recebe a lista de usuários (do then anterior)
            // Percorre a lista de usuários, adicionando cada um na tabela HTML
            userList.forEach(user => {
                addTableRow(user); // Adiciona uma linha na tabela HTML
            })
        });
}

/**
 * Método responsável por adicionar uma linha na tabela HTML.
 * 
 * @param {*} user Objeto usuário, podendo conter os atributos nome, email, 
 * nascimento, telefone, etc,. como  { nome: ..., email: ..., nascimento: ..., xxxx }.
 */
const addTableRow = (user) => {
    // Criar um objeto que representa uma linha de tabela (elemento <tr>)
    const tr = document.createElement('tr');

    // Criar um objeto que representa uma célula da linha (elemento <td>)
    // Primeira célula da linha = nome do usuário
    const td1 = document.createElement('td');
    td1.innerHTML = user.nome; // Seta o texto do elemento

    // Criar um objeto que representa uma célula da linha (elemento <td>)
    // Segunda célula da linha = e-mail do usuário
    const td2 = document.createElement('td');
    td2.innerHTML = user.email; // Seta o texto do elemento

    // Criar um objeto que representa uma célula da linha (elemento <td>)
    // Terceira célula da linha = data de nascimento do usuário
    const td3 = document.createElement('td');
    td3.innerHTML = user.nascimento; // Seta o texto do elemento

    // Criar um objeto que representa uma célula da linha (elemento <td>)
    // Quarta célula da linha = botões de ação
    const td4 = document.createElement('td');

    // Criar o botão para remover o usuário
    const btRemove = document.createElement('button');
    btRemove.innerHTML = "Excluir"; // Seta o texto do elemento
    btRemove.classList.add("btn"); // Define uma classe (CSS)
    btRemove.classList.add("btn-sm"); // Define uma classe (CSS)
    btRemove.classList.add("btn-danger"); // Define uma classe (CSS)
    btRemove.onclick = function () { // Define a ação de clique do botão
        del(tr, user); // Invoca a função JS para deletar o usuário
    };

    td4.appendChild(btRemove); // Adicionar o botão na célula TD4

    tr.appendChild(td1); // Adiciona a célula TD1 na linha (tr)
    tr.appendChild(td2); // Adiciona a célula TD2 na linha (tr)
    tr.appendChild(td3); // Adiciona a célula TD3 na linha (tr)
    tr.appendChild(td4); // Adiciona a célula TD4 na linha (tr)

    // Adicionando a linha (tr) no corpo <tbody> da tabela
    tbusers.tBodies[0].appendChild(tr);
}

/**
 * Método responsável por adicionar um novo usuário na API e, posteriormente,
 * adicionar na tabela HTML.
 * 
 * @param {*} nome
 * @param {*} email 
 * @param {*} nascimento 
 * @param {*} senha 
 */
const add = (nome, email, nascimento, senha) => {
    // Cria um objeto representando o usuário
    const user = { nome, email, nascimento, senha };
    console.log(user);

    // Invoca a URL da API responsável por adicionar um usuário
    fetch(`${URL_API}/create.php`, {
        method: "POST", // Método HTTP 
        headers: { // Cabeçalhos da requisição
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) // Corpo da requisição
    })
        .then(async response => {
            // Caso o código de status da resposta seja 200 ou 201, 
            // então transforma o conteúdo da resposta em JSON
            if (response.status == 200 || response.status == 201)
                return response.json();
            // Caso o código de status da resposta seja 400
            // então lança uma exceção, contendo o texto da mensagem
            // devolvida pela API
            else if (response.status == 400)
                throw new Error((await response.json()).message);
            // Caso outro código seja retornado, então transforma
            // a resposta em texto.                
            else
                throw new Error(await response.text());
        })
        .then(data => {
            console.log(data)
            addTableRow(data); // Adiciona o usuário da tabela HTML
            closeFormCadastro();
        })
        .catch(err => { // Caso apresente erro, entre neste catch
            console.log(err);
            alert(err);
        });
}

/**
 * Método responsável por deletar um usuário na API e remover a linha na tabela.
 * 
 * @param {*} tr Objeto de referência para a linha da tabela
 * @param {*} user Objeto usuário
 */
const del = (tr, user) => {
    console.log("Deletar o usuário: " + user.id);

    fetch(`${URL_API}/delete.php?id=${user.id}`, { method: "POST" })
        .then(response => {
            console.log(response);

            if (response.status == 200) {
                const tableBody = tr.parentNode; // Obter o elemento pai (tbody) da linha da tabela
                tableBody.removeChild(tr); // Remover a linha da tabela
            } else {
                alert("Falha ao remover " + user.nome);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

// Invoca o método showUserList() para atualizar a lista de usuários na página
showUserList();

function openFormCadastro() {
    const div = document.getElementById("formCadastro");
    div.style.display = "block";

    resetForm();
}

function closeFormCadastro() {
    const div = document.getElementById("formCadastro");
    div.style.display = "none";

    resetForm();
}

function resetForm() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("nascimento").value = "";
    document.getElementById("senha").value = "";
}
