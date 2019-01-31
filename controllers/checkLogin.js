/*
 * @Date: 2019-01-30 20:12:21
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-01-30 22:38:51
 */

const UserModel = require('../model/UserModel');
const Store = require("../utils/store.js");
const redis = new Store();

async function checkLogin(ctx, next) {
    const SESSIONID = ctx.cookies.get('SESSIONID');

    if (!SESSIONID) {
        return false;
    }
    const redisData = await redis.get(SESSIONID);

    if (!redisData) {
        console.log('SESSIONID已经过期，去登录吧~');
        return false;
    }

    
    if (redisData && redisData.uid) {
        return redisData.uid;
    }
};


module.exports = {
    checkLogin,
};
