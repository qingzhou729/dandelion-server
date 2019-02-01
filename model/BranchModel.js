/*
 * @Date: 2019-02-01 18:06:16
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-02-01 18:07:59
 */

const {query} = require('../common/mysql');

class UserModel {
    constructor() {}

    /**
     * @description: 创建一个分支
     * @param {pid} 项目id
     * @param {did} 需求id
     * @param {branch_name} 分支名
     * @return: 用户信息
     */
    async insertUserInfoByAccount(account, password, uid) {
        const sql = 'insert user_info (pid, did, branch_name) values(?,?,?)';
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