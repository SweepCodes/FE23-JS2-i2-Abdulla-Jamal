import { postTasks, patchTask, deleteTask } from "./fetches.js";

function createAndAppend(element, content, container, classes) {
    const el = document.createElement(element);
    container.append(el)
    if (element === 'input') {
        el.type = 'text'
        el.placeholder = 'Enter name'
    }
    else el.innerText = content;
    el.classList.add(classes)
    return el;
}

const form = document.querySelector('#main-task-form')
const todoCard = document.querySelector('#todo')
const inProgressCard = document.querySelector('#inprogress')
const doneCard = document.querySelector('#done')


function displayTasks(taskdata) {
    for (const task of taskdata) {
        console.log(task.category);
        if (task.status === 'To do') {
            const todoDisplayDiv = createAndAppend('div', '', todoCard, 'todo-div-style')
            createAndAppend('h3', `${task.task}`, todoDisplayDiv, 'task-title-style')
            const assignTxt = createAndAppend('input', '', todoDisplayDiv, 'assign-txt-style')
            const assignBtn = createAndAppend('button', 'Assign->>', todoDisplayDiv, 'assignBtn-style')
            todoDisplayDiv.classList.add(`${task.category.toLowerCase()}-color`);
            assignBtn.addEventListener('click', () => assignTask(assignTxt, task, todoDisplayDiv))
        }
        else if (task.status === 'In Progress') {
            const inprogDisplayDiv = createAndAppend('div', '', inProgressCard, 'inprog-div-style')
            createAndAppend('h3', `${task.task}`, inprogDisplayDiv, 'task-title-style')
            createAndAppend('h4', `-${task.assignee}`, inprogDisplayDiv, 'name-style')
            const doneBtn = createAndAppend('button', 'Done->>', inprogDisplayDiv, 'doneBtn-style')
            inprogDisplayDiv.classList.add(`${task.category.toLowerCase()}-color`);
            doneBtn.addEventListener('click', () => completeTask(task, task.assignee, inprogDisplayDiv))
        }
        else if (task.status === 'Done') {
            const doneDisplayDiv = createAndAppend('div', '', doneCard, 'inprog-div-style')
            createAndAppend('h3', `${task.task}`, doneDisplayDiv, 'task-title-style')
            createAndAppend('h4', `-${task.assignee}`, doneDisplayDiv, 'name-style')
            const removeBtn = createAndAppend('button', 'Remove X', doneDisplayDiv, 'doneBtn-style')
            doneDisplayDiv.classList.add(`${task.category.toLowerCase()}-color`);
            removeBtn.addEventListener('click', () => {
                deleteTask(task.id)
                doneDisplayDiv.classList.add('hide');
            })
        }
    }
}
function createNewTask(event) {
    event.preventDefault();
    const taskInput = document.querySelector('#task-input').value;
    const taskChoice = document.querySelector('#tasks-menu').value;
    const todoDiv = createAndAppend('div', '', todoCard, 'todo-div-style')
    todoCard.append(todoDiv);
    const task = {
        id: Date.now(),
        task: taskInput,
        category: taskChoice,
        status: "To do",
        assignee: ""
    }
    createAndAppend('h3', `${task.task}`, todoDiv, 'task-title-style')
    const assignTxt = createAndAppend('input', '', todoDiv, 'assign-txt-style')
    const assignBtn = createAndAppend('button', 'Assign->>', todoDiv, 'assignBtn-style')
    todoDiv.classList.add(`${taskChoice.toLowerCase()}-color`);
    assignBtn.addEventListener('click', () => assignTask(assignTxt, task, todoDiv))

    postTasks(task);

    form.reset();
}

function assignTask(name, task, todoDiv) {
    const inProgState = document.querySelector('#inprogstate')
    const inProgressDiv = createAndAppend('div', '', inProgressCard, 'inprog-div-style')
    inProgressCard.append(inProgressDiv)
    createAndAppend('h3', `${task.task}`, inProgressDiv, 'task-title-style')
    createAndAppend('h4', `-${name.value}`, inProgressDiv, 'name-style')
    const doneBtn = createAndAppend('button', 'Done->>', inProgressDiv, 'doneBtn-style')
    inProgressDiv.classList.add(`${task.category.toLowerCase()}-color`);
    todoDiv.classList.add('hide');
    patchTask(inProgState.innerText, name.value, task.id)
    doneBtn.addEventListener('click', () => completeTask(task, name.value, inProgressDiv))
}

function completeTask(task, assignee, inProgressDiv) {
    const doneState = document.querySelector('#donestate')
    const doneDiv = createAndAppend('div', '', doneCard, 'done-div-style')
    doneCard.append(doneDiv)
    createAndAppend('h3', `${task.task}`, doneDiv, 'task-title-style')
    createAndAppend('h4', `-${assignee}`, doneDiv, 'name-style')
    const removeBtn = createAndAppend('button', 'Remove X', doneDiv, 'doneBtn-style')
    doneDiv.classList.add(`${task.category.toLowerCase()}-color`);
    inProgressDiv.classList.add('hide');
    patchTask(doneState.innerText, assignee, task.id)
    removeBtn.addEventListener('click', () => {
        deleteTask(task.id)
        doneDiv.classList.add('hide');
    })
}

export { createNewTask, createAndAppend, displayTasks }

