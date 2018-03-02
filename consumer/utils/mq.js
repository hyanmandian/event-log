const amqp = require('amqplib');
const callerId = require('caller-id');
const S = require('string');
const os = require('os');

let queues = {};

function recordCallback(queueName, cb) {
  if (!queues[queueName]) queues[queueName] = {};

  queues[queueName] = cb;
}

module.exports = (url) => {
  const mqConn = amqp.connect(url);
  const mqChannel = mqConn.then(conn => conn.createChannel());

  return {
    onChange(cb) {
      const queueName = `event-log.${S(S(callerId.getData().filePath).splitRight('/', 1)[1]).strip(".js")}`;

      let channel;

      return mqChannel.then(_channel => {
        channel = _channel;
        return channel.assertQueue(queueName, { durable: true, exclusive: false });
      }).then(() => {
        return channel.bindQueue(queueName, mq.exchange);
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
