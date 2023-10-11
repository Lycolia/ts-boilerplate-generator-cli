#!/bin/sh

# ========================
#  テスト走行補助スクリプト
# ========================
# package.jsonから叩くとシェルの外で走行するため、Globが使えず、findコマンドを使うしかないのだが
# xargsより前をpackage.jsonのコマンドにするとゴミ文字が入り共通化が面倒だったので
# Shellscriptとして作っている
# コマンドを足したい場合は実行時に第一引数に指定する

commands="$1"

find src/ -name '*.spec.ts' | perl -pne 's/\\s+$/ /' | xargs node --require esbuild-register $commands --test 
