/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const hikesCtrl = require('./controllers/hikes')


/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());


/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    res.send('My Hikes')
});
//when GET request is sent to '/seed', the hikes collection is seeded
app.get('/seed',function (req, res) {
    db.Hike.deleteMany({})
        .then(removedHikes => {
            console.log(`Removed ${removedHikes.deletedCount} hikes`)
            // Seed the hikes collection with the seed data
            db.Hike.insertMany(db.seedHikes)
                .then(addedHikes => {
                    console.log(`Added ${addedHikes.length} hikes`)
                    res.json(addedHikes)
                })
        })
});

// This tells our app to look at the `controllers/pets.js` file 
// to handle all routes that begin with `localhost:3000/pets`
app.use('/hikes', hikesCtrl)




/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
