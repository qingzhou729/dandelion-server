/*
 * @Date: 2019-01-30 22:29:20
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-03-21 13:12:21
 */

const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();
const shortid = require('js-shortid');	
const Store = require("../../utils/Store.js");
const redis = new Store();

/**
 * @description: 新增需求
 * @param {type} 
 * @return: 
 */
async function insertDemand(ctx, next) {
    const SESSIONID = ctx.cookies.get('SESSIONID');
    const redisData = await redis.get(SESSIONID);
    const uid = JSON.parse(redisData.uid);
    // 获取需求信息
    const {title, desc} = ctx.request.query;
    const params = [shortid.gen(), title, desc, 1, uid];
    const data = await demandModel.insertDemand(params);

    console.log(data);

    ctx.body = {
        mes: '',
        data: '',
        success: true,
    };
};

module.exports = {
    insertDemand,
};
