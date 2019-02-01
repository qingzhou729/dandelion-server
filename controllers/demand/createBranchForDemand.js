const shell = require('shelljs');
// const cp = require('child_process');

async function createBranch(ctx, next) {

    const SESSIONID = ctx.cookies.get('SESSIONID');

    if (!SESSIONID) {
        console.log('没有携带SESSIONID，去登录吧~');
        return false;
    }
    const redisData = await redis.get(SESSIONID);

    if (!redisData) {
        console.log('SESSIONID已经过期，去登录吧~');
        return false;
    }

    
    if (redisData && redisData.uid) {
        console.log(`登录了，uid为${redisData.uid}`);
    }

    const {bid, pid} = ctx.request.query;

    const branchName = `branch_${new Date().getTime()}`;
    shell.exec('git pull');
    shell.exec(`git checkout -b ${branchName}`);
    shell.exec(` git push --set-upstream origin ${branchName}`);

    
    ctx.body = {
        mes: '',
        data: branchName,
        success: true,
    };
}


// test
// async function createBranch(ctx, next) {
//     cp.execSync('/Users/yangyuxue/work/study/code-practice/dandelion-server/shell/createGitBranch.sh');
// }

module.exports = {
    createBranch,
};