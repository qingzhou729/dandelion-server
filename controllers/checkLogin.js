/*
 * @Date: 2019-01-30 20:12:21
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-01-30 21:40:02
 */

const UserModel = require('../model/UserModel');
const Store = require("../utils/store.js");
const redis = new Store();

async function checkLogin(ctx, next) {
    const SESSIONID = ctx.cookies.get('SESSIONID');

    if (!SESSIONID) {
        console.log('没有携带SESSIONID，去登录吧~');
    }
    const redisData = await redis.get(SESSIONID);

    if (!redisData) {
        console.log('SESSIONID已经过期，去登录吧~');
    }
    if (redisData && redisData.uid) {
        // 拿到用户uid，处理业务逻辑
        const uid = redisData.uid;
        ctx.body = {
            mes: '这个用户登录了',
            data: uid,
            success: true,
        };
    }
};


module.exports = {
    checkLogin,
};
