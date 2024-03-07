import { getTasks } from "./modules/fetches.js";
import { createNewTask, displayTasks } from "./modules/functionality.js";
const form = document.querySelector('#main-task-form')

function initializeApp() {
    getTasks().then(displayTasks);

    form.addEventListener('submit', createNewTask)
}
initializeApp();

