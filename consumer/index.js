const fs = require('fs');
const path = require('path');
const { onChange } = require('./utils/mq')(process.env.RABBIT_URL);

const app = require('harvesterjs')({
    adapter: 'mongodb',
    connectionString: process.env.MONGO_URL,
    inflect: true,
});

const requireFolder = (dir) => fs.readdirSync('./app/' + dir).map((fileName) => require(`./${dir}/${fileName}`)(app));

requireFolder(path.join(__dirname, '/models'));

onChange(async (data) => {
    await app.adapter.create('transaction', data);
    console.log(`Received log: ${JSON.stringify(data)}`);
});

app.listen(process.env.PORT);
