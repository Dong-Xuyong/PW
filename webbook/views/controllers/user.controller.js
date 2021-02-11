const connect = require ('../assets/bd');

//login
function login (req, res) {
    const email = req.sanitize('email').escape();
    let query = "";
    query = connect.con.query('SELECT email, password FROM users where email=?', [email], function (err, rows, fields){
        console.log(query.sql);
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
        else
            res.status(400).send({
                "msg": err.code
            });
        console.log('Error while performing Query.', err);
    }) ; 
}

//admins
function addAdmin(req, res) {
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const profile = "administrator";
    const status = "active";
    const createdAt = new Date();
    const updatedAt = new Date();
    const name = req.sanitize('name').escape();
    const age = req.sanitize('age').escape();
    const nationality = req.sanitize('nationality').escape();
    const cc = req.sanitize('cc').escape();
    const date_birth = req.sanitize('date_birth').escape();
    const phone_nr = req.sanitize('phone_nr').escape();
    const address = req.sanitize('address').escape();
    const education = req.sanitize('education').escape();
    let post1 = [email, password, profile, status, createdAt, updatedAt]; 
    let query = ""
    query = connect.con.query('INSERT INTO users (email, password, profile, status, createdAt, updatedAt) values (?,?,?,?,?,?)',
    post1, function (err, rows, fields) {
        if (!err) {
            console.log("1 - Number of records inserted: " + rows.affectedRows);
        } else {
            if (err.code == "ER_DUP_ENTRY") {
                console.log('1 - Error while performing Query.', err);
            } else
                res.status(400).send({ "msg": err.code });
        }
    });
    let post2 = [name, age, nationality, cc, date_birth, phone_nr, address, education, email]
    let query1 = ""
    query1 = connect.con.query('insert into administrator (name, age, nationality, cc, date_birth, phone_nr, address, education, id) VALUES (?,?,?,?,?,?,?,?,(select id from users where email=?))',
    post2, function (err, rows, fields) {
        if (!err) {
            res.status(200).location(rows.insertId).send({"msg": "1 - inserted with success"});
            console.log("2 - Number of records inserted: " + rows.affectedRows);
        } else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({"msg": err.code});
                console.log('2 - Error while performing Query.', err);
            } else
                res.status(400).send({ "msg": err.code });
        }
    });
}

function readAdmin(req, res) {
    const id = req.sanitize('id').escape();
    let query = "";
    query = connect.con.query('select administrator.name, users.email, administrator.date_birth, administrator.phone_nr, users.password from (users inner join administrator on administrator.id = users.id) where users.id = ?', id, function (err, rows, fields) {
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
        else
            res.status(400).send({
                "msg": err.code
            });
        console.log('Error while performing Query.', err);
    }) ;   
}

function listAdmin(req, res) {
    let query = "";
    query = connect.con.query('select name, id, age, phone_nr from administrator', function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function deleteAdmin(req, res) {
    const id = req.sanitize('id').escape();
    let query = "";
    query = connect.con.query('DELETE from administrator where id = ?', id, function (err, rows, fields){
       console.log(query.sql);
        if(!err) {
            console.log("Number of records affected: " + rows.affectedRows);
            res.status(200).send({"msg" : "deleted with success"});
        } else {
            res.status(400).send({"msg" : err.code});
            console.log('Error while performing query', err);
        } 
    });
    query = connect.con.query('DELETE from login where id_login=?', id_login, function (err, rows, fields){
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

function updateAdmin(req, res) {
    const phone_nr = req.sanitize('phone_nr').escape();
    const address = req.sanitize('address').escape();
    const id = req.sanitize('id').escape();
    let query = "";
    let post = [ address, phone_nr, id];
    query = connect.con.query('UPDATE administrator SET address=?, phone_nr=? WHERE id = ?', post, function(err, rows, fields) {
       console.log(query.sql);
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

// auditor
function addAudit(req, res) {
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const profile = "auditor";
    const status = "active";
    const createdAt = newDate();
    const updatedAt = newDate();
    const name = req.sanitize('name').escape();
    const age = req.sanitize('age').escape();
    const cc = req.sanitize('cc').escape();
    const date_birth = req.sanitize('date_birth').escape();
    const address = req.sanitize('address').escape();
    const phone_nr = req.sanitize('phone_nr').escape();
    let post1 = [email, password, profile, status, createdAt, updatedAt]; 
    let query = ""
    query = connect.con.query('INSERT INTO users (email, password, profile, status, createdAt, updatedAt) values (?,?,?,?,?,?)', 
    post1, function (err, rows, fields) {
        if (!err) {
            res.status(200).location(rows.insertId).send({"msg": "1 - inserted with success"});
            console.log("1 - Number of records inserted: " + rows.affectedRows);
        } else {
            if (err.code == "ER_DUP_ENTRY") {
                console.log('1 - Error while performing Query.', err);
            } else
                console.log('1 - Error while performing Query.', err);
        }
    });
    let query1="";
    let post2 = [name, age, cc, date_birth, address, phone_nr, email]
    query1 = connect.con.query('insert into auditor (name, age, cc, date_birth, address, phone_nr, id) VALUES (?,?,?,?,?,(select id from users where email=?))', 
    post2, function (err, rows, fields) {
        if (!err) {
            res.status(200).location(rows.insertId).send({"msg": "1 - inserted with success"});
            console.log("2 - Number of records inserted: " + rows.affectedRows);
        } else {
            if (err.code == "ER_DUP_ENTRY") {
                console.log('2 - Error while performing Query.', err);
            } else
                console.log('2 - Error while performing Query.', err);
        }
    });
}

function readAudit(req, res) {
    const id = req.sanitize('id').escape();
    let query = "";
    query = connect.con.query('select auditor.name, users.email, auditor.date_birth, auditor.phone_nr from (users inner join auditor on auditor.id = users.id) where users.id = ?', [id], function (err, rows, fields) {
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
        else
            res.status(400).send({
                "msg": err.code
            });
        console.log('Error while performing Query.', err);
    }) ; 
}

function listAudit(req, res) {
    let query = "";
    query = connect.con.query('select id, name, age, phone_nr from auditor', function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function deleteAudit(req, res) {
    const id = req.sanitize('id').escape();
    let query = "";
    query = connect.con.query('DELETE from auditor where id = ?', id, function (err, rows, fields){
        if(!err) {
            console.log("Number of records affected: " + rows.affectedRows);
            res.status(200).send({"msg" : "deleted with success"});
        } else {
            res.status(400).send({"msg" : err.code});
            console.log('Error while performing query', err);
        } 
    });
    query = connect.con.query('DELETE from users where id=?', id, function (err, rows, fields){
        if(!err) {
            console.log("Number of records affected: " + rows.affectedRows);
            res.status(200).send({"msg" : "deleted with success"});
        } else {
            res.status(400).send({"msg" : err.code});
            console.log('Error while performing query', err);
        } 
    });
}

function updateAudit(req, res) {
    const address = req.sanitize('address').escape();
    const phone_nr = req.sanitize('phone_nr').escape();
    const id = req.sanitize('id').escape();
    let query = "";
    let post = [address, phone_nr, id ];
    query = connect.con.query('UPDATE auditor SET address=?, phone_nr=? WHERE id = ?', post, function(err, rows, fields) {
       console.log(query.sql);
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

function updateUser(req, res) {
    const id = req.sanitize('id').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    let query = "";
    let post = [email, password, id];
    query = connect.con.query('UPDATE users SET email=?, password=? WHERE id= ?', post, function(err, rows, fields) {
       console.log(query.sql);
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

function readUsers(req, res) {
    let query = "";
    query = connect.con.query('select id, email, profile from users where profile="administrator" union select id, email, profile from users where profile="auditor"', function (err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });  
}

function readUserEmail(req, res) {
    const id = req.sanitize('id').escape();
    let query = "";
    query = connect.con.query('select email from users where id=?', id, function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });  
}

function readProfile(req, res) {
    const id = req.sanitize('id').escape();
    let query = "";
    query = connect.con.query('select profile from users where id=?', id, function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });  
}

function readProfileByMail(req, res) {
    const email = req.sanitize('email').escape();
    let query = "";
    query = connect.con.query('select id, profile from users where email=?', email, function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });  
}


module.exports = {
    listAdmin: listAdmin,
    readAdmin: readAdmin,
    createAdmin: addAdmin,
    updateAdmin: updateAdmin,
    deleteAdmin: deleteAdmin,
    
    listAudit : listAudit,
    readAudit : readAudit,
    createAudit :  addAudit,
    updateAudit : updateAudit,
    deleteAudit : deleteAudit,
    
    selectLogin : login,
    updateUser : updateUser,
    allUsers : readUsers,
    readEmail : readUserEmail,
    readProfile : readProfile,
    readProfileByMail : readProfileByMail
}