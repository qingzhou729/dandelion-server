/*
 * @Date: 2019-01-31 13:22:54
 * @LastEditors: yuxue.yang
 * @LastEditTime: 2019-01-31 21:32:34
 */

const ProjectModel = require('../../model/ProjectModel');
// const UserModel = require('../model/UserModel');
const projectModel = new ProjectModel();
// const userModel = new UserModel();
const shortid = require('js-shortid');	
const Store = require("../../utils/store.js");
const redis = new Store();

async function selectProject(ctx, next) {

    // 判断用户是否登录
    const SESSIONID = ctx.cookies.get('SESSIONID');

    if (!SESSIONID) {
        console.log('没有携带SESSIONID，去登录吧~');
        return false;
    }
    const redisData = await redis.get(SESSIONID);

    if (!redisData) {
        console.log('SESSIONID已经过期，去登录吧~');
        return false;
    }

    
    if (redisData && redisData.uid) {
        console.log(`登录了，uid为${redisData.uid}`);
    }

    // 获取需求信息
    const data = await projectModel.selectProjectInfo();

    console.log(data);

    ctx.body = {
        mes: '',
        data,
        success: true,
    };
};

module.exports = {
    selectProject,
};
