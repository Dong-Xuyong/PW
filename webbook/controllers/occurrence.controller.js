const connect = require('../assets/bd');

function readOccurrence(req, res) {
    //criar e executar a query de leitura na BD
    const id_occurrence = req.sanitize('id_occurrence').escape();
    connect.con.query('SELECT * from occurrence where id_occurrence = ?', [id_occurrence],
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o n�mero de linhas for 0 devolve dados n�o encontrados, caso contr�rio envia os resultados (rows).
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

function readOccPoints(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('select o.id_occurrence, IFNULL(ge.score,0) AS points from occurrence as o left join group_evaluation as ge on o.id_occurrence=ge.id_occurrence order by points desc',
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o n�mero de linhas for 0 devolve dados n�o encontrados, caso contr�rio envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({"msg": "data not found"});
                } else {
                    res.status(200).send(rows);
                }
            } else {
                res.status(400).send({"msg": err.code});
                console.log('Error while performing Query.', err); 
            }
        });
}

function readOcTypeOp(req, res) {
    //criar e executar a query de leitura na BD
    const id_occurrence = req.sanitize('id_occurrence').escape();
    connect.con.query('SELECT occurrence.id_occurrence, occurrence.occurrence_type, operational_occurrence.id_operational FROM operational_occurrence, occurrence where operational_occurrence.id_occurrence = ? and occurrence.id_occurrence=?', [id_occurrence, id_occurrence],
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o n�mero de linhas for 0 devolve dados n�o encontrados, caso contr�rio envia os resultados (rows).
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

function readAddress(req, res) {
    //criar e executar a query de leitura na BD
    const id_occurrence = req.sanitize('id_occurrence').escape();
    connect.con.query('SELECT address from occurrence where id_occurrence = ?', [id_occurrence],
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o n�mero de linhas for 0 devolve dados n�o encontrados, caso contr�rio envia os resultados (rows).
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

function readArrival(req, res) {
    //criar e executar a query de leitura na BD
    const id_occurrence = req.sanitize('id_occurrence').escape();
    connect.con.query('SELECT arrival from occurrence where id_occurrence = ?', [id_occurrence],
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o n�mero de linhas for 0 devolve dados n�o encontrados, caso contr�rio envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                }
                else {
                    res.status(200).send(rows);
                }
            } else {
                res.status(400).send({"msg": err.code});
                console.log('Error while performing Query.', err);
            }
        });
}

function listOccurrence(req, res) {
    connect.con.query ('SELECT id_occurrence, address, arrival FROM occurrence order by id_occurrence', function (err, rows, fields) {
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

function deleteOccurrence(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let query = "";
    query = connect.con.query('DELETE from occurrence where id_occurrence=?', id_occurrence, function (err, rows, fields){
        if(!err) {
            console.log("Number of records affected: " + rows.affectedRows);
            res.status(200).send({"msg" : "deleted with success"});
        } else {
            res.status(400).send({"msg" : err.code});
            console.log('Error while performing query', err);
        }
    });
}

function updateOccurrenceArrival(req, res) {
    const arrival = req.sanitize('arrival').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let post = [ arrival, id_occurrence ]
    let query = "";
    query = connect.con.query('UPDATE occurrence SET arrival=? WHERE id_occurrence=?', post, function (err, rows, fields){
        if(!err) {
            console.log('Number of records updated: ' + rows.affectedRows);
            res.status(200).send({"msg": "updated with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing query', err);
        }
    });
}

function updateOccurrenceCost(req, res) {
    const cost = req.sanitize('cost').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let post = [ cost, id_occurrence ]
    let query = "";
    query = connect.con.query('UPDATE occurrence SET cost=? WHERE id_occurrence=?', post, function (err, rows, fields){
        if(!err) {
            console.log('Number of records updated: ' + rows.affectedRows);
            res.status(200).send({"msg": "updated with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing query', err);
        }
    });
}

function updateOccurrenceDistance(req, res) {
    const distance = req.sanitize('distancce').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let post = [ distance, id_occurrence ]
    let query = "";
    query = connect.con.query('UPDATE occurrence SET distance=? WHERE id_occurrence=?', post, function (err, rows, fields){
        if(!err) {
            console.log('Number of records updated: ' + rows.affectedRows);
            res.status(200).send({"msg": "updated with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing query', err);
        }
    });
}

module.exports = {
    listOccurrence: listOccurrence,
    readOccurrence: readOccurrence,
    readAddress: readAddress,
    readArrival: readArrival,
    updateOccurrenceArrival: updateOccurrenceArrival,
    updateOccurrenceCost : updateOccurrenceCost,
    updateOccurrenceDistance : updateOccurrenceDistance,
    deleteOccurrence: deleteOccurrence,
    readTypeOps: readOcTypeOp,
    readOccPoints : readOccPoints
};