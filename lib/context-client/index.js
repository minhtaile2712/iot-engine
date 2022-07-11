const { io } = require("socket.io-client");

class ContextClient {
  socket;
  subscribedTopics;
  constructor() {
    this.socket = io();
    this.subscribedTopics = new Map();

    this.socket.on("connect", () => console.log("connect"));
    this.socket.on("disconnect", (resStr) => console.log("disconnect", resStr));
    this.socket.on("connect_error", (err) =>
      console.log("connect_error", err.message)
    );
    this.socket.on("message", (topic, message) => {
      if (this.subscribedTopics.has(topic)) {
        let handles = this.subscribedTopics.get(topic);
        handles.forEach((handle) => handle(message, topic));
      }
    });
  }

  subscribe(topic, handle) {
    this.socket.emit("subscribe", topic);

    if (!this.subscribedTopics.has(topic)) {
      this.subscribedTopics.set(topic, new Set([handle]));
    } else this.subscribedTopics.get(topic).add(handle);
  }

  unsubscribe(topic, handle) {
    this.socket.emit("unsubscribe", topic);
    this.subscribedTopics.get(topic).delete(handle);
  }
}

module.exports = ContextClient;
