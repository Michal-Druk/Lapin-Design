var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BonusesInfoSchema = new Schema(
    {
        Image: { type: String },
        Sale: { type: String },
        Content: { type: String }
    }
);

module.exports = mongoose.model('BonusesInfo', BonusesInfoSchema);