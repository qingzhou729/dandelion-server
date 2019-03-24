const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();
const cp = require('child_process');

// 上预发布环境
async function pretest(ctx, next) {
    const {branch_name, did} = ctx.request.query;
    const path = `/project-data/dandelion/`;
    cp.execSync(`/data/dandelion-server/shell/pretest.sh ${path} ${branch_name}`);

    // 预发布环境部署成功之后，修改需求状态为预发验证中
    const status = 3; // 3 代表预发部署成功，待验证
    await demandModel.updateDemandStatusByDid(did, status);

    ctx.body = {
        mes: '预发布成功~',
        data: '',
        success: true,
    };
}

module.exports = {
    pretest,
};
