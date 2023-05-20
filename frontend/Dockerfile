FROM node:18-alpine3.17 as build
WORKDIR /usr/app
ENV REACT_APP_API_URL http://192.168.1.20:8000/api/
ENV REACT_APP_URL http://192.168.1.20:8000/
COPY . /usr/app
RUN npm ci
RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 8001
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html