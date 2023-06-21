const jwt=require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
const userVerifyToken=(req,res,next)=>{

    const userToken=req.headers.authorization
    console.log("userToken")
    console.log(userToken)

    if(userToken){
        const token = userToken.split(" ")[1]
        console.log(token)
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            console.log("abc");
            console.log(decoded);
            if(err){
                console.log(err);
               
                res.json({userTokenVerified:false})
            }else{
                console.log('Token Verified');
                next()
            }
        })
    }else{
        
        res.json({userTokenVerified:false})
    }
}


module.exports=userVerifyToken;