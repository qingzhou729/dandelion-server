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

const PORT = 3001;
app.listen(PORT);
console.log(`server is starting at port ${PORT}`);
