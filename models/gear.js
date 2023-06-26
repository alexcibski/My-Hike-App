const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
    parkingPass: { type: Boolean, default: false, required: true},
    tenEssentials: { type: Boolean, default: true, required: true},
    bearCannister: { type: Boolean, default: false, required: true},
    bearSpray: { type: Boolean, default: false, required: true}
});

module.exports = gearSchema;