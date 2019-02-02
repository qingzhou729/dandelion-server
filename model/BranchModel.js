/*
 * @Date: 2019-02-01 18:06:16
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-02-02 14:30:27
 */

const {query} = require('../common/mysql');

class UserModel {
    constructor() {}

    /**
     * @description: 根据pid和did创建一个分支
     * @param {pid} 项目id
     * @param {did} 需求id
     * @param {branch_name} 分支名
     * @return: 用户信息
     */
    async insertBranchInfo(sqlParams) {
        const sql = 'insert branch_info (pid, bid, branch_name, pub_time) values(?,?,?,?)';
        console.log(sql)
        let data = await query(sql, sqlParams, (err, result) => {
            return result;
        });
        return data; 
    }

    /**
     * @description: 根据did插入到需求表中对应的需求，关联bid
     * @param {type} 
     * @return: 
     */
    async updateDemandBidByDid(bid, did, status) {
        
        const sql = 
            `UPDATE demand_info 
            SET bid='${bid}', status=${status}
            WHERE did='${did}'` ;
        console.log(sql)
        const data = await query(sql);
        return data;
    }

}

module.exports = UserModel;