# syntax=docker/dockerfile:1
FROM node:18-bullseye-slim
RUN apt-get update
RUN apt-get -y install python3 nmap
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 3000
CMD ["node", "app.js"]