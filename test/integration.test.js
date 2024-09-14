const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

describe("Fibonacci Microservice Integration", () => {
  const link = new Link({
    grape: "http://127.0.0.1:30001",
  });

  link.start();

  const peer = new PeerRPCClient(link, {});
  peer.init();

  afterAll(() => {
    peer.stop();
    link.stop();
  });

  // Error handling tests
  test("should return an error for negative input", (done) => {
    peer.request(
      "fibonacci_worker",
      { number: -1 },
      { timeout: 10000 },
      (err, result) => {
        expect(err).toBeTruthy();
        expect(err.message).toBe(
          "Invalid input. Please provide a non-negative number."
        );
        done();
      }
    );
  });

  test("should return an error for non-numeric input", (done) => {
    peer.request(
      "fibonacci_worker",
      { number: "not_a_number" },
      { timeout: 10000 },
      (err, result) => {
        expect(err).toBeTruthy();
        expect(err.message).toBe(
          "Invalid input. Please provide a non-negative number."
        );
        done();
      }
    );
  });

  // Concurrent requests test
  test("should handle multiple concurrent requests", (done) => {
    let completedRequests = 0;

    const checkDone = () => {
      if (++completedRequests === 3) {
        done();
      }
    };

    peer.request(
      "fibonacci_worker",
      { number: 10 },
      { timeout: 10000 },
      (err, result) => {
        expect(err).toBeNull();
        expect(result).toBe(55);
        checkDone();
      }
    );

    peer.request(
      "fibonacci_worker",
      { number: 15 },
      { timeout: 10000 },
      (err, result) => {
        expect(err).toBeNull();
        expect(result).toBe(610);
        checkDone();
      }
    );

    peer.request(
      "fibonacci_worker",
      { number: 20 },
      { timeout: 10000 },
      (err, result) => {
        expect(err).toBeNull();
        expect(result).toBe(6765);
        checkDone();
      }
    );
  });
});
