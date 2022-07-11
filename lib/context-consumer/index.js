class ContextConsumer {
  client;

  constructor(client) {
    this.client = client;
  }

  subscribe(channel, callback) {
    this.client.subscribe(channel, callback);
  }
  pSubscribe(pattern, callback) {
    this.client.pSubscribe(pattern, callback);
  }

  unsubscribe(channel) {
    this.client.unsubscribe(channel);
  }

  pUnsubscribe(channel) {
    this.client.pUnsubscribe(channel);
  }
}

function createContextConsumer(client) {
  return new ContextConsumer(client);
}

module.exports.ContextConsumer = ContextConsumer;
module.exports.createContextConsumer = createContextConsumer;
