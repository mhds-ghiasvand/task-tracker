const test = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const path = require("node:path");

const mainPath = path.join(__dirname, "../main.js");

function runApp(input) {
    return new Promise((resolve, reject) => {

        const child = spawn(process.execPath, [mainPath]);

        let output = "";
        let errorOutput = "";

        child.stdout.on("data", data => {
            output += data.toString();
        });

        child.stderr.on("data", data => {
            errorOutput += data.toString();
        });

        child.on("error", reject);

        child.on("close", code => {
            resolve({
                code,
                output,
                errorOutput
            });
        });

        child.stdin.write(input);
        child.stdin.end();
    });
}

test("Main: should exit when user enters 5", async () => {

    const result = await runApp("5\n");

    assert.match(result.output, /Goodbye!/);
    assert.equal(result.code, 0);
});

test("Main: should show error for invalid command", async () => {

    const result = await runApp("abc\n");

    assert.match(result.output, /You should enter number/);
    assert.equal(result.code, 0);
});

test("Main: should show error for unavailable command", async () => {

    const result = await runApp("9\n");

    assert.match(
        result.output,
        /There isn't a command with this number/
    );

    assert.equal(result.code, 0);
});
