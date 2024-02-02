import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import './db/models/index'
import {getGrades} from './services/grades'
import logRouter from './routers/logRouter'
import statisticRouter from './routers/statisticRouter'

const port = process.env.PORT || 8080

const app = express()

getGrades()

app.use(cors())
app.use(express.json())

app.use('/log', logRouter)
app.use('/statistic', statisticRouter)

app.listen(port, () => console.log('Http: server started on port:', port))

export default app
