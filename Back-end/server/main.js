const cors = require('cors');

const { Client } = require('pg');
const express = require('express');

const app = express();

app.use(express.json());
app.use(cors());

const con = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '7384',
  database: 'trabalho',
});

con.connect().then(() => console.log("connected"));

app.post('/postData', (req, res) => {

  const { name, id } = req.body;

  const insert_query = 'INSERT INTO TESTE (NAME,ID) VALUES ($1, $2)';

  con.query(insert_query, [name, id], (err, result) => {
    if (err) {
      res.send(err);

    } else {
      console.log(result);
      res.send("INFORMACAO COLOCADA")
    }
  });
});

app.get('/teste', (req, res) => {
  const insert_query = 'Select * from teste';

  con.query(insert_query, (err, result) => {
    if (err) {
      res.send(err);

    } else {
      console.log(result);
      res.send(result.rows);
    }
  });
});

app.listen(3000, () => { console.log("Server ligado") });
