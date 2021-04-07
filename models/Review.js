const { DataTypes } = require('sequelize')
const db = require('../db')

module.exports = db.define('review', {
    review: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})