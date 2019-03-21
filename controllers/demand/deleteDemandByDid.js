/*
 * @LastEditors: yuxue.yang
 * @Date: 2019-03-19 19:09:55
 * @LastEditTime: 2019-03-21 13:13:53
 */

const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();

/**
 * @description: 新增需求
 * @param {type} 
 * @return: 
 */
async function deleteDemand(ctx, next) {
    // 获取需求信息
    const {did} = ctx.request.query;
    console.log('did', did)
    const data = await demandModel.deleteDemandByDid(did);

    console.log(data);

    ctx.body = {
        mes: '删除成功~',
        data: '',
        success: true,
    };
};

module.exports = {
    deleteDemand,
};
