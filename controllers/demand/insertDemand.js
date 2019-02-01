/*
 * @Date: 2019-01-30 22:29:20
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-01-31 12:13:17
 */

const DemandModel = require('../../model/DemandModel');
// const UserModel = require('../model/UserModel');
const demandModel = new DemandModel();
// const userModel = new UserModel();
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
