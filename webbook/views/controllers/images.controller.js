const connect = require('../assets/bd.js');

function updateAvatar(req, res) { 
    const errors = validationResult(req); 
    if (errors.isEmpty()) { 
        const avatar = localStorage.getItem("localUploadedFileName"); 
        console.log(avatar); 
        const id = req.sanitize('id').escape();
        const profile = req.sanitize('profile').escape();
        let query = ""; 
        query = connect.con.query('UPDATE users INNER JOIN ? as a ON users.id=a.id  SET avatar=?  ', [id_operational, profile, avatar],
        function(err, rows, fields) { 
            console.log(query.sql); 
            if (!err) { 
                console.log("Number of records updateAvatar: " + rows.affectedRows); 
                res.status(200).send({ "msg": "updateAvatar with success" }); 
            } else {
                res.status(400).send({ "msg": err.code }); 
                 console.log('Error while performing Query.', err); 
            } 
        });
    } else {
        return res.status(400).json({ errors: errors.array() });
    } 
}

module.exports = {
    updateAvatar : updateAvatar
}