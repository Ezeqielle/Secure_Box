# syntax=docker/dockerfile:1
FROM node:18-bullseye-slim
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get -y install python3 nmap
RUN npm i
CMD ["node", "."]