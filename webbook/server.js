const express = require('express');

//carregar bibliotecas globais
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const expressValidator = require('express-validator');
require ('dotenv').config();

//iniciar a aplicação
var server = express();
server.use(express.static("../Frontend/"));
server.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
server.use(expressSanitizer());
server.use(expressValidator());
let port = process.env.PORT || 8080;
server.listen(3000, function(err) {
    if (!err) {
        console.log('Your app is listening on port 3000');
    }
    else { console.log(err); }
});

//forçar utilização das bibliotecas
server.use(cors());
server.use(cookieParser());
module.exports = server;

require('./routes/occurrence.route');
require('./routes/user.route');
require('./routes/operational.route');