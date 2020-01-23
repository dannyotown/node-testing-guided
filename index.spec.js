const supertest = require("supertest");
const server = require("./index");

beforeEach(async () => {
  await db.seed.run();
});
test("welcome route", async () => {
  const res = await supertest(server).get("/");
  expect(res.status).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body.message).toBe("Welcome");
});
test("get hobbit list", async () => {
  const res = await supertest(server).get("/hobbits");
  expect(res.status).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body.length).toBeGreaterThan(0);
});
test("create hobbit route", async () => {
  const res = await supertest(server)
    .post("/hobbits")
    .send({ name: "Gaffer" });
  expect(res.status).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body).toEqual({ id: "5", name: "gaffer" });
});
