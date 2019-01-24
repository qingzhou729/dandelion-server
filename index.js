const Koa = require('koa');
const middleware = require('./middleware')
const app = new Koa();

middleware(app);

const PORT = 3000;
app.listen(PORT);
console.log(`server is starting at port ${PORT}`);