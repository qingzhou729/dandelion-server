const Router = require('koa-router');
const router = new Router();
const koaCompose = require('koa-compose');
const {getUserInfo} = require('../controllers/getUserInfo');
const {insertUserInfo} = require('../controllers/insertUserInfo');
const {login} = require('../controllers/login');
const {register} = require('../controllers/register');
const {checkLogin} = require('../controllers/checkLogin');

// 加前缀
router.prefix('/api');

module.exports = () => {
    router.get('/getUserInfo', getUserInfo);
    router.get('/insertUserInfo', insertUserInfo);
    router.get('/checkLogin', checkLogin);
    // 登录
    router.post('/login', login);
    // 注册
    router.post('/register', register);
    return koaCompose([router.routes(), router.allowedMethods()]);
}
