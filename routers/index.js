const Router = require('koa-router');
const router = new Router();
const koaCompose = require('koa-compose');
const {getUserInfo} = require('../controllers/getUserInfo');

// 加前缀
router.prefix('/api');

module.exports = () => {
    router.get('/getUserInfo', getUserInfo);
    return koaCompose([router.routes(), router.allowedMethods()]);
}
