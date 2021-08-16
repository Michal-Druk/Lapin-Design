var mongoose = require('mongoose');

var pictureSchema = new mongoose.Schema({
    Name: { type: String },
    Pictures: { type: Array }
});

module.exports = new mongoose.model('Picture', pictureSchema);