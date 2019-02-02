#!/bin/bash
cd /Users/yangyuxue/work/study/code-practice/dandelion
git pull
git checkout -b test_jc4
git push --set-upstream origin test_jc4

git merge origin/test_me
git push

