const amqp = require('amqplib');
const delay = require('delay');

let queues = {};

function recordCallback(queueName, cb) {
  if (!queues[queueName]) queues[queueName] = {};

  queues[queueName] = cb;
}

const connectToMQ = (url) => amqp.connect(url).catch(() => delay(100).then(() => connectToMQ(url)));

module.exports = ({ url, exchange }) => {
  const mqConn = connectToMQ(url);
  const mqChannel = mqConn.then(conn => conn.createChannel());

  return {
    onMessage(cb) {
      const queueName = `consumer.queue`;

      let channel;

      return mqChannel.then(_channel => {
        channel = _channel;
        return channel.assertQueue(queueName, { durable: true, exclusive: false });
      }).then(() => {
        return channel.bindQueue(queueName, exchange);
      }).then(() => {
        return recordCallback(queueName, cb);
      }).then(() => {
        channel.consume(queueName, msg => {
          const obj = JSON.parse(msg.content.toString());
          const cb = queues[queueName];

          if (cb) cb(obj);

          channel.ack(msg);
        });
      });
    },
  };
};
