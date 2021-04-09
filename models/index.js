const User = require('./User')
const Flight = require('./Flight')
const Review = require('./Review')

//db association sets up here
User.hasMany(Flight) //flight is model
Flight.belongsTo(User) //sets up extra column in table

User.hasMany(Review)
Review.belongsTo(User)

Flight.hasOne(Review)
Review.belongsTo(Flight)


module.exports = {
    User,
    Flight,
    Review
}