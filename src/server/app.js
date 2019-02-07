const express = require("express")
const routes = require('./routes/')

const app = express()
const router = express.Router()

routes(router)

const port = 3001

app.use('/api', router)
app.get('/', (req, res) => res.send(''))

app.listen(port, () => console.log(`Front-end test listening on port ${port}!`))