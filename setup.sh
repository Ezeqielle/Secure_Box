#!/bin/sh

apt update
apt install git -y

git clone https://github.com/cve-search/CVE-Search-Docker.git
git clone https://github.com/vulsio/go-exploitdb.git

docker-compose up