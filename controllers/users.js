const router = require('express').Router()
const { User } = require('../models/index')
const { UniqueConstraintError } = require('sequelize/lib/errors')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')


/*****************
   * REGISTER *
******************/
router.post('/register', async (req,res) => {
    let { firstName, lastName, email, password } = req.body
    try {
        const result = await User.create({ firstName, lastName, email, password })
        res.status(200).json({ message: "User created successfully.", result })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({ message: "Email already in use" });
        } else {
            res.status(500).json({
                message: "Failed to register user",
                error: err
            });
        }
    }
})

/**************
   * LOGIN *
***************/
router.post('/login', async (req, res) => {
    let { firstName, lastName, email, password } = req.body
    try {
        const user = await User.findOne({ 
            where: { firstName, lastName, email, password }
        })
        if (user === null) {
            res.status(404).json({ message: 'Login failed. User not found.' })
        } else {
            res.status(200).json({ message: "Login successful.", user })
        }
    } catch (err) {
        res.status(500).json({ error: "Error logging in." })
    }
})

module.exports = router