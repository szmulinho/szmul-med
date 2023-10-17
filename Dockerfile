FROM node:alpine as build

WORKDIR /app

COPY package.json ./
COPY . ./

RUN npm install

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist ./

EXPOSE 8888

CMD ["nginx", "-g", "daemon off;"]
