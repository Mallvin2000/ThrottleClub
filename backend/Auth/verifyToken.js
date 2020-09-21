var jwt = require("jsonwebtoken");


function verifyToken(req,res,next) {
    var token = req.headers["authorization"];

    if (!token || !token.includes("Bearer")) {//if token doesnt exists. Bearer must be infront of the token. it is a rule
        res.status(403).send({"auth":false,"message":"token not found"})
    } else {
        //console.log("bearer in");
        token = token.split("Bearer ")[1]; //split the bearer and token into two different things. in postman it is Bearer (token string)
        //console.log("token: " + token);
        jwt.verify(token,"123",(err,decoded)=>{
            if (!err) {
                //console.log("decoded: " + decoded);//show decoded message
                //console.log("checking id decoded: " + decoded.userid);
                req.body.userid = decoded.userid;//store user id in a new field in request body
                next();
            } else {
                res.status(403).send({"auth":false,"message":"token invalid"})
            }
        });
    }
};


module.exports = verifyToken;