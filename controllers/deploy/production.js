const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();
const ProjectModel = require('../../model/ProjectModel');
const projectModel = new ProjectModel();
const cp = require('child_process');

// 上预发布环境
async function production(ctx, next) {
    const {did, pid} = ctx.request.query;
    const data = await projectModel.selectProjectInfo(pid);
    let fromDistPath = '';
    let toDistPath = '';
    if (data.length) {
        // 获取项目路径
        fromDistPath = `/data/project/${data[0].project_dir}/${data[0].deploy_dir}/`;
        toDistPath = `/data/pro-dir/${data[0].project_prodir}`;
    } else {
        ctx.body = {
            mes: 'pid有误~',
            data: '',
            success: false,
        };
    }
    cp.execSync(`/data/dandelion-server/shell/production.sh ${fromDistPath} ${toDistPath}`);

    // 预发布环境部署成功之后，修改需求状态为预发验证中
    const status = 5; // 5 生产环境，待验证
    await demandModel.updateDemandStatusByDid(did, status);
    
    ctx.body = {
        mes: '正式环境部署成功~',
        data: '',
        success: true,
    };
}

module.exports = {
    production,
};
