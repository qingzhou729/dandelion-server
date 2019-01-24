const {query} = require('../common/mysql');

class UserModel {
    constructor() {}

    /**
     * 查询所有用户信息
     */
    async getData() {
        const sql = 'SELECT * FROM user_info';
        const data = await query(sql);
        return data;
    }

    /**
     * 新用户注册
     */
    async insertUserInfo() {
        const sql = 'insert user_info (nick_name, uid, aid) values(?,?,?)';
        const sqlParams = ['yingjie', 13, 13];
        let data = await query(sql, sqlParams, (err, result) => {
            return result;
        });
        return data;
        
    }
}

module.exports = UserModel;