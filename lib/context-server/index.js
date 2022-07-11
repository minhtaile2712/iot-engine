const ContextSubscriber = require("./ContextSubscriber");
const { Server } = require("socket.io");

class ContextServer {
  io;
  contextSubscriber;
  subscribedTopics;

  constructor() {
    this.contextSubscriber = new ContextSubscriber();
    this.subscribedTopics = new Set();
    this.io = new Server();

    this.io.on("connection", (socket) => {
      socket.on("subscribe", (topic) => {
        socket.join(topic);
        if (!this.subscribedTopics.has(topic)) {
          this.contextSubscriber.subscribe(topic, (message, channel) => {
            this.io.in(channel).emit("message", channel, message);
          });
          this.subscribedTopics.add(topic);
        }
      });

      socket.on("unsubscribe", (topic) => {
        socket.leave(topic);
      });
    });

    this.io.of("/").adapter.on("delete-room", (room) => {
      if (this.subscribedTopics.has(room)) {
        this.contextSubscriber.unsubscribe(room);
        this.subscribedTopics.delete(room);
      }
    });
  }

  attach(httpServer) {
    this.io.attach(httpServer);
  }
}

module.exports = ContextServer;
