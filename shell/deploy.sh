#!/bin/bash
cd /data/dandelion
git pull origin master
git checkout -b $1
git push --set-upstream origin $1

git merge origin/$2
git push
npm run build

