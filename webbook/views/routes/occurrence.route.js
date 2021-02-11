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
    .get(verify, controllerOccurrence.listOccurrence)

server.route('/occurrences/evaluations/done')
    .get(verify, controllerCostOccur.evalDone)

server.route('/occurrences/evaluations/not')
    .get(verify, controllerCostOccur.evalNotDone)

server.route('/occurrences/:id_occurrence')
    .get(verify, controllerOccurrence.readOccurrence)
    .delete(verify, controllerOccurrence.deleteOccurrence)

server.route('/occurrences/evaluations/points')
    .get(verify, controllerOccurrence.readOccPoints)

server.route('/occurrences/:id_occurrence/address')
    .get(verify, controllerOccurrence.readAddress)

server.route('/occurrences/:id_occurrence/distance')
    .put(verify, controllerOccurrence.updateOccurrenceDistance)

server.route('/occurrences/:id_occurrence/arrival')
    .get(verify, controllerOccurrence.readArrival)
    .put(verify, controllerOccurrence.updateOccurrenceArrival)

server.route('/occurrences/:id_occurrence/cost')
    .put(verify, controllerOccurrence.updateOccurrenceCost)
    
server.route('/occurrences/:id_occurrence/type')
    .get(verify, controllerOccurrence.readTypeOps)

// Operational Occurrence
server.route('/occurrences/:id_occurrence/operationals')
    .get(verify, controllerOpOccur.listOpOccurrence) // certo

server.route('/occurrences/:id_occurrence/operationals/:id_operational')
    .get(verify, controllerOpOccur.readByOperationalOcur) // supostamente certo
    .put(verify, controllerOpOccur.updateOperationalOccurrence) // outros updates como points departure etc..
    .delete(verify, controllerOpOccur.deleteOperationalOccurrence)

// Witness Occurrence 
server.route('/occurrences/:id_occurrence/witnesses')
    .get(verify, controllerWitOccur.listWitOccurrence) // certo
    .post(verify, controllerWitOccur.createWitOccur)

server.route('/occurrences/:id_occurrence/witnesses/:id_witness')
    .get(verify, controllerWitOccur.readWitOccurrence) // supostamente certo
    .put(verify, controllerWitOccur.updateWitOccur) // outros updates como points departure etc..
    .delete(verify, controllerWitOccur.deleteWitOccur)

server.route('/occurrences/witnesses/count')
    .get(verify, controllerWitOccur.countWitn)

//material occurrence
server.route('/occurrences/:id_occurrence/materials')
    .get(verify, controllerMatOccur.listMatOccurrence) // certo
    .post(verify, controllerMatOccur.createMatOccur)

server.route('/occurrences/:id_occurrence/materials/:id_material')
    .get(verify, controllerMatOccur.readMatOccurrence) // supostamente certo
    .put(verify, controllerMatOccur.updateMatOccur) // outros updates como points departure etc..
    .delete(verify, controllerMatOccur.deleteMatOccur)

//cost occurrence
server.route('/occurrences/:id_occurrence/cost')
    .get(verify, controllerCostOccur.readCostOccurrence) // certo
    .post(verify, controllerCostOccur.createCostOccur)
    .delete(verify, controllerCostOccur.deleteCostOccur)

server.route('/occurrences/:id_occurrence/cost/operationals')
    .get(controllerCostOccur.getPriceOp)

server.route('/occurrences/:id_occurrence/cost/countop')
    .get(verify, controllerOpOccur.countOperationals)


server.route('/occurrences/:id_occurrence/cost/duration')
    .put(verify, controllerCostOccur.updateCostOccur)

server.route('/occurrences/:id_occurrence/cost/fuel_average')
    .get(verify, controllerVehicle.readFAverage)   

//group evaluation
server.route('/occurrences/:id_occurrence/group_evaluation')
    .get(verify, controllerGEvaluation.readOccurEval) // certo
    .post(verify, controllerGEvaluation.createGEvaluation)
    .delete(verify, controllerGEvaluation.deleteGEvaluation)
    .put(verify, controllerGEvaluation.updateGEvaluation)

//checklist
server.route('/occurrences/:id_occurrence/checklist')
    .get(verify, controllerChecklist.readChecklist) // certo
    .post(verify, controllerChecklist.createChecklist)
    .delete(verify, controllerChecklist.deleteChecklist)
    .put(verify, controllerChecklist.updateChecklist)

//individual evaluation
server.route('/occurrences/:id_occurrence/individual_evaluation')
    .get(verify, controllerIEvaluation.listOpPointsOccur) // certo
    .post(verify, controllerIEvaluation.createIndEvaluation)

server.route('/occurrences/:id_occurrence/individual_evaluation/done')
    .get(verify, controllerIEvaluation.evalDone) // certo

server.route('/occurrences/:id_occurrence/individual_evaluation/notdone')
    .get(verify, controllerIEvaluation.evalNotDone) // certo

server.route('/occurrences/:id_occurrence/individual_evaluation/:id_operational')
    .delete(verify, controllerIEvaluation.deleteIndEvaluation)
    .put(verify, controllerIEvaluation.updateIndEvaluation)

module.exports = server;