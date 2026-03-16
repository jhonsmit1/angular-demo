# build angular
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# nginx server
FROM nginx:alpine

COPY --from=build /app/dist/*/browser /usr/share/nginx/html

EXPOSE 80
