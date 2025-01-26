import {Client} from 'pg';



async function getEquipamentos() {

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'trabalho',
    password: '7384',
    port: 5432,
  });
    
  await client.connect();
  
  const eqp = await client.query('select * from equipamentos');
  
  console.log(eqp);
  
  await client.end();
}

getEquipamentos();

// Capturar elementos do DOM
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

