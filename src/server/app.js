const express = require("express")
const routes = require('./routes/')

// create app
const app = express()

// create api router
const router = express.Router()
routes(router)

// configure routes
app.use('/api', router)
app.get('/', (req, res) => res.send(''))

// port to use
const port = 3001

// start listening
app.listen(port, () => console.log(`Front-end test listening on port ${port}!`))