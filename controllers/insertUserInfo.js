const UserModel = require('../model/UserModel');
const userModel = new UserModel();

async function insertUserInfo(ctx, next) {
    let data = await userModel.insertUserInfo();
    ctx.body = {
        mes: 'ok',
        data,
        success: true,
    };
};


module.exports = {
    insertUserInfo,
};