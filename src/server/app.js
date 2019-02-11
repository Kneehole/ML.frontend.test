const express = require("express")
const routes = require('./routes/')

const app = express()
const router = express.Router()
routes(router)

app.use('/api', router)
app.get('/', (req, res) => res.send(''))

const port = 3001

app.listen(port, () => console.log(`Front-end test listening on port ${port}!`))