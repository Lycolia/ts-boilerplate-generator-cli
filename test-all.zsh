#!/bin/zsh

getResult() {
    if [ $? = 0 ]; then
        echo "${bg[green]}${fg_bold[black]} PASS ${reset_color}"
    else
        echo "${bg[red]}${fg_bold[white]} FAIL ${reset_color}"
    fi
}

beginTime=`date +%s`

echo "${fg_bold[green]}run only-node${reset_color}"
docker-compose run --rm only-node
resultOnlyNode=`getResult`

echo "
${fg_bold[magenta]}run node-git${reset_color}"
docker-compose run --rm node-git
resultNodeGit=`getResult`

echo "
${fg_bold[cyan]}run node-git-conf${reset_color}"
docker-compose run --rm node-git-conf
resultNodeGitConf=`getResult`

echo "
${fg_bold[blue]}run node-git-conf-npm7${reset_color}"
docker-compose run --rm node-git-conf-npm7
resultNodeGitConfNpm7=`getResult`

cat <<EOF
All Testing Results
${fg_bold[green]}only-node           $resultOnlyNode
${fg_bold[magenta]}node-git            $resultNodeGit
${fg_bold[cyan]}node-git-conf       $resultNodeGitConf
${fg_bold[blue]}node-git-conf-npm7  $resultNodeGitConfNpm7
EOF

currentTime=`date +%s`
elapsedTime=`expr $currentTime - $beginTime`
echo "Time                $elapsedTime s"
