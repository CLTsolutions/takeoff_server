const User = require('./User')
const Flight = require('./Flight')
const Blog = require('./Blog')

//db association sets up here
User.hasMany(Flight) //flight is model
Flight.belongsTo(User) //sets up extra column in table

User.hasMany(Blog)
Blog.belongsTo(User)

Flight.hasOne(Blog)
Blog.belongsTo(Flight)

module.exports = {
  User,
  Flight,
  Blog,
}
