const Koa = require('koa');
const Router = require('koa-router');
const select = require('./controllers/getUserInfo');

const app = new Koa();
// 从路由注册表中获取路由
const router = new Router();

// 加前缀
router.prefix('/api');

router.get('/getUserInfo', async function (ctx, next) {
    let data = await select.getData();
    ctx.body = {
        mes: 'ok',
        data,
        success: true,
    };
});

app.use(router.routes())
    .use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT);
console.log(`start-quick is starting at port ${PORT}`);