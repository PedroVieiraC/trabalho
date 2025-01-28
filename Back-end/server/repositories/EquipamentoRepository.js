const db =  require('../db.js');

class equipamentoRepository{
    getAll(callback){
        const sql = 'SELECT * FROM equipamentos';
        db.query(sql,callback);
    }
}