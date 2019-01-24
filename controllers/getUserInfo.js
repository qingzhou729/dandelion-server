const { query } = require('../common/mysql');
async function getData() {
    let sql = 'SELECT * FROM user_info';
    let dataList = await query(sql);
    return dataList;
}

module.exports = {
    getData,
};