const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

describe("Fibonacci Microservice Integration", () => {
  const link = new Link({
    grape: "http://127.0.0.1:30001",
  });

  link.start();

  const peer = new PeerRPCClient(link, {});
  peer.init();

  // Stop the peer and link after tests
  afterAll(() => {
    peer.stop(); // This should clean up the PeerRPCClient resources
    link.stop(); // Stop the link to prevent open handles
  });

  test("should get Fibonacci result from the service", (done) => {
    peer.request(
      "fibonacci_worker",
      { number: 10 },
      { timeout: 10000 },
      (err, result) => {
        expect(err).toBeNull();
        expect(result).toBe(55);
        done();
      }
    );
  });
});
