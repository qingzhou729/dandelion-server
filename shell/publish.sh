#!/bin/bash
mkdir test
git pull
git checkout -b $0
git push --set-upstream origin $0

git merge $1
git push
npm run build
