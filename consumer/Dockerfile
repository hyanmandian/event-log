FROM node:6.11.0

RUN apt-get update
RUN apt-get install libkrb5-dev -y

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

EXPOSE 3000

CMD npm start
