const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'eydos' // Nome do seu banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Rota para obter todos os usuários
app.get('/api/users', (req, res) => {
    connection.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(results);
    });
});

// Encerrar a conexão com o banco de dados quando a aplicação é encerrada
process.on('SIGINT', () => {
    connection.end();
    process.exit();
});


/* 
// Middleware para analisar solicitações com corpo JSON
app.use(bodyParser.json());

// Dados de exemplo (simulando um banco de dados)
let users = [
    { id: 1, name: 'TAMO JUNTO MEU MANO CAIO' },
    
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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando no arquivo app.js em http://localhost:${PORT}`);
});

*/
