const connect = require ('../assets/bd');

//SELECTS
function readFAverageByOc(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let query = "";
    query = connect.con.query('SELECT DISTINCT c.fuel_average, d.fuel_price from (select A.id_occurrence, v.regist, v.fuel_average, v.fuel_type from (select o.id_occurrence, f.regist from occur_vehic_material as o inner join vehicle_material as f on o.id_vei_mat=f.id_vei_mat) as A inner join vehicle as v on A.regist=v.regist where A.id_occurrence=?) as c inner join fuel_price as d on d.fuel_type=c.fuel_type',
    id_occurrence, function (err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {
                res.status(200).send(rows);
            }
        }
        else {
            res.status(400).send({
                "msg": err.code
            });
        console.log('Error while performing Query.', err);}
    });
}


module.exports = {
    readFAverage: readFAverageByOc
}