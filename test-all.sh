#!/bin/zsh

# for dir in find -mindepth 1 -maxdepth 2 -type d)
for dir in */
do
    cd "$dir"
    echo "===== ${dir:0:-1} ====="
    [ ! -f /tmp/list.txt ]
    if [ -f part1.js ]
    then
        node part1
    fi
    if [ -f part2.js ]
    then
        node part2
    fi
    if [ -f solution.js ]
    then
        node solution
    fi
    cd ..
done
