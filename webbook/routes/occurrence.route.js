const server = require('../server.js');
const controllerOccurrence = require('../controllers/occurrence.controller');
const controllerOpOccur = require('../controllers/operational_occurrence.controller');
const controllerWitOccur = require ('../controllers/witness_occurrence.controller');
const controllerMatOccur = require ('../controllers/material_occurrence.controller');
const controllerCostOccur = require ('../controllers/occurrence_cost.controller');
const controllerGEvaluation = require ('../controllers/group_evaluation.controller');
const controllerIEvaluation = require ('../controllers/individual_evaluation.controller');
const controllerChecklist = require ('../controllers/checklist.controller');
const controllerVehicle = require ('../controllers/vehicle.controller');
const {verify} = require('../controllers/middleware');
const bodyParser = require('body-parser');

server.route('/occurrences')
    .get(controllerOccurrence.listOccurrence)

server.route('/occurrences/evaluations/done')
    .get(controllerCostOccur.evalDone)

server.route('/occurrences/evaluations/not')
    .get(controllerCostOccur.evalNotDone)

server.route('/occurrences/:id_occurrence')
    .get(controllerOccurrence.readOccurrence)
    .delete(controllerOccurrence.deleteOccurrence)

server.route('/occurrences/evaluations/points')
    .get(controllerOccurrence.readOccPoints)

server.route('/occurrences/:id_occurrence/address')
    .get(controllerOccurrence.readAddress)

server.route('/occurrences/:id_occurrence/distance')
    .put(controllerOccurrence.updateOccurrenceDistance)

server.route('/occurrences/:id_occurrence/arrival')
    .get(controllerOccurrence.readArrival)
    .put(controllerOccurrence.updateOccurrenceArrival)

server.route('/occurrences/:id_occurrence/cost')
    .put(controllerOccurrence.updateOccurrenceCost)
    
server.route('/occurrences/:id_occurrence/type')
    .get(controllerOccurrence.readTypeOps)

// Operational Occurrence
server.route('/occurrences/:id_occurrence/operationals')
    .get(controllerOpOccur.listOpOccurrence) // certo

server.route('/occurrences/:id_occurrence/operationals/:id_operational')
    .get(controllerOpOccur.readByOperationalOcur) // supostamente certo
    .put(controllerOpOccur.updateOperationalOccurrence) // outros updates como points departure etc..
    .delete(controllerOpOccur.deleteOperationalOccurrence)

// Witness Occurrence 
server.route('/occurrences/:id_occurrence/witnesses')
    .get(controllerWitOccur.listWitOccurrence) // certo
    .post(controllerWitOccur.createWitOccur)

server.route('/occurrences/:id_occurrence/witnesses/:id_witness')
    .get(controllerWitOccur.readWitOccurrence) // supostamente certo
    .put(controllerWitOccur.updateWitOccur) // outros updates como points departure etc..
    .delete(controllerWitOccur.deleteWitOccur)

server.route('/occurrences/witnesses/count')
    .get(controllerWitOccur.countWitn)

//material occurrence
server.route('/occurrences/:id_occurrence/materials')
    .get(controllerMatOccur.listMatOccurrence) // certo
    .post(controllerMatOccur.createMatOccur)

server.route('/occurrences/:id_occurrence/materials/:id_material')
    .get(controllerMatOccur.readMatOccurrence) // supostamente certo
    .put(controllerMatOccur.updateMatOccur) // outros updates como points departure etc..
    .delete(controllerMatOccur.deleteMatOccur)

//cost occurrence
server.route('/occurrences/:id_occurrence/cost')
    .get(controllerCostOccur.readCostOccurrence) // certo
    .post(controllerCostOccur.createCostOccur)
    .delete(controllerCostOccur.deleteCostOccur)

server.route('/occurrences/:id_occurrence/cost/operationals')
    .get(controllerCostOccur.getPriceOp)

server.route('/occurrences/:id_occurrence/cost/countop')
    .get(controllerOpOccur.countOperationals)


server.route('/occurrences/:id_occurrence/cost/duration')
    .put(controllerCostOccur.updateCostOccur)

server.route('/occurrences/:id_occurrence/cost/fuel_average')
    .get(controllerVehicle.readFAverage)   

//group evaluation
server.route('/occurrences/:id_occurrence/group_evaluation')
    .get(controllerGEvaluation.readOccurEval) // certo
    .post(controllerGEvaluation.createGEvaluation)
    .delete(controllerGEvaluation.deleteGEvaluation)
    .put(controllerGEvaluation.updateGEvaluation)

//checklist
server.route('/occurrences/:id_occurrence/checklist')
    .get(controllerChecklist.readChecklist) // certo
    .post(controllerChecklist.createChecklist)
    .delete(controllerChecklist.deleteChecklist)
    .put(controllerChecklist.updateChecklist)

//individual evaluation
server.route('/occurrences/:id_occurrence/individual_evaluation')
    .get(controllerIEvaluation.listOpPointsOccur) // certo
    .post(controllerIEvaluation.createIndEvaluation)

server.route('/occurrences/:id_occurrence/individual_evaluation/done')
    .get(controllerIEvaluation.evalDone) // certo

server.route('/occurrences/:id_occurrence/individual_evaluation/notdone')
    .get(controllerIEvaluation.evalNotDone) // certo

server.route('/occurrences/:id_occurrence/individual_evaluation/:id_operational')
    .delete(controllerIEvaluation.deleteIndEvaluation)
    .put(controllerIEvaluation.updateIndEvaluation)

module.exports = server;