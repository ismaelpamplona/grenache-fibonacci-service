const { exec } = require("child_process");

describe("Fibonacci Client Integration", () => {
  test("should get the correct Fibonacci result for n = 10", (done) => {
    exec("node src/client.js 10", (error, stdout) => {
      expect(error).toBeNull();
      // Ensure the output contains the correct Fibonacci result
      expect(stdout).toContain("Fibonacci(10) = 55");
      done();
    });
  });

  test("should return an error message for invalid input", (done) => {
    exec("node src/client.js notanumber", (error, stdout, stderr) => {
      expect(stderr.trim()).toBe(
        "Please provide a valid number as an argument."
      );
      done();
    });
  });
});
