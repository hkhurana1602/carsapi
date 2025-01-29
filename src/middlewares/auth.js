const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SECRET_KEY = "cars_api";

const auth = (req, res, next) => {
    try{
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
            next();
        }
        else{
            return res.status(401).json({message: "Unacuthorized user : Token is missing"})
        }
    } catch(error) {
        console.log(error);
        return res.status(401).json({message: "Unauthorized user : Invalid token"});
    }
}

module.exports = auth;