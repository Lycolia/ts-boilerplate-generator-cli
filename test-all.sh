#!/bin/sh

getResult() {
    if [ $? = 0 ]; then
        echo "\e[1;32;40m PASS \e[m"
    else
        echo "\e[1;31;47m FAIL \e[m"
    fi
}

runner() {
    image_name=$1
    echo "
\e[32mrun $image_name\e[m"
    docker compose run --rm $image_name
}

beginTime=`date +%s`

runner only-node
resultOnlyNode=`getResult`

runner node-git
resultNodeGit=`getResult`

runner node-git-conf
resultNodeGitConf=`getResult`


echo "
All Testing Results
\e[32monly-node            $resultOnlyNode\e[m
\e[33mnode-git             $resultNodeGit\e[m
\e[34mnode-git-conf        $resultNodeGitConf\e[m
"

currentTime=`date +%s`
elapsedTime=`expr $currentTime - $beginTime`
echo "Time                $elapsedTime s"
