const router = require('express').Router()
const { Blog, User } = require('../models/index')

/***************
 * CREATE *
 ****************/
router.post('/', async (req, res) => {
  const { title, date, entry } = req.body
  const { id } = req.user
  try {
    const result = await Blog.create({
      title,
      date,
      entry,
      userId: id,
    })
    res.status(200).json({ message: 'Blog created successfully.', result })
  } catch (err) {
    res.status(500).json({ message: 'Blog was not created.', error: err })
  }
})

/**********************
 * GET ALL BY USER *
 ***********************/
router.get('/mine', async (req, res) => {
  try {
    const all = await Blog.findAll({
      where: { userId: req.user.id },
    })
    if (all.length === 0) {
      res.status(404).json({ message: 'Blogs not found.' })
    } else {
      res.status(200).json(all)
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
  // const { blog } = req.body
  const { title, date, entry } = req.body
  const { id } = req.params
  try {
    const update = { title, date, entry }
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
