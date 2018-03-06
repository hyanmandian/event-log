const fortune = require('fortune');
const mongodbAdapter = require('fortune-mongodb');
const express = require('express')
const fortuneHTTP = require('fortune-http');
const jsonApiSerializer = require('fortune-json-api')

setTimeout(() => {
    const { onChange } = require('./utils/mq')({
        url: process.env.RABBIT_URL,
        exchange: process.env.EXCHANGE,
    });
    
    const store = fortune({
        transaction: require('./models/transaction'),
    }, {
        adapter: [ mongodbAdapter, { url: process.env.MONGODB_URL } ],
    });
    
    const app = express();
    
    const listener = fortuneHTTP(store, { serializers: [ jsonApiSerializer ] });
    
    onChange(({ createdAt, ...data }) => {
        store.create('transaction', {
            ...data,
            createdAt: new Date(createdAt),
        }).then(() => {
            console.log(`Received log: ${JSON.stringify(data)}`);
        });
    });
    
    app.use((request, response) => listener(request, response));
    app.listen(process.env.PORT);
}, 5000);