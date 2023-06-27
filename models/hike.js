//Require the Mongoose package
const mongoose = require('mongoose');
// const gearSchema = require('./gear');

//create a schema to define the properties of the hikes collection
const hikeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    miles: { type: Number, min: 0, required: true },
    elevationGain: { type: Number, min: 0, required: true },
    description: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
    routePic: { type: String, required: false},
    inclinePic: { type: String, required: false},
    additionalInfo: {type: String, required: false},
//gear schema below
    // gear: [gearSchema]

});

//Export the schema as a mongoose model
//the model will be accessed in models/index.js
module.exports = mongoose.model('Hike', hikeSchema);