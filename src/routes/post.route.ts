import { Router } from 'express';
import Task from '../task.js';

const router = Router()

router.post('/add-task', (req, res) => {
    if (req.body.title) {
        const title = req.body.title;
        const completed = req.body.completed === 'on';

        try {
            const task = new Task(title, completed);
            task.save();
            res.redirect('/');
        } catch (error) {
            res.status(400).json(`<h1>Invalid Request</h1><br/><p>${(error as any).message}</p>`)
        }
        
    } else {
        res.status(400).json("<h1>Invalid Request</h1><br/><p>Title is required.</p>")
    }
})

router.post('/toggle-task', (req, res) => {
    if(req.body.id) {
        const task = Task.getTaskById(Number(req.body.id));

        if(task) {
            task.completed = !task.completed;
            task.save();
            res.json({success: true, completed: task.completed})
        } else {
            res.status(404).json("<h1>Not Found</h1><br/><p>Task with the specified ID was not found.</p>")
        }
    } else {
        res.status(400).json("<h1>Invalid Request</h1><br/><p>Task ID is required.</p>")
    }
})

export default router