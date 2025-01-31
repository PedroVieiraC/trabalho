const db = require('../config/db.js'); // Supondo que você tenha um arquivo db.js para gerenciar a conexão com o banco de dados

const criarAluguel = async (cpfCliente, equipamentos, valorSeguro) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Inserir na tabela ALUGUEL
    const aluguelQuery = `
      INSERT INTO ALUGUEL (CPF_CLIENTE, DATA_INICIO, DATA_FIM)
      VALUES ($1, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days')
      RETURNING ID;
    `;
    const aluguelResult = await client.query(aluguelQuery, [cpfCliente]);
    const aluguelId = aluguelResult.rows[0].id;

    // Inserir na tabela SEGURO
    const seguroQuery = `
      INSERT INTO SEGURO (VALOR, ID_ALUGUEL)
      VALUES ($1, $2)
      RETURNING APOLICE;
    `;
    const seguroResult = await client.query(seguroQuery, [valorSeguro, aluguelId]);
    const apolice = seguroResult.rows[0].apolice;

    // Inserir na tabela ALUGUEISATIVOS
    for (const equipamento of equipamentos) {
      const aluguelAtivoQuery = `
        INSERT INTO ALUGUEISATIVOS (ID_ALUGUEL, ID_EQUIPAMENTO, QUANTIDADE, VALOR)
        VALUES ($1, $2, $3, $4);
      `;
      await client.query(aluguelAtivoQuery, [aluguelId, equipamento.id, equipamento.quantidade, equipamento.valor_diaria * equipamento.diarias]);
    }

    await client.query('COMMIT');
    return { aluguelId, apolice };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const listarAlugueis = async (cpfCliente) => {
  const query = `
    SELECT A.ID, A.DATA_INICIO, A.DATA_FIM, S.VALOR AS VALOR_SEGURO, E.NOME, AA.QUANTIDADE, AA.VALOR
    FROM ALUGUEL A
    JOIN SEGURO S ON A.ID = S.ID_ALUGUEL
    JOIN ALUGUEISATIVOS AA ON A.ID = AA.ID_ALUGUEL
    JOIN EQUIPAMENTO E ON AA.ID_EQUIPAMENTO = E.ID
    WHERE A.CPF_CLIENTE = $1;
  `;
  const result = await db.query(query, [cpfCliente]);
  return result.rows;
};

module.exports = {
  criarAluguel,
  listarAlugueis,
};