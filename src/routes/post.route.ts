import {Router} from 'express'
import Task from '../task.js'

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
            res.status(400).send(`<h1>Invalid Request</h1><br/><p>${(error as any).message}</p>`)
        }
        
    } else {
        res.status(400).send("<h1>Invalid Request</h1><br/><p>Title is required.</p>")
    }
})

export default router