const Router = require('koa-router');
const router = new Router();
const koaCompose = require('koa-compose');

// 接口入口
const {getUserInfo} = require('../controllers/user/getUserInfo');
const {insertUserInfo} = require('../controllers/user/insertUserInfo');
const {login} = require('../controllers/user/login');
const {register} = require('../controllers/user/register');
const {insertDemand} = require('../controllers/demand/insertDemand');
const {deleteDemand} = require('../controllers/demand/deleteDemandByDid');
const {updateDemand} = require('../controllers/demand/updateDemandByDid');
const {updateDemandStatus} = require('../controllers/demand/updateDemandStatus');
const {selectUserDemand} = require('../controllers/demand/selectDemandByUid');
const {createBranch} = require('../controllers/demand/createBranchForDemand');
const {pretest} = require('../controllers/deploy/pretest'); // 预发环境部署
const {production} = require('../controllers/deploy/production'); // 生产环境部署
const {mergeToMaster} = require('../controllers/deploy/mergeToMaster'); // 合并到主干
const {selectProject} = require('../controllers/project/selectProject');

// 加前缀
router.prefix('/api');

module.exports = () => {
    // 获取用户信息
    router.get('/getUserInfo', getUserInfo);
    router.get('/insertUserInfo', insertUserInfo);
    // 新增需求
    router.get('/insertDemand', insertDemand);
    // 删除需求
    router.get('/deleteDemand', deleteDemand);
    // 修改需求
    router.get('/updateDemand', updateDemand);
    router.get('/updateDemandStatus', updateDemandStatus);
    // 查找当前用户所有需求
    router.get('/selectUserDemand', selectUserDemand);
    // 创建分支
    router.get('/createBranch', createBranch);
    // 查询项目信息
    router.get('/selectProject', selectProject);
    // 登录
    router.post('/login', login);
    // 注册
    router.post('/register', register);
    // 预发
    router.get('/pretest', pretest);
    // 生产环境
    router.get('/production', production);
    // 合并主干
    router.get('/mergeToMaster', mergeToMaster);
    return koaCompose([router.routes(), router.allowedMethods()]);
}
