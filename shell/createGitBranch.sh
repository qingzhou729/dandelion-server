#!/bin/bash
git pull
git checkout -b test_jc1
git push --set-upstream origin test_jc1

git merge test_me
git push

