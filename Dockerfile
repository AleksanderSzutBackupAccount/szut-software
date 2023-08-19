FROM node:19.7.0-alpine as build-stage

ENV PORT=80

RUN npm install -g npm@9.6.7

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build --prod

FROM nginx:1.24.0-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]