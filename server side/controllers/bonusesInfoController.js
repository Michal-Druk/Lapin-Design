var BonusesInfo = require('../models/bonusesInfo');

//read-get all db
exports.get_bonusesInfo_db = function(req, res, next){
    console.log('selected ', req.query.Id)
    BonusesInfo.find()
    .exec(function(err, list){
        if(err) return next(err);
        res.send(list);
        
    })
}
