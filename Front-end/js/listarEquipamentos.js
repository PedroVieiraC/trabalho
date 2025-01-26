 
 
 
 
 
 
 
 
async function getEquipamentos() {
  try {
    const response = await fetch('http://localhost:3000/teste');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const eqp = await response.json();
    console.log(eqp);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}


/* function getEquipamentos() {
  fetch("http://localhost:3000/teste")
  .then(r =>  r.json().then(data ))
  .then(obj => console.log(obj));
}
 */

getEquipamentos();

// Capturar elementos do DOM
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const myList = document.querySelector("ul");
const myRequest = new Request("products.json");

