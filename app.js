const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para analisar solicitações com corpo JSON
app.use(bodyParser.json());

// Dados de exemplo (simulando um banco de dados)
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// Rota para obter todos os usuários
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Rota para adicionar um novo usuário
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
