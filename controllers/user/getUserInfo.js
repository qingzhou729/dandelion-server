const UserModel = require('../../model/UserModel');
const userModel = new UserModel();

async function getUserInfo(ctx, next) {
    let data = await userModel.getData();
    ctx.body = {
        mes: 'ok',
        data,
        success: true,
    };
};


module.exports = {
    getUserInfo,
};
