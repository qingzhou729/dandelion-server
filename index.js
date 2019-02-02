const Koa = require('koa');
const middleware = require('./middleware');
const session = require("koa-session2");
const Store = require("./utils/Store.js");
const cors = require('koa-cors');
const body = require('koa-body');
const app = new Koa();
const historyApiFallback = require('koa2-connect-history-api-fallback');


// session
app.use(session({
    store: new Store(),
    key: "SESSIONID",
}));

// 解析 post 参数
app.use(body());


app.use(async (ctx, next) => {

    ctx.set('Access-Control-Allow-Origin', 'http://test.xue.com');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Allow-Headers', 'content-type');
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, HEAD, PUT, POST, DELETE, PATCH');

    // 这个响应头的意义在于，设置一个相对时间，在该非简单请求在服务器端通过检验的那一刻起，
    // 当流逝的时间的毫秒数不足Access-Control-Max-Age时，就不需要再进行预检，可以直接发送一次请求。
    ctx.set('Access-Control-Max-Age', 3600 * 24);

    console.log(ctx.method)
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200; 
    } else {
        await next();
    }
});

// app.use(historyApiFallback({ whiteList: ['/api'] }));

middleware(app);

const PORT = 3001;
app.listen(PORT);
console.log(`server is starting at port ${PORT}`);
