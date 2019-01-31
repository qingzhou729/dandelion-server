/*
 * @Date: 2019-01-30 22:29:34
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-01-31 13:26:48
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
    async selectDemandByUid(uid) {
        const sql = `SELECT * FROM demand_info WHERE uid=${uid}`;
        const data = await query(sql);
        return data;
    }
}

module.exports = DemandModel;