# API - Exemplo 2

Este é um exemplo de API web desenvolvida em PHP.

O objetivo deste projeto é exemplificar o uso de uma API que visa fornecer e consumir dados em formato JSON.

A API possui as seguintes funcionalidades:

- Criar uma pessoa
  - URL: <code><API_HOME_URL>/user/create.php</code>
- Atualizar uma pessoa
  - URL: <code> <API_HOME_URL>/user/update.php?id=xxx</code>
- Deletar uma pessoa
  - URL: <code> <API_HOME_URL>/user/delete.php?id=xxx</code>
- Obter todas as pessoas
  - URL: <code> <API_HOME_URL>/user/list.php</code>
- Obter uma pessoa pelo ID
  - URL: <code> <API_HOME_URL>/user/list.php?id=xxx</code>

$~$
$~$

___

## Preperando o Banco de Dados

1) Criar um banco de dados no MySql ou MariaDB.
2) Configurar os dados de acesso ao banco de dados (host, usuário, senha e nome do banco de dados) no arquivo <code>connection.inc.php</code>.
3) Criar as tabelas no banco de dados. O arquivo <code>criar_tabelas.php</code> auxilia neste processo. Acesse a partir do navegador a URL <code>http://localhost/backend/api2/db/criar_tabelas.php</code>. Obs.: Altere a URL conforme a estrutura de pastas que a API 2 foi implantada no servidor Web.

$~$
$~$

---

## Exemplo de consumo da API

$~$

### **i. Criar uma pessoa**

**URL**: http://localhost/backend/api2/user/create.php

    Observação: Altere a URL conforme a estrutura de pastas que a aplicação estará disponibilizada dentro do servidor Web.

**Método HTTP**: GET ou POST

**Conteúdo do body**: 

```
{    
    "nome":"Antonio Oliveira",
    "nascimento":"1985-04-01",
    "telefone":"45 998136555",
    "email":"antonio@servmail.com",
    "login":"antonio",
    "senha":"1234"
}
```

$~$

### **ii. Alterar uma pessoa**

**URL**: http://localhost/backend/api2/user/update.php?id=xxx

    Observação: Altere a URL conforme a estrutura de pastas que a aplicação estará disponibilizada dentro do servidor Web.

    O parâmetro ID é o código da pessoa que deve ser atualizada.

**Método HTTP**: GET ou POST

**Conteúdo do body**: 

```
{    
    "nome":"Antonio Oliveira",
    "nascimento":"1985-04-01",
    "telefone":"45 998136555",
    "email":"antonio@servmail.com",
    "login":"antonio"
}
```

$~$

### **iii. Deletar uma pessoa**

**URL**: http://localhost/backend/api2/user/delete.php?id=xxx

    Observação: Altere a URL conforme a estrutura de pastas que a aplicação estará disponibilizada dentro do servidor Web.

    O parâmetro ID é o código da pessoa que deve ser excluída.

**Método HTTP**: GET ou POST

**Conteúdo do body**: Não há

$~$

### **iv. Obter todas as pessoas**

**URL**: http://localhost/backend/api2/user/list.php

    Observação: Altere a URL conforme a estrutura de pastas que a aplicação estará disponibilizada dentro do servidor Web.

**Método HTTP**: GET

**Conteúdo do body**: Não há

$~$

### **v. Obter uma pessoa**

**URL**: http://localhost/backend/api2/user/list.php?id=xxx

    Observação: Altere a URL conforme a estrutura de pastas que a aplicação estará disponibilizada dentro do servidor Web.

    O parâmetro ID é o código da pessoa que deve ser obtida.

**Método HTTP**: GET

**Conteúdo do body**: Não há


$~$

---

$~$

**Diferenças entre a API 1 e a API 2**

As APIs se diferenciam quanto às definições de acesso ao banco de dados. Na API 1, a lógica de manipulação do banco de dados é definida no próprios arquivos controladores. Já, na API 2, as funcionalidades de acesso ao banco de dados estão separadas em uma camada DAO (Data Access Object), implementada na classe UserDAO (arquivo user.dao.php da API 2).
