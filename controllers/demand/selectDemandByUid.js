/*
 * @Date: 2019-01-31 13:22:54
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-03-09 23:24:31
 */

const DemandModel = require('../../model/DemandModel');
// const UserModel = require('../model/UserModel');
const demandModel = new DemandModel();
// const userModel = new UserModel();
const shortid = require('js-shortid');	
const Store = require("../../utils/Store.js");
const redis = new Store();

async function selectUserDemand(ctx, next) {

    // 判断用户是否登录
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

    const uid = JSON.parse(redisData.uid);
    // 获取需求信息
    const {page} = ctx.request.query;
    const data = await demandModel.selectDemandByUid(uid, page);

    console.log(data);

    ctx.body = {
        mes: '',
        data,
        success: true,
    };
};

module.exports = {
    selectUserDemand,
};
