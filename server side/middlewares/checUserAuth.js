const jwk = require("jsonwebtoken")
//Checks whether the user is registered and is in the private area (according to the token)
const checUserAuth = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (token==""){
            return res.status(401).json("Auth faild");
        }
        jwk.verify(token, "MySite");
        next();
    }catch(error){
        return res.status(401).json("Auth faild");
    }
}
module.exports = checUserAuth;