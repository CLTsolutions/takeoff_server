const router = require('express').Router()
const { Review } = require('../models/index')

/***************
   * CREATE *
****************/
router.post('/', async (req, res) => {
  const { review } = req.body.review
  const { userId, flightId } = req.body
    try {
      const result = await Review.create({ review, flightId, userId })
      res.status(200).json({ message: 'Review created successfully.', result })
    } catch (err) {
      res.status(500).json({ message: 'Review was not created.', error: err })
    }
})

/***************
   * GET ALL *
****************/
router.get("/", async (req, res) => {
  try {
      const all = await Review.findAll()
      if (all.length === 0) {
          res.status(404).json({ message: "No reviews were found! Try creating one." })
      } else {
          res.status(200).json(all)
      }
  } catch (err) {
      res.status(500).json({ message: 'Error retrieving reviews.', error: err })
  }
})

/***************
  * GET ONE *
****************/
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const review = await Review.findAll({ where: { id: id }})
    if (review.length === 0) {
        res.status(404).json({ message: "No reviews were found! Try creating one." })
    } else {
        res.status(200).json(review)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

/***************
   * UPDATE *
****************/
router.put('/:id', async (req, res) => {
  const { review } = req.body.review
  const { id } = req.params
  const update = { review: review }

  try {
    const result = await Review.update(update, { where: { id: id } })
    if (result[0] === 0) {
        res.status(404).json({ message: "No review found.", result: result })
    } else {
        res.status(200).json({ message: "Review has been updated.", result })
    }
  } catch (err) {
      res.status(500).json({ error: err })
  }
})

/***************
   * DELETE *
****************/
router.delete('/:id', async (req,res) => {
  const { id } = req.params
  try {
      const result = await Review.destroy({ where: { id: id } })
      if (result === 1) {
          res.status(200).json({ message: "Review has been removed", result: result })
      } else {
          res.status(404).json({ message: "No review found." })
      }
  } catch (err) {
      res.status(500).json({ err: err })
  }
})

module.exports = router