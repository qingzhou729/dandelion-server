const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();
const cp = require('child_process');

// 上预发布环境
async function production(ctx, next) {
    const fromDistPath = '/project-data/dandelion/dist/';
    const toDistPath = '/data/dandelion/dist';

    cp.execSync(`/data/dandelion-server/shell/production.sh ${fromDistPath} ${toDistPath}`);

    // 预发布环境部署成功之后，修改需求状态为预发验证中
    const status = 4; // 4 生产环境，待验证
    await demandModel.updateDemandStatusByDid(did, status);

    ctx.body = {
        mes: '预发布成功~',
        data: '',
        success: true,
    };
}

module.exports = {
    production,
};
