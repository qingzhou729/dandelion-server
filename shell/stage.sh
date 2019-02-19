#!/bin/bash

# 进入目标项目
cd $1
git checkout master
git pull origin master
git merge $2 -m '预发'

npm install
npm run build
