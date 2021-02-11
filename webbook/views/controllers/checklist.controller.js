const connect = require('../assets/bd');

//CHECKLIST
function readAnswers(req, res) {
    //criar e executar a query de leitura na BD
    const id_occurrence = req.sanitize('id_occurrence').escape();
    connect.con.query('SELECT * from checklist where id_occurrence = ?', id_occurrence,
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

function deleteChecklist(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let query = "";
    query = connect.con.query('DELETE from checklist where id_occurrence=?', id_occurrence, 
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

function updateChecklist(req, res) {
    const question_1 = req.sanitize('question_1').escape();
    const question_2 = req.sanitize('question_2').escape();
    const question_3 = req.sanitize('question_3').escape();
    const question_4 = req.sanitize('question_4').escape();
    const question_5 = req.sanitize('question_5').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let post = [
        question_1,
        question_2,
        question_3,
        question_4,
        question_5,
        id_occurrence
    ]
    let query = "";
    query = connect.con.query('UPDATE checklist SET question_1=?, question_2=?, question_3=?, question_4=?, question_5=? WHERE id_occurrence=?', post, function (err, rows, fields){
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

function addChecklist(req, res) {
    const question_1 = req.sanitize('question_1').escape();
    const question_2 = req.sanitize('question_2').escape();
    const question_3 = req.sanitize('question_3').escape();
    const question_4 = req.sanitize('question_4').escape();
    const question_5 = req.sanitize('question_5').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    let post = [
        id_occurrence, question_1, question_2, question_3, question_4, question_5
    ]
    let query = ""
    query = connect.con.query('INSERT INTO checklist (id_occurrence, question_1, question_2, question_3, question_4, question_5) values (?,?,?,?,?,?)', post, 
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

module.exports = {
    readChecklist : readAnswers,
    createChecklist : addChecklist,
    updateChecklist : updateChecklist,
    deleteChecklist : deleteChecklist
}