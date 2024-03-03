const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

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

app.post('/api/addclientes', (req, res) =>{
    const {nome, telefone } = req.body;
    const query = 'INSERT INTO clientes (nome, telefone) VALUES (?,?)';
    connection.query(query, [nome, telefone], (err,result) => {
        if(err) {
            console.error('Erro ao adicionar cliente: ', err);
            res.status(500).json({error: 'Erro interno do Servidor' });
            return;
        }
        res.status(201).json({ ud: result.insertId, nome, telefone});
    });    
    
}); 

app.post('/api/addservicos', (req, res) => {
    const { servico, preco } = req.body;
    const query = 'INSERT INTO servicos (servico, preco) VALUES (?, ?)';
    connection.query(query, [servico, preco], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar serviço:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.status(201).json({ id: result.insertId, servico, preco });
    });
});

app.post('/api/addbarbeiros', (req, res) => {
    const { nome } = req.body;
    const query = 'INSERT INTO barbers (nome) VALUES (?)';
    connection.query(query, [nome], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar barbeiro:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.status(201).json({ id: result.insertId, nome });
    });
});

app.get('/api/barbeiros', (req, res) => {
    const query = 'SELECT * FROM barbers;'; // Consulta SQL para buscar todos os barbeiros
    connection.query(query, (err, result) => { // Não é necessário passar parâmetros
        if (err) {
            console.error('Erro ao buscar barbeiros:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.status(200).json(result); // Enviar os dados dos barbeiros encontrados
    });
});





// Encerrar a conexão com o banco de dados quando a aplicação é encerrada
process.on('SIGINT', () => {
    connection.end();
    process.exit();
});
 
