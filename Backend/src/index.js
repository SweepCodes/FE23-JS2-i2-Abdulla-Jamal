import express from "express";
import { body, validationResult } from "express-validator";
import cors from "cors"
import { addTask, getTasks, removeTask, patchTask } from "./handledb.js";

const app = express();
const message404 = { message: 'User not found' };

app.use(cors());
app.use(express.json());

const postValidations = [
    body("task").exists().isString(),
    body("category").exists().isIn(["Design", "Backend", "Frontend"]),
    body("status").exists().isIn(["To do"]),
    body("assignee").exists().isString(),
];

const patchValidation = [
    body("status").exists().isIn(["In Progress", "Done"]),
    body("assignee").exists().isString(),
];

app.get('/tasks', async (req, res) => {
    const tasks = await getTasks()
    res.json(tasks);
})

app.post('/tasks', postValidations, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Wrong task structure" });
    }
    await addTask(req.body);
    res.json(req.body)
})
app.patch('/tasks/:id', patchValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Wrong task structure" });
    }
    patchTask(req.params.id, req.body.assignee, req.body.status)
        .then(task => {
            if (task) res.json(task)
            else {
                res.status(404);
                res.json(message404)
            }
        });
})
app.delete('/tasks/:id', (req, res) => {
    removeTask(req.params.id).then(task => {
        if (task) res.json({ task, message: 'removed' })
        else {
            res.status(404);
            res.json(message404)
        }
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
