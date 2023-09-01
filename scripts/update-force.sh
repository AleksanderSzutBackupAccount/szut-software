#!/bin/sh

echo "Updating force ${PROJECT}.....";
git fetch
git reset --hard HEAD
git pull