require('dotenv').config()
const Express = require('express')
const app = Express()
const db = require('./db')

app.use(require("./middleware/headers"))
const controllers = require('./controllers/index')

app.use(Express.json())

// controllers
app.use('/user', controllers.User)

// app.use(cors())
// app.use(require("./middleware/validate-jwt"))
// app.use('/flight', middleware.ValidateJWT, controllers.flightC)
// app.use('/review', middleware.ValidateJWT, controllers.reviewC)
app.use('/flight', controllers.Flight)
app.use('/review', controllers.Review)

db.authenticate()
    .then(() => db.sync())
    // .then(() => db.sync({force: true}))
    .then(() => {
        app.listen(process.env.PORT, console.log(`[server]: listening on localhost:${process.env.PORT}`))
    })
    .catch(err => {
        console.log('[server]: Server Crashed')
        console.log(err)
    })