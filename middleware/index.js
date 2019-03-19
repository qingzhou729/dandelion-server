const routers = require('../routers');
const login = require('./login');

module.exports = (app) => {
    app.use(login());
    app.use(routers());
}