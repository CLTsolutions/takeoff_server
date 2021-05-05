const router = require('express').Router()
const { User } = require('../models/index')
const { UniqueConstraintError } = require('sequelize/lib/errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


/*****************
   * REGISTER *
******************/
router.post('/register', async (req,res) => {
    let { firstName, lastName, email, password } = req.body
    try {
        const result = await User.create({ 
            firstName, 
            lastName, 
            email, 
            password: bcrypt.hashSync(password, 13) 
        })

        let token = jwt.sign({id: result.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

        res.status(200).json({ 
            message: "User created successfully.", 
            user: result, 
            sessionToken: token 
        })
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
    let { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })
        if (user === null) {
            res.status(404).json({ message: 'Login failed. User not found.' })
        } else if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
            res.status(200).json({ 
                message: "Login successful.", 
                user: user,
                sessionToken: token
            })
        } else {
            res.status(401).json({ message: "Login Failed." });
        }
    } catch (err) {
        res.status(500).json({ err: "Error logging in." })
    }
})

module.exports = router