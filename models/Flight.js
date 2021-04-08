const { DataTypes } = require('sequelize')
const db = require('../db')

module.exports = db.define('flight', {
    airline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    flightNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    originAirport: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destAirport: {
        type: DataTypes.STRING,
        allowNull: false
    },
    flightMiles: {
        type: DataTypes.STRING,
        allowNull: false
    },
    flightTime: {
        type: DataTypes.TIME,
    },
    international: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})