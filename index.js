const Koa = require('koa');
const middleware = require('./middleware');
const session = require("koa-session2");
const Store = require("./utils/Store.js");
const body = require('koa-body');
const app = new Koa();

// session配置
app.use(session({
    store: new Store(),
    key: "SESSIONID",
}));
// 解析 post 参数
app.use(body());
// 中间件
middleware(app);


// 端口选择
let PORT = 3001;
console.log(__dirname)
if (__dirname.indexOf('pre-dir') > 0) {
    PORT = 3002;
    console.log('预发环境');
    process.env.NODE_ENV = 'pre';
} else if (__dirname.indexOf('pro-dir') > 0) {
    PORT = 3001;
    console.log('线上环境');
    process.env.NODE_ENV = 'pro';
} else {
    PORT = 3001;
    console.log('开发环境');
    process.env.NODE_ENV = 'dev';
}

// 服务启动
app.listen(PORT);
console.log(`server is starting at port ${PORT}`);
