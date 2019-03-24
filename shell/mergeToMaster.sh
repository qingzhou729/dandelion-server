#!/bin/bash

echo '进入目标项目'
cd $1
git checkout master
git merge origin/$2
git push origin master
