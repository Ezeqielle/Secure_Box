#!/bin/sh

apt update
apt install git

git clone https://github.com/cve-search/CVE-Search-Docker.git

docker-compose up