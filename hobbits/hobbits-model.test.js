const hobbitsModel = require("./hobbits-model");
const db = require("../data/config");
beforeEach(async () => {
  await db.seed.run();
});
describe("hobbits model", () => {
  test("findById", async () => {
    const res = await hobbitsModel.findById(1);
    expect(res.name).toBe("sam");
  });
  test("insert", async () => {
    await hobbitsModel.insert({ name: "bilbo" });
    const hobbits = await db("hobbits").select();
    expect(hobbits).toHaveLength(5);
  });
  test("list", async () => {
    const result = await hobbitsModel.list();
    expect(result).toHaveLength(4);
  });
  test("update", async () => {
    await hobbitsModel.update(1, { name: "fred" });
    const fred = await hobbitsModel.findById(1);
    expect(fred.name).toBe("fred");
  });
  test("remove", async () => {
    await hobbitsModel.remove(1);
    const hobbits = await hobbitsModel.list();
    expect(hobbits).toHaveLength(3);
  });
});
