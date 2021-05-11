require('dotenv').config()
const Express = require('express')
const cors = require('cors')
const app = Express()
const db = require('./db')

app.use(require('./middleware/headers'))
const controllers = require('./controllers/index')

//parse body of all requests as json
app.use(Express.json())

// controllers
app.use('/user', controllers.User)

app.use(cors())
app.use(require('./middleware/validate-jwt')) // best option - want ALL routes below protected
app.use('/flight', controllers.Flight)
app.use('/blog', controllers.Blog)

db.authenticate()
  .then(() => db.sync())
  // .then(() => db.sync({ force: true }))
  .then(() => {
    app.listen(
      process.env.PORT,
      console.log(`[server]: listening on localhost:${process.env.PORT}`)
    )
  })
  .catch(err => {
    console.log('[server]: Server Crashed')
    console.log(err)
  })
