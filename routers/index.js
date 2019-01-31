const Router = require('koa-router');
const router = new Router();
const koaCompose = require('koa-compose');
const {getUserInfo} = require('../controllers/getUserInfo');
const {insertUserInfo} = require('../controllers/insertUserInfo');
const {login} = require('../controllers/login');
const {register} = require('../controllers/register');
const {insertDemand} = require('../controllers/demand/insertDemand');
const {selectUserDemand} = require('../controllers/demand/selectDemandByUid');
const {createBranch} = require('../controllers/demand/createBranchForDemand');

// 加前缀
router.prefix('/api');

module.exports = () => {
    router.get('/getUserInfo', getUserInfo);
    router.get('/insertUserInfo', insertUserInfo);
    // 新增需求
    router.get('/insertDemand', insertDemand);
    // 查找当前用户所有需求
    router.get('/selectUserDemand', selectUserDemand);
    router.get('/createBranch', createBranch);
    // 登录
    router.post('/login', login);
    // 注册
    router.post('/register', register);
    return koaCompose([router.routes(), router.allowedMethods()]);
}
