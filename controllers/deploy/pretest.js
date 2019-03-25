const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();
const ProjectModel = require('../../model/ProjectModel');
const projectModel = new ProjectModel();
const cp = require('child_process');

// 上预发布环境
async function pretest(ctx, next) {
    const {branch_name, did, pid} = ctx.request.query;
    let path = '';
    let fromDistPath = '';
    let toDistPath = '';
    const data = await projectModel.selectProjectInfo(pid);
    if (data.length) {
        // 获取项目路径
        path = `/data/project/${data[0].project_dir}/`;
        fromDistPath = `/data/project/${data[0].project_dir}/${data[0].deploy_dir}/`;
        toDistPath = `/data/pre-dir/${data[0].project_predir}`;
    } else {
        ctx.body = {
            mes: 'pid有误~',
            data: '',
            success: false,
        };
    }
    cp.execSync(`${path}shell/pretest.sh ${path} ${branch_name} ${fromDistPath} ${toDistPath}`);

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
