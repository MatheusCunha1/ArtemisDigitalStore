const URL_API = 'http://localhost/bijuteria/api/user';

// Função para enviar o formulário e cadastrar o usuário
const cadastrarUsuario = () => {
    // Obter os valores dos campos do formulário
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const nascimento = document.getElementById('nascimento').value;
    const senha = document.getElementById('password').value;

    // Cria um objeto representando o usuário
    const user = { nome, email, nascimento, senha };

    // Envia a requisição para cadastrar o usuário
    fetch(`${URL_API}/create.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(async (response) => {
            if (response.status == 200 || response.status == 201) {
                // Cadastro realizado com sucesso
                alert('Cadastro efetuado com sucesso!');
            } else if (response.status == 400) {
                // Erro de validação
                const data = await response.json();
                throw new Error(data.message);
            } else {
                // Outro erro
                throw new Error('Ocorreu um erro ao cadastrar o usuário.');
            }
        })
        .catch((error) => {
            console.error(error);
            alert('Erro: ' + error.message);
        });
};

// Evento de clique no botão "Cadastrar"
const btnCadastrar = document.querySelector('.btn-cadastrar');
btnCadastrar.addEventListener('click', cadastrarUsuario);


