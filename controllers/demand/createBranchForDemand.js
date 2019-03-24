const shell = require('shelljs');
const shortid = require('js-shortid');
const BranchModel = require('../../model/BranchModel');
const branchModel = new BranchModel();
const ProjectModel = require('../../model/ProjectModel');
const projectModel = new ProjectModel();
const cp = require('child_process')

async function createBranch(ctx, next) {
    // 生成bid
    const bid = shortid.gen();
    const {did, pid, pub_time} = ctx.request.query;
    console.log('pid ===', pid);
    const data = await projectModel.selectProjectInfo(pid);
    let path = '';
    if (data.length) {
        // 获取项目路径
        path = `/data/project/${data[0].project_dir}/`;
    } else {
        ctx.body = {
            mes: 'pid有误~',
            data: '',
            success: false,
        };
    }
    console.log(data[0].project_dir);
    // 创建分支
    const branch_name = `branch_${new Date().getTime()}`;
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
    } else {
        ctx.body = {
            mes: '创建分支失败~',
            data: '',
            success: false,
        };
    }
}

module.exports = {
    createBranch,
};