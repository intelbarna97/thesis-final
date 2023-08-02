import * as AuthApi from "./AuthRequest.js";

test("login test", async () => {
  const formData = {
    username: "test1",
    password: "123",
  };
  const res = await AuthApi.logIn(formData);
  expect(res.status).toEqual(200);
});
