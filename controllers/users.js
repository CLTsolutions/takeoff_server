const router = require('express').Router()
const { User } = require('../models/index')
// const { UniqueConstraintError } = require('sequelize/lib/errors')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')


/*********************
   * USER REGISTER *
**********************/
router.post('/register', async (req,res) => {
    let { firstName, lastName, email, password } = req.body
    try {
        const result = await User.create({ firstName, lastName, email, password })
        res.status(200).json(result)
    } catch (err) {
    res.status(500).json({ error: err })
    }
})

/********************
   * USER LOGIN *
*********************/
router.post('/login', async (req, res) => {
    let { firstName, lastName, email, password } = req.body
    try {
        const one = await User.findOne({ 
            where: { firstName, lastName, email, password }
        })
        res.status(200).json(one)
    } catch (err) {
        res.json({ error: err })
    }
})

// router.get('/:id', async (req, res) => {
//     try {
//       const one = await User.findOne({ where: { id: req.params.id }})
//       res.json(one)
//     } catch (err) {
//       res.json({ error: err })
//     }
// })

module.exports = router