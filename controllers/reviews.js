const router = require('express').Router()
const { Review } = require('../models/index')

/***************
   * CREATE *
****************/
router.post('/', async (req, res) => {
  let { review } = req.body.review
  let { userId, flightId } = req.body
    try {
      const result = await Review.create({ review, flightId, userId })
      res.json(result)
    } catch (err) {
      res.json({ error: err })
    }
})

// // READ ALL
// router.get('/', async (req, res) => {
//     try {
//         const all = await Review.findAll()
//         res.json(all)
//     } catch (error) {
//         res.json({ error })
//     }
// })

// // READ One
// router.get('/:id', async (req, res) => {
//     try {
//         const one = await Review.findOne({ where: { id: req.params.id }})
//         res.json(one)
//     } catch (err) {
//         res.json({ error: err })
//     }
// })

// // Update One
// router.put('/:id', (req, res,next) => {

// })

module.exports = router