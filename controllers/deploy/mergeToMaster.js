const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();
const cp = require('child_process');

// 上预发布环境
async function mergeToMaster(ctx, next) {
    const {branch_name, did} = ctx.request.query;
    const path = `/project-data/dandelion/`;
    cp.execSync(`/data/dandelion-server/shell/mergeToMaster.sh ${path} ${branch_name}`);

    // 预发布环境部署成功之后，修改需求状态为预发验证中
    const status = 7; // 5 已经合并主干
    await demandModel.updateDemandStatusByDid(did, status);

    ctx.body = {
        mes: '预发布成功~',
        data: '',
        success: true,
    };
}

module.exports = {
    mergeToMaster,
};
