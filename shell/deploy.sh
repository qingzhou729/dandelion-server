#!/bin/bash

cd $1
git pull origin master
git checkout -b $2
git push --set-upstream origin $2
