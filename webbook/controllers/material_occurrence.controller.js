const connect = require('../assets/bd');

//MATERIAL OCCURRENCE
function addMaterial(req, res) {
    const material_name = req.sanitize('material_name').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let query = "";
    let post = [material_name, id_occurrence ]
    query = connect.con.query('INSERT INTO material_occurrence (material_name, id_occurrence) VALUES (?,?)', post, function(err, rows, fields) {
        if (!err) {
            res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
            else res.status(400).send({ "msg": err.code });
        }
    });
}

function readMatOccur(req, res) {
    const id_material = req.sanitize('id_material').escape();
    connect.con.query('SELECT id_material, material_name, id_occurrence from material_occurrence where id_material = ?', [id_material],
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

function listMatByOccur(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let query="";
    query=connect.con.query('SELECT id_material, material_name, id_occurrence FROM material_occurrence where id_occurrence=?', [id_occurrence],
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
            else {
                res.status(400).send({
                    "msg": err.code
                });
            console.log('Error while performing Query.', err);
        }
    });
}

function deleteMatOccur(req, res) {
    const id_material = req.sanitize('id_material').escape();
    connect.con.query('DELETE from material_occurrence where id_material=?', [id_material], function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function updateMatOccur(req, res) {
    const material_name = req.sanitize('material_name').escape();
    const id_material = req.sanitize('id_material').escape();
    let query = "";
    let post = [material_name, id_material]
    query = connect.con.query('UPDATE material_occurrence SET material_name=? WHERE id_material=?', post, function(err, rows,
        fields) {
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({ "msg": "update with success" });
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}

module.exports = {
    listMatOccurrence : listMatByOccur,
    readMatOccurrence : readMatOccur,
    deleteMatOccur : deleteMatOccur,
    updateMatOccur : updateMatOccur,
    createMatOccur : addMaterial
}