#!/bin/zsh

getResult() {
    if [ $? = 0 ]; then
        echo "${bg[green]}${fg_bold[black]} PASS ${reset_color}"
    else
        echo "${bg[red]}${fg_bold[white]} FAIL ${reset_color}"
    fi
}

runner() {
    image_name=$1
    echo "
${fg_bold[green]}run $image_name${reset_color}"
    docker-compose run --rm $image_name
}

beginTime=`date +%s`

runner only-node
resultOnlyNode=`getResult`

runner node-git
resultNodeGit=`getResult`

runner node-git-conf
resultNodeGitConf=`getResult`

runner node16-git-conf-npm8
resultNodeGitConfNpm=`getResult`

runner node14-git-conf-npm6
resultNode14GitConfNpm6=`getResult`

cat <<EOF
All Testing Results
${fg_bold[green]}only-node            $resultOnlyNode
${fg_bold[magenta]}node-git             $resultNodeGit
${fg_bold[cyan]}node-git-conf        $resultNodeGitConf
${fg_bold[blue]}node16-git-conf-npm8 $resultNodeGitConfNpm
${fg_bold[blue]}node14-git-conf-npm6 $resultNode14GitConfNpm6
EOF

currentTime=`date +%s`
elapsedTime=`expr $currentTime - $beginTime`
echo "Time                $elapsedTime s"
