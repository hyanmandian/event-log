const fs = require('fs');
const path = require('path');

console.log(JSON.stringify(process.env, null, 4));

const { onChange } = require('./utils/mq')({
    url: process.env.RABBIT_URL,
    exchange: process.env.EXCHANGE,
});

const app = require('harvesterjs')({
    adapter: 'mongodb',
    connectionString: process.env.MONGO_URL,
    inflect: true,
});

const requireFolder = (dir) => fs.readdirSync('./app/' + dir).map((fileName) => require(`./${dir}/${fileName}`)(app));

requireFolder(path.join(__dirname, '/models'));

onChange((data) => {
    app.adapter.create('transaction', data).then(() => {
        console.log(`Received log: ${JSON.stringify(data)}`);
    });
});

app.listen(process.env.PORT);
