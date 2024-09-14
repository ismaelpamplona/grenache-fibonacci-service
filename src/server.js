const { PeerRPCServer } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");
const fibonacci = require("./fibonacci");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});

link.start();

const peer = new PeerRPCServer(link, {});
peer.init();

const service = peer.transport("server");
service.listen(1337);

const intervalId = setInterval(() => {
  link.announce("fibonacci_worker", service.port, {});
}, 1000);
intervalId.unref();

service.on("request", (rid, key, payload, handler) => {
  if (typeof payload.number !== "number" || payload.number < 0) {
    return handler.reply(
      new Error("Invalid input. Please provide a non-negative number.")
    );
  }

  setImmediate(() => {
    try {
      const result = fibonacci(payload.number);
      handler.reply(null, result);
    } catch (err) {
      handler.reply(err);
    }
  });
});
