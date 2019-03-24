const shell = require('shelljs');
const shortid = require('js-shortid');
const BranchModel = require('../../model/BranchModel');
const branchModel = new BranchModel();
const cp = require('child_process')

async function createBranch(ctx, next) {
    // 生成bid
    const bid = shortid.gen();
    const {did, pid, pub_time} = ctx.request.query;

    // 创建分支
    const branch_name = `branch_${new Date().getTime()}`;
    const path = `/project-data/dandelion/`;

    cp.execSync(`/data/dandelion-server/shell/createBranch.sh ${path} ${branch_name}`);

    const sqlParams = [pid, bid, branch_name, pub_time];

    const mes1 =  await branchModel.insertBranchInfo(sqlParams);
    if (mes1) {
        if (await branchModel.updateDemandBidByDid(bid, did, 2)) {
            ctx.body = {
                mes: '创建分支成功~',
                data: branch_name,
                success: true,
            };
        }
    }
}

module.exports = {
    createBranch,
};