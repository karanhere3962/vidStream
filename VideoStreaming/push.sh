#!/bin/bash

read -p "Directories to Add : " direcs
git add ${direcs:="../"}
echo
read -p "Commit Message : " msg
git commit -m "${msg:="debugging"}"
echo
git push origin master
echo
echo "Current Status : "
git status