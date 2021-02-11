const server = require('../server.js');
const controllerUser = require('../controllers/user.controller');
const controllerMode = require('../controllers/darkmode.controller');
const {verify} = require('../controllers/middleware');
const {login, logout} = require('../controllers/login.controller');
const bodyParser = require('body-parser');
 
server.route('/users')
    .get(controllerUser.allUsers)

server.route('/users/:id')
    .put(controllerUser.updateUser)
    .get(controllerMode.readMode)
    .delete(controllerMode.deleteMode)

server.route('/users/password/:email')
    .get(controllerUser.selectLogin)

server.route('/users/newPassword/:email')
    .put(controllerUser.updatePwd)
    
server.route('/users/login')
    .post(login)

server.route('/users/logout')
    .get(logout)    

server.route('/users/:id/email')
    .get(controllerUser.readEmail)

server.route('/users/:id/profile')
    .get(controllerUser.readProfile)

server.route('/users/:email/profile/mail')
    .get(controllerUser.readProfileByMail)
    
server.route('/admins')
    .get(controllerUser.listAdmin)
    .post(controllerUser.createAdmin)

server.route('/admins/:id')
    .get(controllerUser.readAdmin)
    .delete(controllerUser.deleteAdmin)
    .put(controllerUser.updateAdmin)
    
server.route('/audits')
    .get(controllerUser.listAudit)
    .post(controllerUser.createAudit)

server.route('/audits/:id')
    .get(controllerUser.readAudit)
    .put(controllerUser.updateAudit) 
    .delete(controllerUser.deleteAudit)

server.route('/mode')
    .post(controllerMode.addMode)    

server.route('/users/:id/dark')
    .put(controllerMode.updateDark)

server.route('/users/:id/light')
    .put(controllerMode.updateLight)

server.route('/users/:id/light')
    .put(controllerMode.updateLight)

module.exports = server;