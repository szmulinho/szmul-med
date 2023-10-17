# Etap budowania
FROM node:alpine as build

WORKDIR /szmul-med

COPY package.json ./
COPY . .

RUN npm install
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "dev"]
