#!/bin/bash
git pull
git checkout -b test_jc
git push --set-upstream origin test_jc

git merge test_me
git push

