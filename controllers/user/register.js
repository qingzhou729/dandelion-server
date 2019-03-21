/*
 * @Date: 2019-01-30 20:42:03
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-03-21 13:25:37
 */

const UserModel = require('../../model/UserModel');
const userModel = new UserModel();
const shortid = require('js-shortid');	
 

/**
 * @description: 注册
 * @param {account} 账号
 * @param {password} 密码
 * @return: 注册结果
 */

async function register(ctx, next) {

    // 获取用户名密码
    const {account, password} = ctx.request.body;
    const uid = await userModel.getUserInfo({
        key: 'account',
        value: account,
    });
    if (uid) {
        console.log('账号已经被注册了');
    }
    // 根据用户名密码获取用户信息
    const userInfo = await userModel.insertUserInfoByAccount(account, password, shortid.gen());
    if (userInfo) {
        ctx.body = {
            mes: '注册成功',
            data: '',
            success: true,
        };
    }
};


module.exports = {
    register,
};
