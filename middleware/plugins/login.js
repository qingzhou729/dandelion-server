const Store = require("../../utils/Store");
const redis = new Store();
module.exports = () => {
    return async (ctx, next) => {
        // 白名单
        if (ctx.request.url === '/api/login') {
            return await next();
        } 
        const SESSIONID = ctx.cookies.get('SESSIONID');

        if (!SESSIONID) {
            return ctx.body = {
                mes: '没有携带SESSIONID~',
                data: '',
                err_code: 1,
                success: false,
            };
        }

        const redisData = await redis.get(SESSIONID);
        if (!redisData) {
            return ctx.body = {
                mes: 'SESSIONID已经过期~',
                data: '',
                err_code: 1,
                success: false,
            };
        }

        if (redisData && redisData.uid) {
            console.log(`中间件-登录了，uid为${redisData.uid}`);
            await next();
        }
    }
}
