const test = require("node:test"); const assert = require("node:assert/strict");

const fs = require("node:fs/promises"); const os = require("node:os"); const path = require("node:path");

const { Storage } = require("../storage");

test("Storage: should write and read tasks correctly", async (t) => {

const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "task-test-")
);

t.after(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
});

const filePath = path.join(tempDir, "tasks.json");
const storage = new Storage(filePath);

const tasks = [
    { id: 1, title: "Learn JavaScript" },
    { id: 2, title: "Learn Node.js" }
];

await storage.write(tasks);

const result = await storage.read();

assert.deepEqual(result, tasks);


});

test("Storage: should return empty array if file does not exist", async (t) => {

const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "task-test-")
);

t.after(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
});

const filePath = path.join(tempDir, "missing.json");
const storage = new Storage(filePath);

const result = await storage.read();

assert.deepEqual(result, []);


});

test("Storage: should return empty array if file is empty", async (t) => {

const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "task-test-")
);

t.after(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
});

const filePath = path.join(tempDir, "tasks.json");

await fs.writeFile(filePath, "");

const storage = new Storage(filePath);

const result = await storage.read();

assert.deepEqual(result, []);


});

test("Storage: should throw error if JSON is invalid", async (t) => {

const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "task-test-")
);

t.after(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
});

const filePath = path.join(tempDir, "tasks.json");

await fs.writeFile(filePath, "{ invalid json }");

const storage = new Storage(filePath);

await assert.rejects(
    storage.read(),
    SyntaxError
);


});

test("Storage: should throw error if JSON data is not an array", async (t) => {

const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "task-test-")
);

t.after(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
});

const filePath = path.join(tempDir, "tasks.json");

await fs.writeFile(filePath, '{"id":1}');

const storage = new Storage(filePath);

await assert.rejects(
    storage.read(),
    /Invalid tasks data/
);


});