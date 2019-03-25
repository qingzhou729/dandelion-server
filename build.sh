#! /bin/bash

PM2_BIN=`which pm2`

# 获取路径
SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
echo $SHELL_FOLDER

# 启动的服务
DEPLOY_ENV="dev"

# 判断是否为预发环境
preDir="pre-dir"
if [[ $SHELL_FOLDER =~ $preDir ]]
then
    echo "预发目录"
    DEPLOY_ENV="pre"
else
    echo "不是预发目录"
fi

# 判断是否为生产环境
proDir="pro-dir"
if [[ $SHELL_FOLDER =~ $proDir ]]
then
    echo "线上目录"
    DEPLOY_ENV="pro"
else
    echo "不是线上目录"
fi

# PM2 启动node服务
${PM2_BIN} startOrRestart ${SHELL_FOLDER}/ecosystem.config.js --only dandelion-server-${DEPLOY_ENV}