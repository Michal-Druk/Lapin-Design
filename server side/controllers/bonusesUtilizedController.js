var mailService = require('../services/bonusMailService')
var Users = require('../models/users');
var BonusesUtilized = require('../models/bonusesUtilized')
var BonusesInfo = require('../models/bonusesInfo');
const jwk = require("jsonwebtoken")
var code;
//create- post
exports.create_bonusUtilized = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const user=jwk.verify(token, "MySite");
    let finished = false;
    Users.findById(user.id).then((users) => {
        
        if (!users) {//Checks if there is such an user in the database
            res.status(404).send('user not found')
        }
        else {//if the answer is "no"
            BonusesInfo.findById(req.body.bonusId).then((bonusesInfo) => {
                if (!bonusesInfo) {//Checks if there is such a bonuse  in the database
                    res.status(404).send('bonus not found')
                }
                else {//if the answer is "no"
                    BonusesUtilized.find().then((bonusesUtilized) => {
                        bonusesUtilized.every(element => {
                            if (!finished && req.body.bonusId == element.BonusId && user.id == element.UserId) {//if the user got the bonus
                                finished = true;
                                res.status(409).send('cant get twice');
                                return false
                            }
                            else {//if the user didnt get the bonus- create such an order Details
                                return true;
                            }

                        });
                        code = Math.random() * (99999 - 10000 + 1) + 10000 //get uniqe code
                        if (!finished) { //if the user didnt get the bonus- create such a bonusUtilized
                            var bonusUtilized = new BonusesUtilized({
                                BonusId: req.body.bonusId,
                                UserId: user.id,
                                Code: code
                            });

                            bonusUtilized.save(function (err) {
                                if (err) return next(err);
                                code++;
                                mailService.email(user.UserName, user.UserEmail, code)
                                return res.status(200).send(bonusUtilized);
                            })
                        }
                    })
                }
            })
        }
    })
}
