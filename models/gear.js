const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
    parkingPass: { type: String, required: true},
    tenEssentials: { type: String, required: true},
    bearCannister: { type: String, required: true},
    bearSpray: { type: String, required: true},
    notes: { type: String, required: false}
});

module.exports = gearSchema;