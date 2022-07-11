class ContextProducer {
  client;

  constructor(client) {
    this.client = client;
  }

  publish(channel, message) {
    this.client.publish(channel, message);
  }
}

function createContextProducer(client) {
  return new ContextProducer(client);
}

module.exports.ContextProducer = ContextProducer;
module.exports.createContextProducer = createContextProducer;
