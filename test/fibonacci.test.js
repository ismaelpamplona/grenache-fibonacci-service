function fibonacci(n) {
  return null;
}

describe("Fibonacci Service", () => {
  test("should return 1 for n = 1", () => {
    expect(fibonacci(1)).toBe(1);
  });

  test("should return 55 for n = 10", () => {
    expect(fibonacci(10)).toBe(55);
  });

  test("should return 1 for n = 0", () => {
    expect(fibonacci(0)).toBe(1);
  });
});
