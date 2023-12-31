/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');



/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const hikesCtrl = require('./controllers/hikes')
const gearsCtrl = require('./controllers/gears')

/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//     // wait for nodemon to fully restart before refreshing the page
//     setTimeout(() => {
//         liveReloadServer.refresh("/");
//     }, 100);
// });


/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
// app.use(connectLiveReload());
// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));

// Detect if running in a dev environment
if (process.env.ON_HEROKU === 'false') {
    // Configure the app to refresh the browser when nodemon restarts
    const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () => {
        // wait for nodemon to fully restart before refreshing the page
        setTimeout(() => {
        liveReloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLiveReload());
}

// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));




/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    res.render('home')
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

app.get('/about', function (req, res) {
    res.render('about')
})

// This tells our app to look at the `controllers/hikes.js` file 
// to handle all routes that begin with `localhost:3000/hikes`
app.use('/hikes', hikesCtrl)
// This tells our app to look at the `controllers/gears.js` file 
// to handle all routes that begin with `localhost:3000/gears`
app.use('/gears', gearsCtrl)




/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
