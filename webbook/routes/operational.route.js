const server = require('../server.js');
const controllerIndiv = require('../controllers/individual_evaluation.controller');
const controllerOperational = require('../controllers/operational.controller');
const {verify} = require('../controllers/middleware');
const bodyParser = require('body-parser');

server.route('/operationals/totalpoints')
    .get(controllerIndiv.listOpPointsTotal)

server.route('/operationals')
    .get(controllerOperational.listOperational)

server.route('/operationals/:id_operational')
    .get(controllerOperational.readOperational)

module.exports = server;