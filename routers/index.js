const Router = require('koa-router');
const router = new Router();
const koaCompose = require('koa-compose');
const {getUserInfo} = require('../controllers/getUserInfo');
const {insertUserInfo} = require('../controllers/insertUserInfo');
const {login} = require('../controllers/login');
const {register} = require('../controllers/register');
const {insertDemand} = require('../controllers/demand/insertDemand');
const {deleteDemand} = require('../controllers/demand/deleteDemandByDid');
const {updateDemand} = require('../controllers/demand/updateDemandByDid');
const {selectUserDemand} = require('../controllers/demand/selectDemandByUid');
const {createBranch} = require('../controllers/demand/createBranchForDemand');
const {stage} = require('../controllers/demand/stage');
const {selectProject} = require('../controllers/project/selectProject');
const {deploy} = require('../controllers/deploy/deploy');

// 加前缀
router.prefix('/api');

module.exports = () => {
    router.get('/getUserInfo', getUserInfo);
    router.get('/insertUserInfo', insertUserInfo);
    // 新增需求
    router.get('/insertDemand', insertDemand);
    // 删除需求
    router.get('/deleteDemand', deleteDemand);
    // 修改需求
    router.get('/updateDemand', updateDemand);
    // 查找当前用户所有需求
    router.get('/selectUserDemand', selectUserDemand);
    router.get('/createBranch', createBranch);
    router.get('/selectProject', selectProject);
    // 登录
    router.post('/login', login);
    // 注册
    router.post('/register', register);
    // 部署
    router.get('/deploy', deploy);
    // 预发
    router.get('/stage', stage);
    return koaCompose([router.routes(), router.allowedMethods()]);
}
