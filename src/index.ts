import path from 'path'
import {fileURLToPath} from 'url'

import express from 'express'
import 'dotenv/config'

import TaskRoute from './routes/task.route.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.urlencoded({extended: false})); //? to parse form data - usually used in HTML form submissions
app.use(express.json()); //? to parse JSON data - usually used in API requests

app.use(TaskRoute)

app.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1><br/><p>The requested resource was not found on this server.</p>')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

export {__dirname as rootPath}