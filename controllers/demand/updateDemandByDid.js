/*
 * @LastEditors: yuxue.yang
 * @Date: 2019-03-19 19:09:55
 * @LastEditTime: 2019-03-21 13:15:16
 */

const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();

/**
 * @description: 修改需求信息
 * @param {type} 
 * @return: 
 */
async function updateDemand(ctx, next) {
    // 获取需求信息
    const {did, title, desc} = ctx.request.query;
    const data = await demandModel.updateDemandByDid(did, title, desc);

    console.log(data);

    ctx.body = {
        mes: '修改成功~',
        data: '',
        success: true,
    };
};

module.exports = {
    updateDemand,
};
