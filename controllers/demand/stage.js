const shell = require('shelljs');
const shortid = require('js-shortid');
const BranchModel = require('../../model/BranchModel');
const branchModel = new BranchModel();
const Store = require("../../utils/Store.js");
const redis = new Store();
const cp = require('child_process');

// 上预发布环境
async function stage(ctx, next) {
    // 检查登录态
    const SESSIONID = ctx.cookies.get('SESSIONID');

    if (!SESSIONID) {
        console.log('没有携带SESSIONID，去登录吧~');
        ctx.body = {
            mes: '没有携带SESSIONID，去登录吧~',
            data: '',
            success: true,
        };
        return;
    }
    const redisData = await redis.get(SESSIONID);

    if (!redisData) {
        console.log('SESSIONID已经过期，去登录吧~');
        ctx.body = {
            mes: 'SESSIONID已经过期，去登录吧~',
            data: '',
            success: true,
        };
        return;
    }

    const {branch_name, did} = ctx.request.query;

    const path = `/project-data/dandelion/`;

    cp.execSync(`/data/dandelion-server/shell/stage.sh ${path} ${branch_name}`);

    ctx.body = {
        mes: '预发布成功~',
        data: '',
        success: true,
    };
}

module.exports = {
    stage,
};