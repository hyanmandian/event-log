FROM node:6.11.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
RUN npm start

EXPOSE 3000