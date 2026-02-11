import {Router} from 'express'
import Task from '../task.js'

const router = Router()

router.get('/', (req, res) => {

    const tasks = Task.getAllTasks();

    res.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="css/bootstrap.css" />
        <link rel="stylesheet" href="css/styles.css" />
        <title>Task Manager App</title>
    </head>
    <body>
        <div class="container">
            <div class="row mb-3">
                <div class="col">
                    <h1 class="text-center mt-3">Task Manager App</h1>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <form action="/add-task" method="POST" class="p-2 rounded-3 border">
                        <div class="input-group input-group-lg">
                            <input
                                type="text"
                                name="title"
                                class="form-control shadow-none"
                                placeholder="Enter a new title"
                            />
                            <button class="btn btn-primary shadow-none" type="submit">
                                Add new task
                            </button>
                        </div>
                        <div class="form-check mt-1 mb-0">
                            <input
                                class="form-check-input shadow-none"
                                type="checkbox"
                                name="completed"
                                id="my-checkbox"
                            />
                            <label class="form-check-label user-select-none" for="my-checkbox">
                                The task is completed.
                            </label>
                        </div>
                    </form>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <ul class="list-group lh-lg" id="tasks-list">
                        ${tasks.map(task => `
                            <li class="list-group-item d-flex bg-light">
                                <span class="flex-grow-1 d-flex align-items-center">
                                    <label>${task.title}</label>
                                    <span class="badge ${task.completed ? 'bg-success' : 'bg-secondary'} ms-auto me-3 user-select-none"
                                        >${task.completed ? 'Completed' : 'In progress'}</span
                                    >
                                </span>
                                <button class="btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'} me-3 toggle-btn" data-id="${task.id}">Toggle</button>
                                <button class="btn btn-sm btn-primary me-3 edit-btn" data-id="${task.id}">Edit</button>
                                <button class="btn btn-sm btn-danger delete-btn" data-id="${task.id}">Delete</button>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
        <script src="js/axios.min.js"></script>
        <script src="js/scripts.js"></script>
    </body>
</html>
`)
})

export default router