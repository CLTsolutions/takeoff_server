const { DataTypes } = require('sequelize')
const db = require('../db')

module.exports = db.define('blog', {
  blog: {
    type: DataTypes.TEXT,
  },
})
