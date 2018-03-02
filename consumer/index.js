const app = require('harvesterjs')({
    adapter: 'mongodb',
    connectionString: process.env.MONGO_URL,
    inflect: true,
});

app.listen(process.env.POST);
