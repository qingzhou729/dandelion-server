/*
 * @LastEditors: yuxue.yang
 * @Date: 2019-03-24 14:07:57
 * @LastEditTime: 2019-03-24 14:18:22
 */
const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();

async function updateDemandStatus(ctx, next) {
    const {status, did} = ctx.request.query;
    /* status 
        1、新建
        2、开发中
        3、部署到预发环境，待验证
        4、预发验证通过，待正式发布
        5、正式环境部署、待验证
        6、正式环境验证，待合并主干
        7、完成合并主干，发布完成
    */
    await demandModel.updateDemandStatusByDid(did, status);

    ctx.body = {
        mes: '需求状态更新成功~',
        data: '',
        success: true,
    };
}

module.exports = {
    updateDemandStatus,
};
