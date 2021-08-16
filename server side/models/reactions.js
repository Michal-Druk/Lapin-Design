var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReactionsSchema = new Schema(
    {
        Star: { type: Number, require: true },
        ClientName: { type: String },
        Content: { type: String }
    }
);

module.exports = mongoose.model('Reactions', ReactionsSchema);