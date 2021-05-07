const router = require('express').Router()
const validateSession = require('../middleware/validate-jwt')
const { User, Flight } = require('../models/index')

/**********
 * CREATE *
 ***********/
router.post('/', async (req, res) => {
  try {
    const result = await Flight.create({
      airline: req.body.airline,
      flightNumber: req.body.flightNumber,
      originAirport: req.body.originAirport,
      destAirport: req.body.destAirport,
      flightMiles: req.body.flightMiles,
      flightTime: req.body.flightTime,
      international: req.body.international,
      date: req.body.date,
      userId: req.user.id,
      //   owner_id: req.user.id,
    })
    res.status(200).json({ message: 'Flight created successfully.', result })
  } catch (err) {
    res.status(500).json({ message: 'Flight was not created.', error: err })
  }
})

/*********************
 * GET ALL BY USER ID *
 ********************/
// 'uid' so I remember grabbing by user id, NOT flight id
router.get('/user/:uid', async (req, res) => {
  const { uid } = req.user
  try {
    // eager loading (1 query instead of 2 (faster performance))
    const user = await User.findOne({
      where: { id: uid },
      include: Flight,
    })
    if (user === null) {
      res.status(404).json({ message: 'User not found.' })
    } else if (user.flights.length === 0) {
      res
        .status(404)
        .json({ message: 'User has no flights. Try creating one.' })
    } else {
      res.status(200).json(user)
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving flights.', error: err })
  }
})

/*******************
 * GET ALL ADMIN *
 *******************/
router.get('/', async (req, res) => {
  try {
    const all = await Flight.findAll()
    if (all.length === 0) {
      res
        .status(404)
        .json({ message: 'No flights were found! Try creating one.' })
    } else {
      res.status(200).json(all)
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving flights.', error: err })
  }
})

/*******************
 * GET ALL BY USER *
 *******************/
router.get('/mine', async (req, res) => {
  // const { id } = req.user.id
  try {
    const all = await Flight.findAll({ where: { userId: req.user.id } })
    if (all.length === 0) {
      res
        .status(404)
        .json({ message: 'No flights were found! Try creating one.' })
    } else {
      res.status(200).json(all)
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving flights.', error: err })
  }
})

/************
 * GET ONE *
 ************/
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const one = await Flight.findOne({ where: { id: id } })
    if (one.length === 0) {
      res.status(404).json({ message: 'No flight found! Try creating one.' })
    } else {
      res.status(200).json(one)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

/***********
 * UPDATE *
 ***********/
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const update = {
      airline: req.body.airline,
      flightNumber: req.body.flightNumber,
      originAirport: req.body.originAirport,
      destAirport: req.body.destAirport,
      flightMiles: req.body.flightMiles,
      flightTime: req.body.flightTime,
      international: req.body.international,
      date: req.body.date,
    }
    const result = await Flight.update(update, { where: { id: id } })
    if (result[0] === 0) {
      res.status(404).json({ message: 'No flight found.' })
    } else {
      res
        .status(200)
        .json({ message: 'Your flight has been updated.', update: update })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

/**********
 * DELETE *
 **********/
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await Flight.destroy({ where: { id: id } })
    if (result === 1) {
      res
        .status(200)
        .json({ message: 'Flight has been removed', result: result })
    } else {
      res.status(404).json({ message: 'No flight found.' })
    }
  } catch (err) {
    res.status(500).json({ err: err })
  }
})

module.exports = router
