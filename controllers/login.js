/*
 * @Date: 2019-01-30 00:14:00
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-01-30 20:09:49
 */

const UserModel = require('../model/UserModel');
const userModel = new UserModel();

/**
 * @description: 登录接口
 * @param {account} 账号
 * @param {password} 密码
 * @return: 登录结果
 */

async function login(ctx, next) {

    // 获取用户名密码 get
    // const {account, password} = ctx.request.query;
    const {account, password} = ctx.request.body;

    // 根据用户名密码获取用户信息
    const userInfo = await userModel.getUserInfoByAccount(account, password);

    // 生成session_id
    ctx.session.uid = JSON.stringify(userInfo[0].uid);
    
    // ctx.cookies.set('_log_', userInfo[0].uid, { maxAge: 300 });

    ctx.body = {
        mes: '登录成功',
        data: userInfo[0].uid,
        success: true,
    };
};


module.exports = {
    login,
};
