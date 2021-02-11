const connect = require('../assets/bd');

//witness occurrence
function readByWitOccur(req, res) {
    const id_witness = req.sanitize('id_witness').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let post = [id_occurrence, id_witness]
    connect.con.query('SELECT id_witness, id_occurrence, testimony, justification from witness_occurrence where group_nr=4 and id_occurrence =? and id_witness = ?', post,
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

function listWitByOccur(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let query = "";
    query = connect.con.query ('SELECT id_witness, id_occurrence, testimony, justification FROM witness_occurrence where group_nr=4 and id_occurrence=?', id_occurrence, 
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

function deleteWitness_occurrence(req, res) {
    const id_witness = req.sanitize('id_witness').escape();
    let query = "";
    query = connect.con.query('DELETE from witness_occurrence where id_witness=?', id_witness, 
    function (err, rows, fields){
        console.log(query.sql);
        if(!err) {
            console.log("Number of records affected: " + rows.affectedRows);
            res.status(200).send({"msg" : "deleted with success"});
        } else {
            res.status(400).send({"msg" : err.code});
            console.log('Error while performing query', err);
        }
    });
}

function updateWitness_occurrence(req, res) {
    const testimony = req.sanitize('testimony').escape();
    const justification = req.sanitize('justification').escape();
    const id_witness = req.sanitize('id_witness').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let post = [
        testimony,
        justification,
        id_witness,
        id_occurrence
    ]
    let query = "";
    query = connect.con.query('UPDATE witness_occurrence SET testimony=?, justification=? WHERE id_witness=? and id_occurrence=?', post, function (err, rows, fields){
        console.log(query.sql);
        if(!err) {
            console.log('Number of records updated: ' + rows.affectedRows);
            res.status(200).send({"msg": "updated with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing query', err);
        }
    });
}

function addWitness_Occurrence(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const testimony = req.sanitize('testimony').escape();
    const justification = req.sanitize('justification').escape();
    const name = null;
    const email = null;
    const place = null;
    const profession = null;
    let post = [
        id_occurrence, testimony, justification, name, email, place, profession
    ]
    let query = ""
    query = connect.con.query('INSERT INTO witness_occurrence (id_occurrence, testimony, justification, name, email, place, profession, group_nr) values (?,?,?,?,?,?,?,4)', post, 
    function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send({"msg": "1 - inserted with success"});
            console.log("Number of records inserted: " + rows.affectedRows);
        } else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({"msg": err.code});
                console.log('Error while performing Query.', err);
            } else
                res.status(400).send({ "msg": err.code });
        }
    });
}

function countByOccur(req, res) {
    let query = "";
    query = connect.con.query ('select id_occurrence, count(id_witness) from witness_occurrence  where group_nr=4 group by id_occurrence',
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
    listWitOccurrence : listWitByOccur,
    readWitOccurrence : readByWitOccur,
    deleteWitOccur : deleteWitness_occurrence,
    updateWitOccur : updateWitness_occurrence,
    createWitOccur : addWitness_Occurrence,
    countWitn : countByOccur
}