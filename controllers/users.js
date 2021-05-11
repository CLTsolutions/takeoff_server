const router = require('express').Router()
const { User } = require('../models/index')
const { UniqueConstraintError } = require('sequelize/lib/errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/*****************
 * REGISTER *
 ******************/
router.post('/register', async (req, res) => {
  let { firstName, lastName, email, password, userRole } = req.body
  try {
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
      userRole: userRole || 'User',
    })

    let token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    })

    res.status(200).json({
      message: 'User created successfully.',
      user: result,
      sessionToken: token,
    })
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: 'Email already in use' })
    } else {
      res.status(500).json({
        message: 'Failed to register user',
        error: err,
      })
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
    } else if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      })
      res.status(200).json({
        message: 'Login successful.',
        user: user,
        sessionToken: token,
      })
    } else {
      res.status(401).json({ message: 'Login Failed.' })
    }
  } catch (err) {
    res.status(500).json({ err: 'Error logging in.' })
  }
})

/*******************
 * GET ALL ADMIN *
 *******************/
router.get('/', async (req, res) => {
  try {
    const all = await User.findAll()
    if (all.length === 0) {
      res.status(404).json({ message: 'No user were found! Try creating one.' })
    } else {
      res.status(200).json(all)
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users.', error: err })
  }
})

/*****************
 * ADMIN DELETE *
 *****************/
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await User.destroy({ where: { id: id } })
    if (result === 1) {
      res.status(200).json({ message: 'User has been removed', result: result })
    } else {
      res.status(404).json({ message: 'No user found.' })
    }
  } catch (err) {
    res.status(500).json({ err: err })
  }
})

module.exports = router
