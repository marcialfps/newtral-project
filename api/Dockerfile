# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /api
COPY . .
RUN npm install --omit=dev
CMD ["node", "server.js"]
EXPOSE 3000