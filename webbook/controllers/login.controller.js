const connect = require('../assets/bd.js');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const jwt = require('jsonwebtoken');

exports.login = function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let query = "";
    query = connect.con.query('SELECT users.* FROM users, ((select id from auditor) union (select id from administrator)) as a where users.email=? and users.password=? and users.id=a.id', [email, password], function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                let user = JSON.parse(JSON.stringify(rows));
                //use the payload to store information about the user such as username, user role, etc.
                let payload = { email: email }
                let userData = {
                    id_operational: user[0].id_operational,
                }
                res.cookie("userData", userData);
                //create the access token with the shorter lifespan
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
                })
                //create the refresh token with the longer lifespan
                let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: process.env.REFRESH_TOKEN_LIFE
                })
                //store the refresh token in the user array
                user[0].email.refreshToken = refreshToken;
                //send the access token to the client inside a cookie
                res.cookie("jwt", accessToken, { httpOnly: true })
                res.send(req.cookies.userData);
                res.send();
            }
        }
    });
}

exports.logout = function(req, res) {
    res.clearCookie("jwt");
    res.clearCookie("userData");
    res.send();
}
