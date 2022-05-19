# stage 1 - build react app
FROM node:alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . /app

RUN npm run build --silent


# stage 2 - build the final image and copy the react build files
FROM nginx:1.19-alpine AS server

COPY --from=builder ./app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]

