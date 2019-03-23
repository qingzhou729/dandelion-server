/*
 * @LastEditors: yuxue.yang
 * @Date: 2019-03-09 20:22:39
 * @LastEditTime: 2019-03-23 09:29:04
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
     * @param {int} page
     * @param {int} status
     * @return: 用户的所有需求
     */
    async selectDemandByUid(uid, page, status) {
        const pageSize = 10;
        const start = (page - 1) * pageSize;
        const sql = `SELECT a.did, a.title, a.demand_desc, a.status, a.bid, a.create_time, b.branch_name from demand_info a LEFT JOIN branch_info b
        on a.bid = b.bid WHERE uid='${uid}' ${status ? `and status=${status}` : ''} limit ${start}, ${pageSize};`;
        const data = await query(sql);
        return data;
    }

    /**
     * @description: 更新需求状态
     * @param {String} did
     * @param {int} status
     * @return: 
     */
    async updateDemandStatusByDid(did, status) {
        const sql = 
            `UPDATE demand_info 
            SET status=${status}
            WHERE did='${did}'` ;
        const data = await query(sql);
        return data;
    }

    /**
     * @description: 查找所有需求的数量
     * @return: 
     */
    async selectDemandCount() {
        const sql = `select count(*) from demand_info`;
        const data = await query(sql);
        return data;
    }

    /**
     * @description: 删除一个需求
     * @param {String} did
     * @return: 
     */
    async deleteDemandByDid(did) {
        console.log(did)
        const sql = `DELETE FROM demand_info WHERE did = '${did}'`;
        console.log(sql)
        const data = await query(sql);
        return data;
    }
    
    /**
     * @description: 修改需求信息
     * @param {type} 
     * @return: 
     */  
    async updateDemandByDid(did, title, demand_desc) {
        console.log('修改')
        const sql = `UPDATE demand_info SET title='${title}', demand_desc='${demand_desc}' WHERE did='${did}'` ;
        console.log('sql', sql)
        const data = await query(sql);
        return data;
    }  
}

module.exports = DemandModel;