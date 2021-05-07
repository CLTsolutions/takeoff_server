const { DataTypes } = require('sequelize')
const db = require('../db')

module.exports = db.define('blog', {
  title: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  entry: {
    type: DataTypes.TEXT,
  },
})
