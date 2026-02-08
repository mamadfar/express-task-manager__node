import path from 'path'
import {fileURLToPath} from 'url'

import express from 'express'
import 'dotenv/config'

import GetRoute from './routes/get.route.js'
import PostRoute from './routes/post.route.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.urlencoded({extended: false}));

app.use(GetRoute)
app.use(PostRoute)

app.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1><br/><p>The requested resource was not found on this server.</p>')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})