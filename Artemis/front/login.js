// Constante para armazenar a URL da API de autenticação
const URL_API = 'http://localhost/bijuteria/api/auth';


// Função para enviar o formulário e autenticar o usuário
const autenticarUsuario = () => {
    // Obter os valores dos campos do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Cria um objeto representando as credenciais do usuário
    const credentials = { username: email, password: senha };

    // Envia a requisição para autenticar o usuário
    fetch(`${URL_API}/auth.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
        .then(async (response) => {
            if (response.status == 200) {
                const data = await response.json();
                const token = data.token;
                const userData = data.user;

                // Armazene o token no localStorage
                localStorage.setItem('token', token);
                // Armazene os dados do usuário no localStorage
                localStorage.setItem('user', JSON.stringify(userData));


                // Verificar se o usuário é admin
                const adminValue = parseInt(userData.admin);

                if (adminValue === 1) {
                    console.log('Redirecionando para admin.html');
                    window.location.href = 'http://localhost/bijuteria/admin/admin.html';
                } else if (adminValue === 0) {
                    console.log('Redirecionando para home.html');
                    window.location.href = 'http://localhost/bijuteria/front/home.html';
                } else {
                    console.log('Valor inválido para o campo admin:', adminValue);
                }



            } else if (response.status == 401) {
                const data = await response.json();
                throw new Error(data.message);
            } else {
                throw new Error('Ocorreu um erro ao efetuar o login.');
            }
        })
        .catch((error) => {
            console.error(error);
            alert('Erro: ' + error.message);
        });
};

// Evento de clique no botão "Entrar"
const btnEntrar = document.querySelector('.btn-entrar');
btnEntrar.addEventListener('click', autenticarUsuario);

