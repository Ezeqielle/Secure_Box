# syntax=docker/dockerfile:1
FROM python:3.11-rc-slim-bullseye
WORKDIR /app
RUN apt update
RUN apt -y install git nmap wget gnupg2
RUN git clone https://github.com/offensive-security/exploitdb.git /opt/exploitdb && ln -sf /opt/exploitdb/searchsploit /usr/local/bin/searchsploit
RUN git clone https://github.com/cve-search/cve-search.git
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - &&\
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list &&\
    apt-get update && apt-get install -y mongodb-org &&\
    systemctl daemon-reload &&\
    systemctl start mongod &&\
    systemctl enable mongod
RUN xargs sudo apt-get install -y < ./cve-search/requirements.system
RUN pip install -r ./cve-search/requirements.txt
CMD ["/bin/bash"]