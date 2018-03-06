const fortune = require('fortune');
const mongodbAdapter = require('fortune-mongodb');
const express = require('express')
const fortuneHTTP = require('fortune-http');
const jsonApiSerializer = require('fortune-json-api');

const { onMessage } = require('./utils/mq')({ url: process.env.RABBIT_URL, exchange: process.env.EXCHANGE});

const store = fortune(require('./models'), { adapter: [ mongodbAdapter, { url: process.env.MONGODB_URL } ] });

const app = express();

const listener = fortuneHTTP(store, { serializers: [ jsonApiSerializer ] });

onMessage(async ({ createdAt, ...data }) => {
    await store.create('transaction', { ...data, createdAt: new Date(createdAt) });

    console.log(`Received log: ${JSON.stringify(data)}`);
});

app.use((request, response) => listener(request, response)).listen(process.env.PORT);