#!/bin/bash

git pull
git checkout -b $1
git push --set-upstream origin $1

git merge $2
git push
npm run build
