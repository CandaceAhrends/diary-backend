const loginMonitor = require("../loginMonitor");

describe("Testing login limits", () => {
  beforeEach(() => {
    loginMonitor.clearAttempts("testUser");
  });

  test("loading monitor", () => {
    expect(loginMonitor).toBeDefined();
  });

  test("loading monitor", () => {
    let res = true;
    for (let i = 0; i < 10; i++) {
      res = loginMonitor.attemptLogin("testUser");
    }

    expect(res).toEqual(false);
  });
  test("loading monitor", () => {
    const res = loginMonitor.attemptLogin("testUser");

    expect(res).toEqual(true);
  });
});
