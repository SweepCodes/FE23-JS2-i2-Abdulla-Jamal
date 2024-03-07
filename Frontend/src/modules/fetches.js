const baseUrl = 'http://localhost:3000/tasks';


async function getTasks() {

    const res = await fetch(baseUrl);
    const tasks = await res.json();
    console.log(tasks);
    return tasks;
}


async function postTasks(newTask) {

    const option = {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
            "Content-type": "application/json"
        }
    }
    const res = await fetch(baseUrl, option);
    const task = await res.json();
    console.log(task.id)
}
async function patchTask(taskstate, name, taskid) {
    const url = baseUrl + `/${taskid}`;

    const option = {
        method: 'PATCH',
        body: JSON.stringify({ status: taskstate, assignee: name }),
        headers: {
            "Content-type": "application/json"
        }
    }
    const res = await fetch(url, option);
    const task = await res.json();
    console.log(task)
}
async function deleteTask(taskid) {
    const url = baseUrl + `/${taskid}`;

    const options = {
        method: "DELETE",
    }

    const res = await fetch(url, options);
    const info = await res.json();

    console.log(info);
}

export { getTasks, postTasks, patchTask, deleteTask }
