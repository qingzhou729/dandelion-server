const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();
const ProjectModel = require('../../model/ProjectModel');
const projectModel = new ProjectModel();
const cp = require('child_process');

// 上预发布环境
async function mergeToMaster(ctx, next) {
    const {branch_name, did, pid} = ctx.request.query;
    const data = await projectModel.selectProjectInfo(pid);
    let path = ``;
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
    cp.execSync(`/data/dandelion-server/shell/mergeToMaster.sh ${path} ${branch_name}`);

    // 预发布环境部署成功之后，修改需求状态为预发验证中
    const status = 7; // 5 已经合并主干
    await demandModel.updateDemandStatusByDid(did, status);

    ctx.body = {
        mes: '合并主干成功~',
        data: '',
        success: true,
    };
}

module.exports = {
    mergeToMaster,
};
