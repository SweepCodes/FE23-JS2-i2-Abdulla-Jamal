import fs from 'fs/promises';

async function readDB() {
    const raw = await fs.readFile('./taskdb.json');
    const db = JSON.parse(raw);
    return db;
}

async function writeDB(db) {
    const newDB = JSON.stringify(db, null, 2);
    await fs.writeFile('./taskdb.json', newDB)
}

async function getTasks() {
    const tasks = await readDB();
    return tasks;
}

async function addTask(newTask) {
    const tasks = await getTasks();
    tasks.push(newTask);
    await writeDB(tasks);
}
async function patchTask(id, name, status) {

    const tasks = await getTasks();
    const task = tasks.find(t => t.id == id);
    task.assignee = name;
    task.status = status;

    await writeDB(tasks);
    return task;
}
async function removeTask(taskid) {
    const tasks = await getTasks();

    let index;
    const task = tasks.find((t, i) => {
        index = i;
        return t.id == taskid;
    });

    if (task) {
        tasks.splice(index, 1);
        await writeDB(tasks);
    }
    return task;
}
export { getTasks, addTask, patchTask, removeTask };