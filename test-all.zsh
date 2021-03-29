#!/bin/zsh

getResult() {
    if [ $? = 0 ]; then
        echo "${bg[green]}${fg_bold[black]} PASS ${reset_color}"
    else
        echo "${bg[green]}${fg_bold[black]} FAIL ${reset_color}"
    fi
}

echo "${fg_bold[green]}run only-node${reset_color}"
docker-compose run only-node
resultOnlyNode=`getResult`

echo "
${fg_bold[magenta]}run node-git${reset_color}"
docker-compose run node-git
resultNodeGit=`getResult`

echo "
${fg_bold[cyan]}run node-git-conf${reset_color}"
docker-compose run node-git-conf
resultNodeGitConf=`getResult`

echo "
${fg_bold[blue]}run node-git-conf-npm7${reset_color}"
docker-compose run node-git-conf-npm7
resultNodeGitConfNpm7=`getResult`

# echo All Testing Results
# echo "${fg_bold[green]}only-node${reset_color}          ${resultOnlyNode}"
# echo "${fg_bold[magenta]}node-git${reset_color}         ${resultNodeGit}"
# echo "${fg_bold[cyan]}node-git-conf${reset_color}       ${resultNodeGitConf}"
# echo "${fg_bold[blue]}node-git-conf-npm7${reset_color}  ${resultNodeGitConfNpm7}"
cat <<EOF
All Testing Results
${fg_bold[green]}only-node           $resultOnlyNode
${fg_bold[magenta]}node-git            $resultNodeGit
${fg_bold[cyan]}node-git-conf       $resultNodeGitConf
${fg_bold[blue]}node-git-conf-npm7  $resultNodeGitConfNpm7
EOF
