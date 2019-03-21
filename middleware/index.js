const routers = require('../routers');
const login = require('./plugins/login');
const http = require('./plugins/http');

module.exports = (app) => {
    app.use(http());
    app.use(login());
    app.use(routers());
}