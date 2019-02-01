/*
 * @Date: 2019-01-31 21:30:10
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-01-31 21:31:29
 */

const {query} = require('../common/mysql');

class ProjectModel {
    constructor() {}

    /**
     * @description: 查找所有的项目信息
     * @param {String} uid
     * @return: 用户的所有需求
     */
    async selectProjectInfo(uid) {
        const sql = `SELECT * FROM project_info`;
        const data = await query(sql);
        return data;
    }
}

module.exports = ProjectModel;