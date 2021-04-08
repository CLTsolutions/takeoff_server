const router = require('express').Router()
const { User, Flight } = require('../models/index')

/***************
   * CREATE *
****************/
router.post('/', async (req, res) => {
    try {
      const result = await Flight.create({
          airline: req.body.flight.airline,
          flightNumber: req.body.flight.flightNumber,
          originAirport: req.body.flight.originAirport,
          destAirport: req.body.flight.destAirport,
          flightMiles: req.body.flight.flightMiles,
          flightTime: req.body.flight.flightTime,
          international: req.body.flight.international,
          userId: req.body.userId
      })
      res.status(200).json({ message: 'Flight created successfully.', result })
    } catch (err) {
        res.status(500).json({ message: 'Flight was not created.', error: err })
    }
})

/***************
   * GET ALL *
****************/
router.get("/", async (req, res) => {
    try {
        const all = await Flight.findAll()
        if (all.length === 0) {
            res.status(404).json({ message: "No flights were found! Try creating one." })
        } else {
            res.status(200).json(all)
        }
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving flights.', error: err })
    }
})

/***************
  * GET ONE *
****************/
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const one = await Flight.findAll({ where: { id: id }})
      if (one.length === 0) {
          res.status(404).json({ message: "No flights were found! Try creating one." })
      } else {
          res.status(200).json(one)
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
})

/***************
   * UPDATE *
****************/
router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const update = {
          airline: req.body.flight.airline,
          flightNumber: req.body.flight.flightNumber,
          originAirport: req.body.flight.originAirport,
          destAirport: req.body.flight.destAirport,
          flightMiles: req.body.flight.flightMiles,
          flightTime: req.body.flight.flightTime,
          international: req.body.flight.international
      }
      const result = await Flight.update(update, { where: { id: id } })
      if (result[0] === 0) {
          res.status(404).json({ message: "No flight found.", result: result })
      } else {
          res.status(200).json({ message: "Your flight has been updated.", update: update })
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
        const result = await Flight.destroy({ where: { id: id } })
        if (result === 1) {
            res.status(200).json({ message: "Flight has been removed", result: result })
        } else {
            res.status(404).json({ message: "No flight found." })
        }
    } catch (err) {
        res.status(500).json({ err: err })
    }
})

module.exports = router