const User = require('./User')
const Flight = require('./Flight')
const Review = require('./Review')

//db association set up here
//'review' here is the model
// the 'belongsTo' sets up the extra column
User.hasMany(Review)
Review.belongsTo(User) //sets up extra column

User.hasMany(Flight)
Flight.belongsTo(User)

Flight.hasOne(Review)
Review.belongsTo(Flight)

// Flight.hasOne(User)
// User.belongsTo(Flight)

module.exports = {
    User,
    Flight,
    Review
}