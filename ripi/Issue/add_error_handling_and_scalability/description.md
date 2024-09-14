# add_error_handling_and_scalability (Issue)

- [x] Implement error handling for invalid inputs and timeouts
  - [x] Add Error Handling to the Service
  - [x] Add Error Handling to the Client
- [x] Enhance the service to handle multiple requests concurrently
- [x] Write tests to ensure correct error handling and performance
- [x] Add Tests for Concurrent Requests
- [x] Run tests

```bash
$ npm run test

> grenache-fibonacci-service@1.0.0 test
> npx jest

 PASS  test/integration.test.js
 PASS  test/client.integration.test.js
 PASS  test/fibonacci.test.js

Test Suites: 3 passed, 3 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        1.917 s, estimated 16 s
Ran all test suites.
```
