/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/gears`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (All gears): 
// GET localhost:3000/gears/
router.get('/', (req, res) => {
	db.Hike.find({}, { gears: true, _id: false })
        .then(hikes => {
		    // format query results to appear in one array, 
		    // rather than an array of objects containing arrays 
	    	const flatList = []
	    	for (let hike of hikes) {
	        	flatList.push(...hike.gears)
	    	}
	    	res.json(flatList)
		}
	)
});

// New Route: GET localhost:3000/gears/new
router.get('/new/:hikeId', (req, res) => {
    db.Hike.findById(req.params.hikeId)
        .then(hike => {
            if (hike) {
                res.render('new-gear.ejs', { hike: hike })
            } else {
                res.render('404')
            }
        })
})

// Create Route: POST localhost:3000/gears/
router.post('/create/:hikeId', (req, res) => {
    db.Hike.findByIdAndUpdate(
        req.params.hikeId,
        { $push: { gears: req.body } },
        { new: true }
    )
        .then(hike => res.redirect('/hikes/' + hike._id))
    })

// Show Route: GET localhost:3000/gears/:id
router.get('/:id', (req, res) => {
    db.Hike.findOne(
        { 'gears._id': req.params.id },
        { 'gears.$': true, _id: false }
    )
        .then(hike => {
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            res.json(hike.gears[0])
        })
});

// Destroy Route: DELETE localhost:3000/gears/:id
router.delete('/:id', (req, res) => {
    db.Hike.findOneAndUpdate(
        { 'gears._id': req.params.id },
        { $pull: { gears: { _id: req.params.id } } },
        { new: true }
    )
        .then(hike => res.redirect('/hikes/' + hike._id))
    })


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
