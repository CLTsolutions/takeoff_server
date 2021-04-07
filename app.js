require('dotenv').config()
const Express = require('express')
const app = Express()
const db = require('./db')

const controllers = require('./controllers/index')

app.use(Express.json())

// controllers
app.use('/user', controllers.User)
app.use('/review', controllers.Review)

// app.use(cors())
// app.use(require("./middleware/validate-jwt"))
// app.use('/flight', middleware.ValidateJWT, controllers.flightC)
// app.use('/review', middleware.ValidateJWT, controllers.reviewC)
app.use('/flight', controllers.Flight)

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