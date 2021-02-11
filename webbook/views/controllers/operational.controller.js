const connect = require('../assets/bd');

//SELECTS
function readID(req, res) {
    const id_operational = req.sanitize('id_operational').escape();
    connect.con.query('SELECT * from operational where id_operational = ?', id_operational,
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o numero de linhas for 0 devolve dados n�o encontrados, caso contr�rio envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                }
                else {
                    res.status(200).send(rows);
                }
            }
            else
                res.status(400).send({
                    "msg": err.code
                });
            console.log('Error while performing Query.', err);
        });
}

function readAll(req, res) {
    connect.con.query ('SELECT * FROM operational order by id_operational', 
    function (err, rows, fields) {
        if (!err) {
            if (rows.length == 0) {
                res.status(404).send("Data not found");
                } else {
                    res.status(200).send(rows);
                }
        } else
            console.log('Error while performing query', err);
    });
}

module.exports = {
    listOperational : readAll,
    readOperational : readID
};