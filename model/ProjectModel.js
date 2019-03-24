/*
 * @Date: 2019-01-31 21:30:10
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-03-24 16:45:29
 */

const {query} = require('../common/mysql');

class ProjectModel {
    constructor() {}

    /**
     * @description: 查找项目信息
     * @return: 项目信息
     */
    async selectProjectInfo(pid) {
        const sql = `SELECT * FROM project_info ${pid ? `where pid = ${pid}` : ``}`;
        const data = await query(sql);
        return data;
    }
}

module.exports = ProjectModel;