var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UsersSchema = new Schema(
    {
        ID:{type:String, require: true, unique:true},
        UserName: {type: String, require: true},
        UserEmail:{type: String,  require: true},
        Password:{type: String, require: true}
    }
);

module.exports = mongoose.model('Users', UsersSchema);