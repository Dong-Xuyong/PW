const connect = require('../assets/bd');

//INDIVIDUAL EVALUATION
function listOpPointsTotal(req, res) {
    connect.con.query('select name, IFNULL(SUM(individual_evaluation.score), 0) as points from operational left join individual_evaluation on operational.id_operational=individual_evaluation.id_operational group by operational.id_operational order by points desc',
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

function listOpPointsOccur(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    connect.con.query('Select operational.id_operational, name, individual_evaluation.score from (operational right join individual_evaluation on operational.id_operational=individual_evaluation.id_operational) where individual_evaluation.id_occurrence=?', id_occurrence,
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
            console.log('Error while performing Query.', err);}
        });
}

function deleteIndividual_eval(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const id_operational = req.sanitize('id_operational').escape();
    let post = [id_occurrence, id_operational];
    let query = "";
    query = connect.con.query('DELETE from individual_evaluation where id_occurrence=? and id_operational=?', post, 
    function (err, rows, fields){
        if(!err) {
            console.log("Number of records affected: " + rows.affectedRows);
            res.status(200).send({"msg" : "deleted with success"});
        } else {
            res.status(400).send({"msg" : err.code});
            console.log('Error while performing query', err);
        }
    });
}

function updateIndividual_eval(req, res) {
    const score = req.sanitize('score').escape();
    const invoices = req.sanitize('invoices').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const id_operational = req.sanitize('id_operational').escape();
    let post = [
        score,
        invoices,
        id_occurrence,
        id_operational
    ]
    let query = "";
    query = connect.con.query('UPDATE individual_evaluation SET score=?, invoices=? WHERE id_occurrence=? and id_operational=?', post, function (err, rows, fields){
        if(!err) {
            console.log('Number of records updated: ' + rows.affectedRows);
            res.status(200).send({"msg": "updated with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing query', err);
        }
    });
}

function addIndividual_eval(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const id_operational = req.sanitize('id_operational').escape();
    const score = req.sanitize('score').escape();
    const invoices = req.sanitize('invoices').escape();
      let post = [id_occurrence, id_operational, score, invoices]
    let query = ""
    query = connect.con.query('INSERT INTO individual_evaluation (id_occurrence, id_operational, score, invoices) values (?,?,?,?)', post, 
    function (err, rows, fields) {
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

function evalDone(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    connect.con.query('select A.id_operational, operational.name from (select operational_occurrence.id_operational from operational_occurrence right join individual_evaluation on (operational_occurrence.id_occurrence=individual_evaluation.id_occurrence and operational_occurrence.id_operational=individual_evaluation.id_operational) where individual_evaluation.id_occurrence=?) as A inner join operational on operational.id_operational=A.id_operational',
    [id_occurrence], function(err, rows, fields) {
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

function evalNotDone(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    connect.con.query('select A.id_operational, operational.name from (select operational_occurrence.id_operational from operational_occurrence left join individual_evaluation on (operational_occurrence.id_occurrence=individual_evaluation.id_occurrence and operational_occurrence.id_operational=individual_evaluation.id_operational) where (operational_occurrence.id_occurrence=? and operational_occurrence.checked=1 and individual_evaluation.id_occurrence is null)) as A inner join operational on operational.id_operational=A.id_operational',
    [id_occurrence], function(err, rows, fields) {
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
        console.log('Error while performing Query.', err);}
    });
}

module.exports = {
    listOpPointsTotal : listOpPointsTotal,
    listOpPointsOccur : listOpPointsOccur,
    deleteIndEvaluation : deleteIndividual_eval,
    updateIndEvaluation : updateIndividual_eval,
    createIndEvaluation : addIndividual_eval,

    evalDone : evalDone,
    evalNotDone : evalNotDone
}