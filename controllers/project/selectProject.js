/*
 * @Date: 2019-01-31 13:22:54
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-03-21 13:16:19
 */

const ProjectModel = require('../../model/ProjectModel');
const projectModel = new ProjectModel();

async function selectProject(ctx, next) {
    // 获取项目信息
    const data = await projectModel.selectProjectInfo();

    console.log(data);

    ctx.body = {
        mes: '',
        data,
        success: true,
    };
};

module.exports = {
    selectProject,
};
