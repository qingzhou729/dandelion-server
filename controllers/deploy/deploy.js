// const shell = require('shelljs');
// const shortid = require('js-shortid');
// const BranchModel = require('../../model/BranchModel');
// const branchModel = new BranchModel();
const Store = require("../../utils/Store.js");
const redis = new Store();
const cp = require('child_process');

async function deploy(ctx, next) {
    // 需要merge的分支
    const {branch_name_mer} = ctx.request.query;
    // const branch_name_mer = 'test_me';

    // 创建集成分支
    const branch_name_jc = `branch_${new Date().getTime()}`;
    // const branch_name_jc = 'test_jc';
    console.log('部署')
    // cp.execFile(`../../shell/publish.sh ${branch_name_jc} ${branch_name_mer}`);
    cp.execSync('/Users/yangyuxue/work/study/code-practice/dandelion-server/shell/deploy.sh');

    ctx.body = {
        mes: '',
        data: '重新打包成功',
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