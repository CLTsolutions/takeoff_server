const router = require('express').Router()
const { Flight, Review, User } = require('../models/index')

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

/**********************
 * GET ALL BY FLIGHT *
***********************/
// 'fid' so I remember grabbing by flight id, NOT review id
router.get('/flight/:fid', async (req, res) => {
  const { fid } = req.params
  try {
      const flight = await Flight.findOne({ 
          where: { id: fid },
          include: Review
      })
      if (flight === null) {
          res.status(404).json({ message: 'Flight not found.' })
      } else if (flight.review === null) {
          res.status(404).json({ message: "Flight has no review. Try creating one." })
      } else {
          res.status(200).json(flight)
      }
  } catch (err) {
      res.status(500).json({ message: 'Error retrieving reviews.', error: err })
  }
})

/**********************
 * GET ALL BY USER *
***********************/
// 'uid' so I remember grabbing by user id, NOT review id
router.get('/user/:uid', async (req, res) => {
  const { uid } = req.params
  try {
      const user = await User.findOne({ 
          where: { id: uid },
          include: Review
      })
      if (user === null) {
          res.status(404).json({ message: 'User not found.' })
      } else if (user.reviews.length === 0) {
          res.status(404).json({ message: "User has no reviews. Try creating one." })
      } else {
          res.status(200).json(user)
      }
  } catch (err) {
      res.status(500).json({ message: 'Error retrieving reviews.', error: err })
  }
})

/***************
   * GET ALL *
****************/
router.get("/", async (req, res) => {
  try {
      const all = await Review.findAll()
      if (all.length === 0) {
          res.status(404).json({ message: "No reviews found. Try creating one." })
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
        res.status(404).json({ message: "No review found. Try creating one." })
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