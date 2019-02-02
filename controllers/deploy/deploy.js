const shell = require('shelljs');
const shortid = require('js-shortid');
const BranchModel = require('../../model/BranchModel');
const branchModel = new BranchModel();
const Store = require("../../utils/Store.js");
const redis = new Store();
const cp = require('child_process');

async function deploy(ctx, next) {

    // 检查登录态
    const SESSIONID = ctx.cookies.get('SESSIONID');

    if (!SESSIONID) {
        console.log('没有携带SESSIONID，去登录吧~');
        ctx.body = {
            mes: '没有携带SESSIONID，去登录吧~',
            data: '',
            success: true,
        };
        return;
    }
    const redisData = await redis.get(SESSIONID);

    if (!redisData) {
        console.log('SESSIONID已经过期，去登录吧~');
        ctx.body = {
            mes: 'SESSIONID已经过期，去登录吧~',
            data: '',
            success: true,
        };
        return;
    }
    
    if (redisData && redisData.uid) {
        console.log(`登录了，uid为${redisData.uid}`);
    }

    // 需要merge的分支
    // const {branch_name_mer} = ctx.request.query;
    const branch_name_mer = 'test_me';

    // 创建集成分支
    // const branch_name_jc = `branch_${new Date().getTime()}`;
    const branch_name_jc = 'test_jc';

    cp.execFile(`../../shell/publish.sh ${branch_name_jc} ${branch_name_mer}`);

    ctx.body = {
        mes: '',
        data: '',
        success: true,
    };  
}


// test
// async function createBranch(ctx, next) {
//     cp.execSync('/Users/yangyuxue/work/study/code-practice/dandelion-server/shell/createGitBranch.sh');
// }

module.exports = {
    deploy,
};