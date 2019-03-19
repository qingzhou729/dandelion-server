/*
 * @LastEditors: yuxue.yang
 * @Date: 2019-03-19 19:09:55
 * @LastEditTime: 2019-03-19 19:22:16
 */

const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();
const Store = require("../../utils/Store.js");
const redis = new Store();

/**
 * @description: 新增需求
 * @param {type} 
 * @return: 
 */
async function deleteDemand(ctx, next) {

    const SESSIONID = ctx.cookies.get('SESSIONID');

    if (!SESSIONID) {
        console.log('没有携带SESSIONID，去登录吧~');
        return false;
    }
    const redisData = await redis.get(SESSIONID);

    if (!redisData) {
        console.log('SESSIONID已经过期，去登录吧~');
        return false;
    }

    
    if (redisData && redisData.uid) {
        console.log(`登录了，uid为${redisData.uid}`);
    }
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
