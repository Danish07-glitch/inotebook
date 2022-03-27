var jwt = require('jsonwebtoken');
const JWT_SECRET = "Danishisgoo$d"


// Get the user from the JWT Token and add id to the req object 
const fetchuser = (req,res,next)=>{
    const token= req.header("auth-token")
    if(!token){
       return res.status(401).send({"error":"Please authenticate using valids token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user=data.user
        
        // res.send(user)
        
    } catch (error) {
        return res.status(401).send({"error":"Please authenticate using valid token"})
    }

    next();

    

}


module.exports =fetchuser