const test = require("node:test"); const assert = require("node:assert/strict");

const { TaskList } = require("../task_manager");

const task = new TaskList();

test("Add: should create a task with correct ID and title", () => { const tasks = [];

const result = task.add("Learn JavaScript", tasks);

assert.deepEqual(result, {
    id: 1,
    title: "Learn JavaScript"
});


});

test("Add: should generate the next ID", () => { const tasks = [ { id: 1, title: "Task 1" }, { id: 3, title: "Task 3" } ];

const result = task.add("Task 4", tasks);

assert.equal(result.id, 4);


});

test("Edit: should update the task title", () => { const tasks = [ { id: 1, title: "Old title" }, { id: 2, title: "Another task" } ];

const result = task.edit(1, "New title", tasks);

assert.equal(result[0].title, "New title");
assert.equal(result[1].title, "Another task");


});

test("Edit: should return null if ID does not exist", () => { const tasks = [ { id: 1, title: "Task 1" } ];

const result = task.edit(10, "New title", tasks);

assert.equal(result, null);


});

test("Delete: should remove the task with given ID", () => { const tasks = [ { id: 1, title: "Task 1" }, { id: 2, title: "Task 2" } ];

const result = task.delete(1, tasks);

assert.deepEqual(result, [
    { id: 2, title: "Task 2" }
]);


});

test("ShowAll: should return all tasks", () => { const tasks = [ { id: 1, title: "Task 1" }, { id: 2, title: "Task 2" } ];

const result = task.showAll(tasks);

assert.deepEqual(result, tasks);


});