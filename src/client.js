const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});

link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

const inputNumber = parseInt(process.argv[2], 10);

if (isNaN(inputNumber)) {
  console.error("Please provide a valid number as an argument.");
  process.exit(1);
}

peer.request(
  "fibonacci_worker",
  { number: inputNumber },
  { timeout: 10000 },
  (err, result) => {
    if (err) {
      console.error("Error:", err);
      process.exit(1);
    }
    console.log(`Fibonacci(${inputNumber}) = ${result}`);
    process.exit(0);
  }
);

console.error("🔗 Client request sent... awaiting response!");
