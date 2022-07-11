const { ContextConsumer, createContextConsumer } = require(".");

const { createClient } = require("redis");

const client = createClient();
client.on("connect", () => console.log("connect"));
client.on("ready", () => console.log("ready"));
client.on("end", () => console.log("end"));
client.on("error", (error) => console.log("error", error.message));
client.on("reconnecting", () => console.log("reconnecting"));
client.connect();

const contextConsumer1 = new ContextConsumer(client);
const contextConsumer2 = createContextConsumer(client);

console.log("test context-consumer");
