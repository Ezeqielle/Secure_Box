# syntax=docker/dockerfile:1
FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 443
ENV PORT=443
ENV HTTPS=true
CMD ["npm", "start"]