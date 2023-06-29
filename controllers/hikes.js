/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/hikes`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all hikes
router.get('/', function (req, res) {
    db.Hike.find({})
        .then(hikes => {
            res.render('hike-index', {
                hikes: hikes
            })
        })
})

//new form route
router.get('/new', (req, res) => {
    res.render('new-hike')
})

// Show Route (GET/Read): Will display an individual hike document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Hike.findById(req.params.id)
    .then(hike => {
        res.render('hike-details', {
            hike: hike
        })
    })
    .catch(() => res.send('404 Error: Page Not Found'))
})



// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new pet document using the form data, 
// and redirects the user to the new pet's show page
router.post('/', (req, res) => {
    db.Hike.create(req.body)
    .then(hike => res.json(hike))
})

// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing hike
router.get('/:id/edit', (req, res) => {
    db.Hike.findById(req.params.id)
    .then(hike => res.render('edit-hike', { hike: hike }))
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified pet document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Hike.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    .then(hike => res.json(hike))
})

// Destroy Route (DELETE/Delete): This route deletes a hike document 
// using the URL parameter (which will always be the hike document's ID)
router.delete('/:id', (req, res) => {
    db.Hike.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/hikes'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
