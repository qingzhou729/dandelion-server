const {query} = require('../common/mysql');

class UserModel {
    constructor() {}

    /**
     * 查询所有用户信息
     */
    async getData() {
        let sql = 'SELECT * FROM user_info';
        let dataList = await query(sql);
        return dataList;
    }
}

module.exports = UserModel;