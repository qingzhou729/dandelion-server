/*
 * @Date: 2019-01-31 13:22:54
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-03-23 09:23:39
 */

const DemandModel = require('../../model/DemandModel');
const demandModel = new DemandModel();
const shortid = require('js-shortid');	
const Store = require("../../utils/Store.js");
const redis = new Store();

async function selectUserDemand(ctx, next) {
    const SESSIONID = ctx.cookies.get('SESSIONID');
    const redisData = await redis.get(SESSIONID);
    const uid = JSON.parse(redisData.uid);
    // 获取需求信息
    const {page, status} = ctx.request.query;
    console.log(`status`,status)
    const data = await demandModel.selectDemandByUid(uid, page, status);
    const count = await demandModel.selectDemandCount();
    ctx.body = {
        mes: '',
        data,
        count: count[0][`count(*)`],
        success: true,
    };
};

module.exports = {
    selectUserDemand,
};
