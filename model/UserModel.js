/*
 * @Description: In User Settings Edit
 * @Author: yuki.yang
 * @Date: 2019-01-24 20:46:06
 * @LastEditTime: 2019-01-30 21:06:36
 * @LastEditors: yuxue.yang
 */
const {query} = require('../common/mysql');

class UserModel {
    constructor() {}

    /**
     * @description: 获取个人用户信息
     * @param {account} 账号
     * @param {password} 密码
     * @return: 用户信息
     */
    async getUserInfoByAccount(account, password) {
        const sql = `SELECT uid from user_info where account = ${account} and password = ${password};`;
        const data = await query(sql);
        return data;
    }

    /**
     * @description: 注册一个新用户
     * @param {account} 账号
     * @param {password} 密码
     * @return: 用户信息
     */
    async insertUserInfoByAccount(account, password, uid) {
        const sql = 'insert user_info (account, password, uid) values(?,?,?)';
        const sqlParams = [account, password, uid];
        let data = await query(sql, sqlParams, (err, result) => {
            return result;
        });
        return data; 
    }

    /**
     * 查询所有用户信息
     */
    async getUserInfo(params) {
        const sql = `SELECT uid FROM user_info where ${params.key} = ${params.value}`;
        const data = await query(sql);
        return data;
    }

}

module.exports = UserModel;