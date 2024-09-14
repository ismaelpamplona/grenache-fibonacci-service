# setup_grenache_microservice_infrastructure (Issue)

- [x] Install and configure Grenache Grape (DHT node)
- [x] Create a Fibonacci service that registers with the DHT
- [x] Write integration tests to check the service registration and response
- [x] Run tests

```bash
$ npm run test

> grenache-fibonacci-service@1.0.0 test
> npx jest

 PASS  test/integration.test.js
 PASS  test/fibonacci.test.js

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.74 s, estimated 1 s
Ran all test suites.
```
