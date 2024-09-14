const { PeerRPCServer } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");
const fibonacci = require("./fibonacci");

const link = new Link({
  grape: "http://127.0.0.1:30001", // Pointing to the first Grape node
});

link.start();
console.log("🚀 Server is running... ");

const peer = new PeerRPCServer(link, {});
peer.init();

const service = peer.transport("server");
service.listen(1337);

setInterval(() => {
  link.announce("fibonacci_worker", service.port, {});
}, 1000);

service.on("request", (rid, key, payload, handler) => {
  const result = fibonacci(payload.number);
  handler.reply(null, result);
});
