import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { router } from './routes/router.js'

import 'dotenv/config'
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/', router)
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
