
var Reaction = require('../models/reactions');

//create- post
exports.create_reaction = function(req, res, next){
    var reaction = new Reaction({
        Star: req.body.star,
        ClientName: req.body.clientName,
        Content: req.body.content
    });

    reaction.save(function (err){
        if(err) return next(err);
        res.send(reaction);
    })
}
//read-get all db
exports.get_reaction_db = function(req, res, next){
    Reaction.find()
        .exec(function(err, list){
            if(err) return next(err);
            res.send(list);
    })
}

