#!/bin/bash

# 进入目标项目
cd $1
git checkout $2
git pull origin $2
rm -rf node_modules/
npm install
npm run build

# git checkout master
# git pull origin master
# git merge $2 -m '预发'


