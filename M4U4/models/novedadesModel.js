
var pool = require('./bd');

async function getNovedades() {
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;
}

async function deleteNovedadesById(id) {
    var query = 'delete from novedades where id = ?';
    var row = await pool.query(query, [id]);
    return row;
}

module.exports = {getNovedades, deleteNovedadesById}