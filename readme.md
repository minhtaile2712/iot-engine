## ContextConsumer

```javascript
const { createClient } = require("redis");
const { ContextConsumer } = require("iot-engine");

const client = createClient();
client.connect();

const contextConsumer = new ContextConsumer(client);
```

Or

```javascript
const { createClient } = require("redis");
const { createContextConsumer } = require("iot-engine");

const client = createClient();
client.connect();

const contextConsumer = createContextConsumer(client);
```
