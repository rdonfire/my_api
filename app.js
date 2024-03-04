const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; // Porta em que a API será executada

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'eydos'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL 100% atualizado');
});

// Rota para recuperar os dados da tabela 'barbers'
app.get('/barbers', (req, res) => {
  connection.query('SELECT * FROM barbers', (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro ao recuperar dados da tabela barbers');
      return;
    }
    res.json(results);
  });
});

// Rota para recuperar os dados da tabela 'clientes'
app.get('/clientes', (req, res) => {
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro ao recuperar dados da tabela clientes');
      return;
    }
    res.json(results);
  });
});

// Rota para recuperar os dados da tabela 'servicos'
app.get('/servicos', (req, res) => {
  connection.query('SELECT * FROM servicos', (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro ao recuperar dados da tabela servicos');
      return;
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API está rodando em http://localhost:${port}`);
});
