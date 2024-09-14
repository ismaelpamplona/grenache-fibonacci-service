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

intervalId.unref(); // prevent setInterval from keeping the Node.js process running

service.on("request", (rid, key, payload, handler) => {
  const result = fibonacci(payload.number);
  handler.reply(null, result);
});

process.on("SIGTERM", () => {
  clearInterval(intervalId);
  link.stop();
  process.exit(0);
});

console.log("🚀 Server is running...");
