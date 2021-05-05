const { DataTypes } = require('sequelize')
const db = require('../db')

module.exports = db.define('flight', {
    airline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    flightNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    originAirport: {
        type: DataTypes.STRING,
        allowNull: true
    },
    destAirport: {
        type: DataTypes.STRING,
        allowNull: true
    },
    flightMiles: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    flightTime: {
        // type: DataTypes.STRING,
        type: DataTypes.TIME,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    international: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
})