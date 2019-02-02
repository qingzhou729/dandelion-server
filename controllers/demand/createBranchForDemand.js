const shell = require('shelljs');
const shortid = require('js-shortid');
const BranchModel = require('../../model/BranchModel');
const branchModel = new BranchModel();
const Store = require("../../utils/Store.js");
const redis = new Store();

async function createBranch(ctx, next) {

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

    // 生成bid
    const bid = shortid.gen();
    const {did, pid, pub_time} = ctx.request.query;

    // 创建分支
    const branch_name = `branch_${new Date().getTime()}`;
    shell.exec('git pull');
    shell.exec(`git checkout -b ${branch_name}`);
    shell.exec(` git push --set-upstream origin ${branch_name}`);

    const sqlParams = [pid, bid, branch_name, pub_time];

    const mes1 =  await branchModel.insertBranchInfo(sqlParams);
    let mes2 = '';
    if (mes1) {
        mes2 = await branchModel.updateDemandBidByDid(bid, did, 2);
    }
    if (mes2) {
        ctx.body = {
            mes: '',
            data: branch_name,
            success: true,
        };
    }   
}


// test
// async function createBranch(ctx, next) {
//     cp.execSync('/Users/yangyuxue/work/study/code-practice/dandelion-server/shell/createGitBranch.sh');
// }

module.exports = {
    createBranch,
};