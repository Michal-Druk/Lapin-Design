var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;
var BonusesUtilizedSchema = new Schema(
    {
        BonusId: { type: ObjectId, ref: 'BonusesInfo', required: true },
        UserId: { type: ObjectId, ref: 'Users', required: true },
        Code: { type: Number }
    }
);

module.exports = mongoose.model('BonusesUtilized', BonusesUtilizedSchema);