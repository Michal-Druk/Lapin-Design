
var Picture = require('../models/pictures');
// Get  pictures
exports.get_picture=function(req,res,next) {
    Picture.find().exec( function(err,list) {
        if (err) return next(err);
        res.send(list);
    });
};

  
