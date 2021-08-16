var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');
var reaction_controller = require('../controllers/reactionController');
var bonusUtilized_controller = require('../controllers/bonusesUtilizedController');
var pictures_controller = require('../controllers/picturesController');
var bonusesInfo_controller = require('../controllers/bonusesInfoController');
var contactEmail = require('../services/contactMailService')
var checUserAuth = require('../middlewares/checUserAuth');

router.get('/getUserDb', user_controller.get_user_db);
router.post('/createUser', user_controller.create_user);
router.post('/getUserName',checUserAuth, user_controller.get_user_name);//only to registeres users
router.get('/getReactionDb', reaction_controller.get_reaction_db);
router.post('/createReaction', reaction_controller.create_reaction);
router.get('/getCardsDb', bonusesInfo_controller.get_bonusesInfo_db);
router.get('/getPictures', pictures_controller.get_picture);
router.post('/createcreateBonusUtilized', checUserAuth, bonusUtilized_controller.create_bonusUtilized);//only to registeres users
router.post('/contactEmail', contactEmail.contact_email);
router.post('/signIn', user_controller.signIn);

module.exports = router