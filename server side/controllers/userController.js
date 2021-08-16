var mailService = require('../services/signUpMailService')
var User = require('../models/users');
const jwt = require("jsonwebtoken")

//create- post (Can also be called SignUp)
exports.create_user = function (req, res, next) {
    console.log(req.body)
    User.find({ ID: req.body.ID }).then((users) => {
        if (users.length >= 1) {
            return res.status(409).send("Error- The ID already exists")
        }
        console.log(2)
        var user = new User({
            ID: req.body.ID,
            UserName: req.body.userName,
            UserEmail: req.body.userEmail,
            Password: req.body.password
        })
        console.log(user.ID)
        console.log(req.body.userEmail)
        user.save().then((result) => {
            mailService.email(user.UserName, user.UserEmail, user.Password)
            res.status(200).send(succsess)

        }).catch(error => {
            res.status(500).send(error);
        });

    });
}


//read-get all db
exports.get_user_db = function (req, res, next) {
    User.find()
        .exec(function (err, list) {
            if (err) return next(err);
            res.send(list);
        })
}
//POST sign in
exports.signIn = function (req, res, next) {
    const { ID, password } = req.body;
    User.find({ "ID": ID }).then((users) => {
        console.log(users)
        if (users.length === 0) {
            return res.status(409).json("Auth faild");
        }
        const [user] = users;
        if (password === user.Password) {
            const token = jwt.sign({
                id: user._id,
                ID: user.ID,
                UserName: user.UserName,
                UserEmail: user.UserEmail
            }, "MySite",
                { expiresIn: "14D" }
            );
            console.log(token)
            return res.status(200).json({
                user,
                token
            })
        }
        else {
            return res.status(409).json("Auth faild");
        }
    })

}
// get the user name by the token
exports.get_user_name = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const user=jwt.verify(token, "MySite");
    return res.status(200).send(user.UserName);
                     
}
