// URL base da API
const API_URL = 'http://localhost/bijuteria/api/categoria';

// Função para enviar os dados do formulário para a API
const enviarFormulario = (event) => {
  const token = localStorage.getItem('token'); // Obter o token do localStorage
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário

  // Obtém os dados do formulário
  const nome = document.getElementById('cat').value;

  // Cria um objeto com os dados da categoria
  const categoria = {
    nome: nome
  };

  // Envia a requisição POST para a API
  fetch(`${API_URL}/create.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token // Incluir o token no cabeçalho Authorization
    },
    body: JSON.stringify(categoria)
  })
    .then(response => response.json())
    .then(data => {
      // Exibe uma mensagem de sucesso
      console.log('Categoria inserida com sucesso:', data);
    })
    .catch(error => {
      // Exibe uma mensagem de erro
      console.error('Erro ao inserir categoria:', error);
    });
};

// Obtém o formulário pelo seu ID
const form = document.getElementById('categoriaForm');

// Adiciona um listener para o evento de submit do formulário
form.addEventListener('submit', enviarFormulario);
