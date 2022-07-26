#!/bin/sh

#apt update
#apt install git -y

echo REACT_APP_HOST_IP=$(ip route get 1.2.3.4 | awk '{print $7}') > vuln-scanner/frontend/.env

git clone https://github.com/cve-search/CVE-Search-Docker.git

docker-compose up --build
