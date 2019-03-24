#!/bin/bash

echo '进入目标项目'
cd $1
echo '切换到开发分支'
git checkout $2
git pull origin master
echo 'pull 所有代码'
git pull origin $2
echo '删除node_modules'
rm -rf node_modules/
echo 'npm install'
npm install
echo 'npm run build'
npm run build
echo '部署到预发环境'
rm -rf $4
cp -rf $3 $4