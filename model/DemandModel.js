/*
 * @Date: 2019-01-30 22:29:34
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-03-09 23:37:42
 */

const {query} = require('../common/mysql');

class DemandModel {
    constructor() {}

    /**
     * @description: 新增一个需求
     * @param {type} 
     * @return: 
     */
    async insertDemand(params) {
        console.log(params)
        const sql = 'insert demand_info (did, title, demand_desc, status, uid) values(?,?,?,?,?)';
        let data = await query(sql, params, (err, result) => {
            return result;
        });
        return data;
    }

    /**
     * @description: 查找当前用户的所有需求
     * @param {String} uid
     * @return: 用户的所有需求
     */
    async selectDemandByUid(uid, page) {
        const pageSize = 10;
        const start = (page - 1) * pageSize;
        const sql = `SELECT a.did, a.title, a.demand_desc, a.status, a.bid, b.branch_name from demand_info a LEFT JOIN branch_info b
        on a.bid = b.bid WHERE uid=${uid} limit ${start}, ${pageSize};`;
        const data = await query(sql);
        return data;
    }

    /**
     * @description: 更新需求状态
     * @param {String} did
     * @return: 
     */
    async updateDemandStatusByDid(did, status) {
        const sql = 
            `UPDATE demand_info 
            SET status=${status}
            WHERE did='${did}'` ;
        console.log(sql)
        const data = await query(sql);
        return data;
    }
}

module.exports = DemandModel;