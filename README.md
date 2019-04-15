## 功能设计
![功能设计](https://user-gold-cdn.xitu.io/2019/3/24/169afeeb36321a50?w=922&h=1300&f=png&s=201330)

## 环境配置
- 一台服务器（可选）
- Nignx 启动服务
- Redis 缓存用户登录态
- Mysql 数据库（表设计见issue）
- Pm2 用于管理Node进程

## 运行
- 环境搭建好后 执行`pm2 start index.js`即可
