const router = require('express').Router()
const { Flight, Blog, User } = require('../models/index')

/***************
 * CREATE *
 ****************/
router.post('/', async (req, res) => {
  // const { blog } = req.body.blog
  const { blog } = req.body
  const { userId, flightId } = req.body
  try {
    const result = await Blog.create({ blog, flightId, userId })
    res.status(200).json({ message: 'Blog created successfully.', result })
  } catch (err) {
    res.status(500).json({ message: 'Blog was not created.', error: err })
  }
})

/**********************
 * GET ALL BY FLIGHT *
 ***********************/
// 'fid' so I remember grabbing by flight id, NOT blog id
router.get('/flight/:fid', async (req, res) => {
  const { fid } = req.params
  try {
    const flight = await Flight.findOne({
      where: { id: fid },
      include: Blog,
    })
    if (flight === null) {
      res.status(404).json({ message: 'Flight not found.' })
    } else if (flight.blog === null) {
      res.status(404).json({ message: 'Flight has no blog. Try creating one.' })
    } else {
      res.status(200).json(flight)
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blogs.', error: err })
  }
})

/**********************
 * GET ALL BY USER *
 ***********************/
// 'uid' so I remember grabbing by user id, NOT blog id
router.get('/user', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findOne({
      where: { id: id },
      include: [{ model: Blog, include: Flight }],
    })
    if (user === null) {
      res.status(404).json({ message: 'User not found.' })
    } else if (user.blogs.length === 0) {
      res.status(404).json({ message: 'User has no blogs. Try creating one.' })
    } else {
      res.status(200).json(user)
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blogs.', error: err })
  }
})

/***************
 * GET ALL *
 ****************/
router.get('/', async (req, res) => {
  try {
    const all = await Blog.findAll()
    if (all.length === 0) {
      res.status(404).json({ message: 'No blogs found. Try creating one.' })
    } else {
      res.status(200).json(all)
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blogs.', error: err })
  }
})

/***************
 * GET ONE *
 ****************/
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const blog = await Blog.findAll({ where: { id: id } })
    if (blog.length === 0) {
      res.status(404).json({ message: 'No blog found. Try creating one.' })
    } else {
      res.status(200).json(blog)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

/***************
 * UPDATE *
 ****************/
router.put('/:id', async (req, res) => {
  // const { blog } = req.body.blog
  const { blog } = req.body
  const { id } = req.params
  const update = { blog: blog }

  try {
    const result = await Blog.update(update, { where: { id: id } })
    if (result[0] === 0) {
      res.status(404).json({ message: 'No blog found.' })
    } else {
      res.status(200).json({ message: 'Blog has been updated.', update })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

/***************
 * DELETE *
 ****************/
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await Blog.destroy({ where: { id: id } })
    if (result === 1) {
      res.status(200).json({ message: 'Blog has been removed', result: result })
    } else {
      res.status(404).json({ message: 'No blog found.' })
    }
  } catch (err) {
    res.status(500).json({ err: err })
  }
})

module.exports = router
